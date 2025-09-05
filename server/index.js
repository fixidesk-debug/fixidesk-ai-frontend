const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client with service role key for server-side operations
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Helper function to verify JWT token
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token verification failed' });
  }
};

// =====================================================
// AUTH ENDPOINTS
// =====================================================

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ 
      user: data.user, 
      session: data.session,
      access_token: data.session.access_token 
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, company } = req.body;
  const [firstName, ...lastNameParts] = name.split(' ');
  const lastName = lastNameParts.join(' ');
  
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          company_name: company
        }
      }
    });
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ user: data.user, session: data.session });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/auth/me', verifyToken, async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ user: req.user, profile });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// TICKETS ENDPOINTS
// =====================================================

app.get('/api/tickets', verifyToken, async (req, res) => {
  const { status, priority, page = 1 } = req.query;
  const limit = 20;
  const offset = (page - 1) * limit;
  
  try {
    // Get user role
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', req.user.id)
      .single();
    
    let query = supabase
      .from('tickets_with_customer')
      .select('*', { count: 'exact' });
    
    // Apply role-based filtering
    if (userProfile?.role === 'customer') {
      query = query.eq('customer_id', req.user.id);
    } else if (userProfile?.role === 'agent') {
      query = query.or(`assigned_agent_id.eq.${req.user.id},customer_id.eq.${req.user.id}`);
    }
    // Admins can see all tickets (no additional filter)
    
    // Apply filters
    if (status) query = query.eq('status', status);
    if (priority) query = query.eq('priority', priority);
    
    // Apply pagination and ordering
    query = query
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    const { data: tickets, error, count } = await query;
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ 
      tickets, 
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit)
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/tickets/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  
  try {
    const { data: ticket, error } = await supabase
      .from('tickets_with_customer')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    // Get ticket comments
    const { data: comments } = await supabase
      .from('ticket_comments')
      .select(`
        *,
        author:profiles(first_name, last_name, avatar_url)
      `)
      .eq('ticket_id', id)
      .order('created_at', { ascending: true });
    
    res.json({ ticket, comments: comments || [] });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/tickets', verifyToken, async (req, res) => {
  const { subject, description, priority = 'medium' } = req.body;
  
  try {
    const { data: ticket, error } = await supabase
      .from('tickets')
      .insert({
        title: subject,
        description,
        priority,
        customer_id: req.user.id,
        customer_email: req.user.email
      })
      .select()
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ ticket });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/tickets/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  try {
    const { data: ticket, error } = await supabase
      .from('tickets')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ ticket });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/tickets/:id/messages', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;
  
  try {
    const { data: comment, error } = await supabase
      .from('ticket_comments')
      .insert({
        ticket_id: id,
        author_id: req.user.id,
        content: message
      })
      .select()
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ comment });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// ANALYTICS ENDPOINTS
// =====================================================

app.get('/api/analytics/overview', verifyToken, async (req, res) => {
  try {
    // Get user role
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', req.user.id)
      .single();
    
    let ticketFilter = '';
    if (userProfile?.role === 'customer') {
      ticketFilter = `customer_id.eq.${req.user.id}`;
    } else if (userProfile?.role === 'agent') {
      ticketFilter = `assigned_agent_id.eq.${req.user.id}`;
    }
    
    // Get ticket statistics
    const { data: ticketStats } = await supabase.rpc('get_ticket_stats', {
      user_id: userProfile?.role === 'admin' ? null : req.user.id
    });
    
    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    let recentQuery = supabase
      .from('tickets')
      .select('*')
      .gte('created_at', thirtyDaysAgo.toISOString());
    
    if (ticketFilter) {
      if (userProfile?.role === 'customer') {
        recentQuery = recentQuery.eq('customer_id', req.user.id);
      } else if (userProfile?.role === 'agent') {
        recentQuery = recentQuery.or(`assigned_agent_id.eq.${req.user.id},customer_id.eq.${req.user.id}`);
      }
    }
    
    const { data: recentTickets } = await recentQuery;
    
    res.json({
      totalTickets: ticketStats[0]?.total_tickets || 0,
      openTickets: ticketStats[0]?.open_tickets || 0,
      inProgressTickets: ticketStats[0]?.in_progress_tickets || 0,
      resolvedTickets: ticketStats[0]?.resolved_tickets || 0,
      avgResolutionTime: ticketStats[0]?.avg_resolution_time || null,
      recentActivity: recentTickets?.length || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/analytics/tickets', verifyToken, async (req, res) => {
  const { period = '30d' } = req.query;
  
  try {
    const days = period === '7d' ? 7 : period === '90d' ? 90 : 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    let query = supabase
      .from('tickets')
      .select('created_at, status, priority')
      .gte('created_at', startDate.toISOString());
    
    // Apply role-based filtering
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', req.user.id)
      .single();
    
    if (userProfile?.role === 'customer') {
      query = query.eq('customer_id', req.user.id);
    } else if (userProfile?.role === 'agent') {
      query = query.or(`assigned_agent_id.eq.${req.user.id},customer_id.eq.${req.user.id}`);
    }
    
    const { data: tickets, error } = await query;
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    // Process data for charts
    const dailyStats = {};
    tickets.forEach(ticket => {
      const date = ticket.created_at.split('T')[0];
      if (!dailyStats[date]) {
        dailyStats[date] = { total: 0, open: 0, resolved: 0 };
      }
      dailyStats[date].total++;
      if (ticket.status === 'open') dailyStats[date].open++;
      if (ticket.status === 'resolved') dailyStats[date].resolved++;
    });
    
    res.json({ dailyStats, totalTickets: tickets.length });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/analytics/calls', verifyToken, async (req, res) => {
  const { period = '30d' } = req.query;
  
  try {
    const days = period === '7d' ? 7 : period === '90d' ? 90 : 30;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const { data: calls, error } = await supabase
      .from('call_logs')
      .select('*')
      .gte('created_at', startDate.toISOString());
    
    const { data: missedCalls } = await supabase
      .from('missed_calls')
      .select('*')
      .gte('created_at', startDate.toISOString());
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ 
      totalCalls: calls?.length || 0,
      missedCalls: missedCalls?.length || 0,
      callHistory: calls || []
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================================
// SETTINGS ENDPOINTS
// =====================================================

app.get('/api/settings/profile', verifyToken, async (req, res) => {
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.user.id)
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ profile });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/api/settings/profile', verifyToken, async (req, res) => {
  const updates = req.body;
  
  try {
    const { data: profile, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', req.user.id)
      .select()
      .single();
    
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    
    res.json({ profile });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Placeholder endpoints for other settings
app.get('/api/settings/company', verifyToken, (req, res) => {
  res.json({ company: { name: 'Sample Company', domain: 'example.com' } });
});

app.patch('/api/settings/company', verifyToken, (req, res) => {
  res.json({ message: 'Company settings updated' });
});

app.get('/api/settings/integrations', verifyToken, (req, res) => {
  res.json({ integrations: [] });
});

app.patch('/api/settings/integrations/:integration', verifyToken, (req, res) => {
  res.json({ message: 'Integration updated' });
});

app.get('/api/settings/billing', verifyToken, (req, res) => {
  res.json({ plan: 'basic', billing: {} });
});

app.post('/api/settings/billing/plan', verifyToken, (req, res) => {
  res.json({ message: 'Plan updated' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('API Error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`FixiDesk API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app;
