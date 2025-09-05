# FixiDesk Setup Guide

Complete setup instructions for the FixiDesk customer service platform with backend and database integration.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- Git

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd fixidesk
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Environment Configuration

Create environment files with your Supabase credentials:

#### Frontend Environment (`.env`)

```env
# Supabase Configuration (Frontend)
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend API Configuration
VITE_API_URL=http://localhost:3001/api
```

#### Backend Environment (`server/.env`)

```env
# Supabase Configuration (Backend - Service Role)
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Server Configuration
PORT=3001
NODE_ENV=development

# Optional: Database URL for direct connections
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project-id.supabase.co:5432/postgres
```

### 3. Database Setup

#### Apply Database Schema

Run the complete schema in your Supabase SQL editor:

```bash
# Copy the content from supabase/complete-schema.sql
# and run it in Supabase Dashboard → SQL Editor
```

Or using Supabase CLI:

```bash
supabase db reset
```

#### Verify Tables Created

Your Supabase project should now have these tables:
- `profiles` (user information)
- `organizations` (company data)
- `tickets` (normalized ticket system)
- `ticket_categories` (ticket categorization)
- `ticket_comments` (ticket discussions)
- `articles` (knowledge base)
- `support_tickets` (n8n integration)
- `leads` (CRM integration)
- `call_logs` (call tracking)
- `missed_calls` (call tracking)

### 4. Start Development Servers

#### Terminal 1: Frontend
```bash
npm run dev
# Frontend runs on http://localhost:8080
```

#### Terminal 2: Backend API
```bash
cd server
npm run dev
# Backend API runs on http://localhost:3001
```

### 5. Test the Application

1. Visit http://localhost:8080
2. Create a new account or sign in
3. Navigate to Support → Tickets
4. Create a test ticket to verify database integration

## 🔧 Configuration Details

### Supabase Setup

#### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note your project URL and keys

#### 2. Get API Keys

In Supabase Dashboard → Settings → API:

- **Anon (public) key**: Use for `VITE_SUPABASE_ANON_KEY`
- **Service role key**: Use for `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

#### 3. Configure Authentication

In Supabase Dashboard → Authentication → Settings:

- Enable email authentication
- Configure email templates (optional)
- Set up redirect URLs for production

#### 4. Row Level Security (RLS)

The schema automatically enables RLS and creates policies for:
- Users can only see their own tickets (customers)
- Agents can see assigned tickets
- Admins can see all tickets
- Service role can manage automation data

### Backend API Architecture

The Express.js backend provides these endpoints:

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration  
- `POST /api/auth/forgot-password` - Password reset
- `GET /api/auth/me` - Get current user

#### Tickets
- `GET /api/tickets` - List tickets (with filters)
- `GET /api/tickets/:id` - Get ticket details
- `POST /api/tickets` - Create new ticket
- `PATCH /api/tickets/:id` - Update ticket
- `POST /api/tickets/:id/messages` - Add comment

#### Analytics
- `GET /api/analytics/overview` - Dashboard stats
- `GET /api/analytics/tickets` - Ticket analytics
- `GET /api/analytics/calls` - Call analytics

#### Settings
- `GET/PATCH /api/settings/profile` - User profile
- `GET/PATCH /api/settings/company` - Company settings
- `GET/PATCH /api/settings/integrations` - Integration settings

### Database Schema Overview

#### Normalized Tables (Primary System)
- **profiles**: User accounts and roles
- **tickets**: Main ticket system with full relationships
- **ticket_comments**: Threaded conversations
- **ticket_categories**: Categorization system
- **organizations**: Customer organizations
- **articles**: Knowledge base content

#### Integration Tables (n8n/Automation)
- **support_tickets**: Simple schema for workflow automation
- **leads**: CRM lead management
- **call_logs**: Call tracking and analytics
- **missed_calls**: Missed call alerts

#### Data Synchronization
- Automatic sync between `support_tickets` and `tickets` via triggers
- Customer profiles auto-created from email data
- UUID and serial ID compatibility for different integrations

## 🔌 n8n Integration Setup

### 1. Install n8n

```bash
npm install -g n8n
```

### 2. Configure Supabase Credentials in n8n

1. Start n8n: `n8n start`
2. Go to n8n interface (usually http://localhost:5678)
3. Settings → Credentials → Add Credential
4. Choose "Supabase"
5. Add:
   - **Host**: your-project-id.supabase.co
   - **Service Role Key**: your_supabase_service_role_key

### 3. Import Workflows

Import the workflows from `n8n-workflows/`:
- `chat-to-ticket.json` - Convert chat messages to tickets
- `lead-nurturing.json` - Automated lead nurturing
- `missed-call-alert.json` - Missed call notifications
- `new-lead-to-crm.json` - Lead to CRM sync

### 4. Configure External Integrations

Each workflow may need additional credentials:
- **Chatwoot**: For chat integration
- **EspoCRM**: For CRM operations
- **Telnyx**: For call handling
- **Email**: For notifications

## 🚀 Production Deployment

### Environment Variables for Production

#### Frontend (.env.production)
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_production_anon_key
VITE_API_URL=https://your-backend-domain.com/api
```

#### Backend (.env.production)
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
PORT=3001
NODE_ENV=production
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.your-project-id.supabase.co:5432/postgres
```

### Deployment Options

#### Option 1: Vercel (Frontend) + Railway (Backend)

**Frontend (Vercel):**
```bash
npm run build
vercel --prod
```

**Backend (Railway):**
```bash
# Push to GitHub, connect to Railway
# Set environment variables in Railway dashboard
```

#### Option 2: Docker Deployment

```dockerfile
# Frontend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 8080
CMD ["npm", "run", "preview"]
```

```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./
RUN npm install
COPY server/ .
EXPOSE 3001
CMD ["npm", "start"]
```

#### Option 3: Single Server Setup

Use nginx to serve both frontend and proxy backend:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /var/www/fixidesk/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## 🔒 Security Best Practices

### 1. Environment Variables
- Never commit `.env` files to Git
- Use different keys for development/production
- Rotate service role keys regularly

### 2. Supabase Security
- Enable RLS on all tables
- Review and test RLS policies
- Use service role key only in backend
- Enable 2FA on Supabase account

### 3. Backend Security
- Validate all inputs
- Use parameterized queries
- Implement rate limiting
- Log security events

### 4. Frontend Security
- Validate data before display
- Sanitize user inputs
- Use HTTPS in production
- Implement proper error boundaries

## 🧪 Testing

### Run Tests
```bash
# Frontend tests
npm test

# Backend tests
cd server
npm test
```

### Manual Testing Checklist

- [ ] User registration/login works
- [ ] Tickets can be created and viewed
- [ ] Comments can be added to tickets
- [ ] Role-based access control works
- [ ] Search and filtering work
- [ ] Analytics display correctly
- [ ] n8n workflows create tickets successfully

## 📊 Monitoring and Analytics

### Health Checks
- Frontend: Check main page loads
- Backend: `GET /health` endpoint
- Database: Monitor Supabase dashboard

### Performance Monitoring
- Use Supabase analytics for database performance
- Monitor API response times
- Track user engagement metrics

### Error Handling
- Frontend errors logged to console
- Backend errors logged to server logs
- Supabase errors visible in dashboard

## 🆘 Troubleshooting

### Common Issues

#### "Missing Supabase environment variables"
- Check `.env` file exists and has correct values
- Verify environment variable names match exactly
- Restart development server after changes

#### "User not authenticated" errors
- Check JWT token is being sent in requests
- Verify Supabase URL and anon key are correct
- Clear browser storage and login again

#### "RLS policy violation" errors
- Check user has correct role in profiles table
- Review RLS policies in Supabase dashboard
- Verify get_user_role function is working

#### n8n workflows not working
- Verify Supabase service role key in n8n credentials
- Check workflow webhook URLs are accessible
- Review n8n execution logs for errors

### Getting Help

1. Check the logs in browser console (frontend)
2. Check server logs (backend)
3. Review Supabase logs in dashboard
4. Test individual API endpoints with curl/Postman
5. Check n8n execution history for workflow issues

---

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [React Query Documentation](https://tanstack.com/query)
- [n8n Documentation](https://docs.n8n.io/)
- [Express.js Documentation](https://expressjs.com/)

For support, check the repository issues or create a new issue with:
- Environment details
- Error messages
- Steps to reproduce
- Expected vs actual behavior
