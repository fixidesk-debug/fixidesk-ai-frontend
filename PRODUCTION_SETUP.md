# 🚀 Production Setup Guide

## Prerequisites
- Domain name (e.g., yourdomain.com)
- Supabase production project
- Docker & Docker Compose
- Vercel account
- SSL certificates

## 1. Environment Setup

### Update Environment Variables
```bash
# Copy production environment
cp .env.production .env

# Update with your values:
# - VITE_SUPABASE_URL
# - VITE_SUPABASE_ANON_KEY
# - Domain names
# - API credentials
```

### DNS Configuration
```
A     yourdomain.com          → Your server IP
CNAME support.yourdomain.com  → yourdomain.com
CNAME crm.yourdomain.com      → yourdomain.com
CNAME marketing.yourdomain.com → yourdomain.com
CNAME automation.yourdomain.com → yourdomain.com
```

## 2. Supabase Setup

### Create Production Project
1. Go to https://supabase.com/dashboard
2. Create new project
3. Copy project URL and anon key
4. Run migrations:
```bash
supabase db push --project-ref YOUR_PROJECT_ID
```

### Enable RLS
```sql
-- Run the security migration
-- File: supabase/migrations/20250101000001_production_security.sql
```

## 3. Backend Services Deployment

### Deploy with Docker
```bash
# Set environment variables
export DOMAIN=yourdomain.com
export POSTGRES_PASSWORD=secure_password
export MYSQL_PASSWORD=secure_password
export MYSQL_ROOT_PASSWORD=secure_root_password

# Deploy services
docker-compose -f docker-compose.prod.yml up -d
```

### SSL Certificates
```bash
# Generate Let's Encrypt certificates
./deploy.sh
```

## 4. Frontend Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Configure Custom Domain
1. Add domain in Vercel dashboard
2. Update DNS records
3. Enable SSL

## 5. Security Configuration

### Rate Limiting
- API: 10 requests/second
- Auth: 5 requests/second
- Implemented in Nginx config

### Headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

### HTTPS Only
- All HTTP traffic redirected to HTTPS
- HSTS headers enabled
- Secure cookies only

## 6. Monitoring Setup

### Health Checks
```bash
# Frontend
curl https://yourdomain.com/health

# Services
curl https://support.yourdomain.com/health
curl https://crm.yourdomain.com/health
curl https://marketing.yourdomain.com/health
curl https://automation.yourdomain.com/health
```

### Logs
```bash
# View service logs
docker-compose -f docker-compose.prod.yml logs -f [service_name]
```

## 7. Post-Deployment

### Service Configuration
1. **Chatwoot**: Create inbox, configure webhooks
2. **EspoCRM**: Set up admin user, configure API
3. **Mautic**: Configure email settings, create campaigns
4. **n8n**: Import workflows, set up credentials

### Testing
1. User registration/login
2. Chat widget functionality
3. CRM data sync
4. Marketing automation
5. API endpoints

## 8. Backup Strategy

### Database Backups
```bash
# Supabase automatic backups enabled
# Additional manual backup
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
```

### File Backups
```bash
# Backup volumes
docker run --rm -v prod_data:/data -v $(pwd):/backup alpine tar czf /backup/backup_$(date +%Y%m%d).tar.gz /data
```

## 9. Scaling Considerations

### Load Balancing
- Use multiple server instances
- Configure Nginx upstream
- Database read replicas

### CDN
- Configure Vercel CDN
- Static asset optimization
- Image optimization

## 10. Maintenance

### Updates
```bash
# Update application
git pull origin main
npm run build
vercel --prod

# Update services
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

### SSL Renewal
```bash
# Auto-renewal with cron
0 0 1 * * /path/to/deploy.sh
```

## Support

For production issues:
- Check service logs
- Verify environment variables
- Test API endpoints
- Monitor resource usage

**Estimated Setup Time**: 4-6 hours
**Go-Live Checklist**: ✅ All services running, ✅ SSL enabled, ✅ DNS configured, ✅ Backups setup