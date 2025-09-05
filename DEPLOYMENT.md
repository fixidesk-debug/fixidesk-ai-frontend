# FixiDesk MVP Deployment Guide

This guide provides step-by-step instructions for deploying the complete FixiDesk MVP platform.

## Prerequisites

- DigitalOcean Droplet (4GB RAM minimum, 8GB recommended)
- Domain name with DNS access
- Supabase account and project
- Email service (SMTP) for notifications
- Telnyx account (optional, for calling features)

## Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (Docker)      │◄──►│   (Supabase)    │
│   - Dashboard   │    │   - Chatwoot    │    │   - Auth        │
│   - CRM Views   │    │   - EspoCRM     │    │   - Data        │
│   - Campaigns   │    │   - Mautic      │    │                 │
│   - Automations │    │   - n8n         │    │                 │
│   - Calling     │    │   - Redis       │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## Step 1: Server Setup

### 1.1 Create DigitalOcean Droplet

```bash
# Create a new droplet with Docker pre-installed
# Recommended: Ubuntu 22.04 with Docker, 4GB RAM, 80GB SSD

# Connect to your droplet
ssh root@your-server-ip
```

### 1.2 Install Dependencies

```bash
# Update system
apt update && apt upgrade -y

# Install required packages
apt install -y git curl nginx certbot python3-certbot-nginx

# Install Docker Compose (if not already installed)
curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

## Step 2: Clone and Configure

### 2.1 Clone Repository

```bash
# Clone the FixiDesk repository
git clone https://github.com/fixidesk-debug/fixidesk-ai-frontend.git
cd fixidesk-ai-frontend
```

### 2.2 Configure Environment Variables

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

Required environment variables:

```env
# Supabase Configuration
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Database Configuration
POSTGRES_DB=fixidesk
POSTGRES_USER=fixidesk_user
POSTGRES_PASSWORD=secure_password_here

# EspoCRM Configuration
ESPOCRM_ADMIN_USERNAME=admin
ESPOCRM_ADMIN_PASSWORD=admin123
ESPOCRM_DATABASE_PASSWORD=espo_password_here

# Mautic Configuration
MAUTIC_DB_PASSWORD=mautic_password_here
MAUTIC_ADMIN_EMAIL=admin@yourdomain.com
MAUTIC_ADMIN_PASSWORD=mautic_admin_password

# Chatwoot Configuration
CHATWOOT_SECRET_KEY_BASE=generate_random_key_here
CHATWOOT_FRONTEND_URL=https://chat.yourdomain.com

# n8n Configuration
N8N_BASIC_AUTH_ACTIVE=true
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=n8n_password_here

# Email Configuration
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASSWORD=your-smtp-password

# Telnyx Configuration (Optional)
TELNYX_API_KEY=your-telnyx-api-key
TELNYX_PHONE_NUMBER=your-telnyx-phone-number

# Domain Configuration
DOMAIN=yourdomain.com
```

## Step 3: SSL and Domain Setup

### 3.1 Configure DNS

Point these subdomains to your server IP:
- `yourdomain.com` (main frontend)
- `api.yourdomain.com` (backend services)
- `crm.yourdomain.com` (EspoCRM)
- `chat.yourdomain.com` (Chatwoot)
- `marketing.yourdomain.com` (Mautic)
- `automation.yourdomain.com` (n8n)

### 3.2 Setup SSL Certificates

```bash
# Install SSL certificates for all subdomains
certbot --nginx -d yourdomain.com -d api.yourdomain.com -d crm.yourdomain.com -d chat.yourdomain.com -d marketing.yourdomain.com -d automation.yourdomain.com
```

## Step 4: Deploy Backend Services

### 4.1 Start Docker Services

```bash
# Start all backend services
docker-compose up -d

# Check service status
docker-compose ps

# View logs if needed
docker-compose logs -f
```

### 4.2 Verify Services

Wait 5-10 minutes for all services to start, then verify:

```bash
# Check service health
curl http://localhost:8080  # Chatwoot
curl http://localhost:8081  # EspoCRM
curl http://localhost:8082  # Mautic
curl http://localhost:5678  # n8n
```

## Step 5: Configure Applications

### 5.1 EspoCRM Setup

1. Visit `https://crm.yourdomain.com`
2. Complete installation wizard
3. Create admin account
4. Configure API access in Administration > API Users

### 5.2 Mautic Setup

1. Visit `https://marketing.yourdomain.com`
2. Complete installation wizard
3. Create admin account
4. Configure API credentials in Settings > API Settings

### 5.3 Chatwoot Setup

1. Visit `https://chat.yourdomain.com`
2. Create admin account
3. Create inbox for website widget
4. Configure webhook URLs for n8n integration

### 5.4 n8n Setup

1. Visit `https://automation.yourdomain.com`
2. Login with credentials from .env file
3. Import workflow files from `n8n-workflows/` directory
4. Configure credentials for all services
5. Activate workflows

## Step 6: Deploy Frontend

### 6.1 Build Frontend

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Copy build files to web server
cp -r dist/* /var/www/html/
```

### 6.2 Configure Nginx

```bash
# Edit Nginx configuration
nano /etc/nginx/sites-available/fixidesk

# Add configuration (see nginx.conf in repository)
# Enable site
ln -s /etc/nginx/sites-available/fixidesk /etc/nginx/sites-enabled/

# Test and reload Nginx
nginx -t
systemctl reload nginx
```

## Step 7: Database Setup

### 7.1 Supabase Tables

Create these tables in your Supabase project:

```sql
-- Support tickets table
CREATE TABLE support_tickets (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  status VARCHAR(50),
  priority VARCHAR(50),
  source VARCHAR(50),
  customer_email VARCHAR(255),
  customer_name VARCHAR(255),
  espocrm_case_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Missed calls table
CREATE TABLE missed_calls (
  id SERIAL PRIMARY KEY,
  call_id VARCHAR(255),
  from_number VARCHAR(50),
  to_number VARCHAR(50),
  duration INTEGER,
  timestamp TIMESTAMP,
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Leads table
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  espocrm_id VARCHAR(100),
  mautic_contact_id VARCHAR(100),
  email VARCHAR(255),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  company VARCHAR(255),
  phone VARCHAR(50),
  nurture_campaign_started BOOLEAN DEFAULT FALSE,
  nurture_start_date TIMESTAMP,
  lead_score INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Call logs table
CREATE TABLE call_logs (
  id SERIAL PRIMARY KEY,
  call_id VARCHAR(255),
  direction VARCHAR(20),
  from_number VARCHAR(50),
  to_number VARCHAR(50),
  duration INTEGER,
  status VARCHAR(50),
  recording_url TEXT,
  transcript TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 7.2 Row Level Security (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE missed_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE call_logs ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your auth requirements)
CREATE POLICY "Users can view their own data" ON support_tickets
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own data" ON missed_calls
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own data" ON leads
  FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can view their own data" ON call_logs
  FOR ALL USING (auth.uid() IS NOT NULL);
```

## Step 8: Configure Webhooks

### 8.1 Website Form Integration

Add this to your website forms:

```html
<form action="https://automation.yourdomain.com/webhook/new-lead" method="POST">
  <input type="text" name="firstName" placeholder="First Name" required>
  <input type="text" name="lastName" placeholder="Last Name" required>
  <input type="email" name="email" placeholder="Email" required>
  <input type="tel" name="phone" placeholder="Phone">
  <input type="text" name="company" placeholder="Company">
  <button type="submit">Submit</button>
</form>
```

### 8.2 Chatwoot Webhook

In Chatwoot settings, add webhook URL:
```
https://automation.yourdomain.com/webhook/chatwoot-message
```

### 8.3 Telnyx Webhook (Optional)

In Telnyx dashboard, configure webhook URL:
```
https://automation.yourdomain.com/webhook/telnyx-call-event
```

## Step 9: Testing

### 9.1 Frontend Testing

1. Visit `https://yourdomain.com`
2. Test login/signup functionality
3. Navigate through all dashboard sections:
   - Overview
   - Support (tickets)
   - CRM (leads and deals)
   - Campaigns (email marketing)
   - Automations (workflows)
   - AI Assistant (calling)
   - Chat Widget
   - Analytics
   - Settings

### 9.2 Integration Testing

1. Submit a test lead through website form
2. Verify lead appears in EspoCRM and Supabase
3. Test chat widget integration
4. Verify support ticket creation
5. Test calling functionality (if Telnyx configured)
6. Check automation workflows in n8n

### 9.3 Performance Testing

```bash
# Test response times
curl -w "@curl-format.txt" -o /dev/null -s "https://yourdomain.com"

# Monitor resource usage
docker stats

# Check logs for errors
docker-compose logs --tail=100
```

## Step 10: Monitoring and Maintenance

### 10.1 Setup Monitoring

```bash
# Install monitoring tools
apt install -y htop iotop nethogs

# Setup log rotation
nano /etc/logrotate.d/docker-compose
```

### 10.2 Backup Strategy

```bash
# Create backup script
nano /root/backup.sh

#!/bin/bash
# Backup Supabase data (configure with your Supabase backup solution)
# Backup Docker volumes
docker run --rm -v fixidesk_espocrm_data:/data -v $(pwd):/backup alpine tar czf /backup/espocrm_backup_$(date +%Y%m%d).tar.gz /data
docker run --rm -v fixidesk_mautic_data:/data -v $(pwd):/backup alpine tar czf /backup/mautic_backup_$(date +%Y%m%d).tar.gz /data

# Make executable
chmod +x /root/backup.sh

# Add to crontab
crontab -e
# Add: 0 2 * * * /root/backup.sh
```

### 10.3 Security Hardening

```bash
# Update firewall rules
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# Setup fail2ban
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Regular security updates
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```

## Troubleshooting

### Common Issues

1. **Services not starting**: Check Docker logs and ensure sufficient RAM
2. **SSL certificate issues**: Verify DNS propagation and domain configuration
3. **Database connection errors**: Check Supabase credentials and network connectivity
4. **Webhook failures**: Verify n8n is accessible and credentials are correct

### Useful Commands

```bash
# Restart all services
docker-compose restart

# View specific service logs
docker-compose logs -f chatwoot

# Check disk usage
df -h

# Monitor system resources
htop

# Test webhook endpoints
curl -X POST https://automation.yourdomain.com/webhook/test
```

## Support

For deployment issues:
1. Check service logs: `docker-compose logs`
2. Verify environment variables in `.env`
3. Test network connectivity between services
4. Review Nginx error logs: `/var/log/nginx/error.log`
5. Check Supabase project settings and API keys

## Next Steps

After successful deployment:
1. Configure user authentication and permissions
2. Customize branding and themes
3. Set up additional integrations as needed
4. Configure monitoring and alerting
5. Train team members on the platform

The FixiDesk MVP is now ready for production use!

