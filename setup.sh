#!/bin/bash

# FixiDesk Setup Script
# This script sets up the FixiDesk MVP platform

set -e

echo "🚀 Starting FixiDesk Setup..."

# Check if Docker and Docker Compose are installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your actual configuration values"
    echo "   Especially update Supabase URL and keys"
fi

# Create SSL directory for certificates
mkdir -p ssl

# Generate self-signed certificates for development
if [ ! -f ssl/cert.pem ]; then
    echo "🔐 Generating self-signed SSL certificates for development..."
    openssl req -x509 -newkey rsa:4096 -keyout ssl/key.pem -out ssl/cert.pem -days 365 -nodes \
        -subj "/C=US/ST=State/L=City/O=FixiDesk/CN=localhost"
fi

# Pull Docker images
echo "📦 Pulling Docker images..."
docker-compose pull

# Start the services
echo "🐳 Starting FixiDesk services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 30

# Check service health
echo "🔍 Checking service health..."
services=("redis" "postgres" "chatwoot_web" "espocrm" "mautic" "n8n")

for service in "${services[@]}"; do
    if docker-compose ps | grep -q "$service.*Up"; then
        echo "✅ $service is running"
    else
        echo "❌ $service is not running"
    fi
done

# Initialize databases
echo "🗄️  Initializing databases..."

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until docker-compose exec -T postgres pg_isready -U fixidesk; do
    sleep 2
done

# Create databases for each service
docker-compose exec -T postgres psql -U fixidesk -d fixidesk -c "
CREATE DATABASE IF NOT EXISTS chatwoot;
CREATE DATABASE IF NOT EXISTS espocrm;
CREATE DATABASE IF NOT EXISTS mautic;
CREATE DATABASE IF NOT EXISTS n8n;
" || echo "Databases may already exist"

# Run Chatwoot setup
echo "🔧 Setting up Chatwoot..."
docker-compose exec chatwoot_web bundle exec rails db:chatwoot_prepare || echo "Chatwoot setup completed or already done"

echo "🎉 FixiDesk setup completed!"
echo ""
echo "📋 Service URLs:"
echo "   Frontend Dashboard: http://localhost:5173 (after npm run dev)"
echo "   Chatwoot: http://localhost/chatwoot"
echo "   EspoCRM: http://localhost/crm"
echo "   Mautic: http://localhost/mautic"
echo "   n8n: http://localhost/n8n"
echo "   Nginx Proxy: http://localhost"
echo ""
echo "🔑 Default Credentials:"
echo "   EspoCRM: admin / admin123"
echo "   n8n: admin / admin123"
echo "   Chatwoot: Create account on first visit"
echo ""
echo "⚠️  Next Steps:"
echo "1. Edit .env file with your Supabase credentials"
echo "2. Run 'npm install' to install frontend dependencies"
echo "3. Run 'npm run dev' to start the frontend development server"
echo "4. Configure each service through their web interfaces"
echo "5. Set up n8n workflows for automation"

