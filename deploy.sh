#!/bin/bash

# Production Deployment Script for FixiDesk

echo "🚀 Starting FixiDesk Production Deployment..."

# Check if required environment variables are set
if [ -z "$SUPABASE_PROJECT_ID" ]; then
    echo "❌ SUPABASE_PROJECT_ID environment variable is required"
    exit 1
fi

if [ -z "$DOMAIN" ]; then
    echo "❌ DOMAIN environment variable is required"
    exit 1
fi

# 1. Build the application
echo "📦 Building application..."
npm run build

# 2. Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

# 3. Run Supabase migrations
echo "🗄️ Running database migrations..."
supabase db push --project-ref $SUPABASE_PROJECT_ID

# 4. Deploy backend services
echo "🐳 Deploying backend services..."
docker-compose -f docker-compose.prod.yml up -d

# 5. Setup SSL certificates (using Let's Encrypt)
echo "🔒 Setting up SSL certificates..."
docker run --rm -v $(pwd)/ssl:/etc/letsencrypt certbot/certbot certonly \
  --standalone \
  --email admin@$DOMAIN \
  --agree-tos \
  --no-eff-email \
  -d $DOMAIN \
  -d support.$DOMAIN \
  -d crm.$DOMAIN \
  -d marketing.$DOMAIN \
  -d automation.$DOMAIN

# 6. Restart Nginx with SSL
echo "🔄 Restarting Nginx with SSL..."
docker-compose -f docker-compose.prod.yml restart nginx

# 7. Health checks
echo "🏥 Running health checks..."
curl -f https://$DOMAIN/health || echo "⚠️ Frontend health check failed"
curl -f https://support.$DOMAIN/health || echo "⚠️ Support service health check failed"

echo "✅ Deployment completed!"
echo "🌍 Your application is available at: https://$DOMAIN"
echo "📞 Support: https://support.$DOMAIN"
echo "🏢 CRM: https://crm.$DOMAIN"
echo "📧 Marketing: https://marketing.$DOMAIN"
echo "⚡ Automation: https://automation.$DOMAIN"