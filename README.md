# FixiDesk MVP - Customer Support & Sales Automation Suite

FixiDesk is a comprehensive customer support and sales automation platform that integrates multiple open-source tools with a unified frontend dashboard and Supabase backend.

## 🚀 Features

### Unified Frontend Dashboard
- **Modern React/Next.js Interface**: Clean, responsive dashboard with dark/light theme support
- **Sidebar Navigation**: Easy access to Support, CRM, Campaigns, Automations, and more
- **Real-time Data**: Live updates from all integrated services
- **Mobile Responsive**: Works seamlessly on desktop and mobile devices

### Core Modules

#### 📞 Support & Ticketing
- Integrated support inbox with Chatwoot
- Ticket management and tracking
- Customer interaction history
- AI-powered call assistant with Telnyx integration

#### 🏢 CRM (Customer Relationship Management)
- Lead and contact management via EspoCRM
- Deal pipeline tracking
- Customer data synchronization
- Sales performance analytics

#### 📧 Marketing Campaigns
- Email marketing automation with Mautic
- Campaign performance tracking
- Segmentation and targeting
- Lead nurturing workflows

#### ⚡ Automations
- Workflow automation with n8n
- Cross-platform data synchronization
- Event-driven triggers
- Custom automation scenarios

#### 📱 Communication
- Voice calling with Telnyx integration
- Chat widget for website integration
- Call logging and recording
- SMS capabilities (optional)

## 🏗️ Architecture

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

## 🛠️ Technology Stack

### Frontend
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern UI component library
- **Framer Motion**: Smooth animations
- **React Query**: Data fetching and caching

### Backend Services
- **Chatwoot**: Open-source customer support platform
- **EspoCRM**: Customer relationship management
- **Mautic**: Marketing automation platform
- **n8n**: Workflow automation tool
- **Redis**: Caching and session storage
- **Nginx**: Reverse proxy and load balancer

### Database & Auth
- **Supabase**: PostgreSQL database with real-time features
- **Row Level Security**: Secure data access
- **JWT Authentication**: Secure user sessions

### Infrastructure
- **Docker Compose**: Container orchestration
- **SSL/TLS**: Secure HTTPS connections
- **DigitalOcean**: Cloud hosting platform

## 📦 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose
- Supabase account
- Domain name (for production)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/fixidesk-debug/fixidesk-ai-frontend.git
   cd fixidesk-ai-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start backend services**
   ```bash
   docker-compose up -d
   ```

5. **Start frontend development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Chatwoot: http://localhost:8080
   - EspoCRM: http://localhost:8081
   - Mautic: http://localhost:8082
   - n8n: http://localhost:5678

### Production Deployment

For production deployment, see the comprehensive [DEPLOYMENT.md](./DEPLOYMENT.md) guide.

## 🔧 Configuration

### Environment Variables

Key environment variables to configure:

```env
# Supabase
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key

# Database
POSTGRES_DB=fixidesk
POSTGRES_USER=fixidesk_user
POSTGRES_PASSWORD=secure_password

# Services
ESPOCRM_ADMIN_USERNAME=admin
MAUTIC_ADMIN_EMAIL=admin@yourdomain.com
CHATWOOT_SECRET_KEY_BASE=random_secret_key

# Optional: Telnyx for calling
TELNYX_API_KEY=your-telnyx-api-key
TELNYX_PHONE_NUMBER=your-phone-number
```

### Service Configuration

Each service requires initial setup:

1. **EspoCRM**: Configure API access and create admin user
2. **Mautic**: Set up email configuration and API credentials
3. **Chatwoot**: Create inbox and configure webhooks
4. **n8n**: Import workflows and configure service credentials

## 🔄 Automation Workflows

FixiDesk includes pre-built automation workflows:

### 1. New Lead to CRM
- **Trigger**: Website form submission
- **Actions**: Create lead in EspoCRM → Store in Supabase → Add to Mautic

### 2. Chat to Ticket
- **Trigger**: Support message in Chatwoot
- **Actions**: Create ticket in EspoCRM → Log in Supabase → Send confirmation

### 3. Missed Call Alert
- **Trigger**: Missed call via Telnyx
- **Actions**: Log call → Create follow-up task → Send email alert

### 4. Lead Nurturing
- **Trigger**: Qualified lead in CRM
- **Actions**: Add to Mautic segment → Start nurture campaign → Update records

## 📊 Dashboard Features

### Overview Dashboard
- Key performance metrics
- Recent activity feed
- Quick action buttons
- Team status indicators

### Support Module
- Ticket management interface
- Customer interaction history
- Response time analytics
- Agent performance metrics

### CRM Module
- Lead and contact management
- Deal pipeline visualization
- Sales performance tracking
- Customer communication history

### Campaigns Module
- Email campaign management
- Performance analytics
- Segmentation tools
- A/B testing capabilities

### Automations Module
- Workflow management interface
- Execution monitoring
- Performance metrics
- Error handling and logs

### Calling Module
- Telnyx integration for voice calls
- Call history and recordings
- Customer interaction tracking
- Performance analytics

## 🔐 Security Features

- **Authentication**: Supabase Auth with JWT tokens
- **Authorization**: Row Level Security (RLS) policies
- **Data Encryption**: SSL/TLS for all communications
- **API Security**: Rate limiting and input validation
- **Access Control**: Role-based permissions

## 📈 Analytics & Reporting

- **Real-time Dashboards**: Live performance metrics
- **Custom Reports**: Configurable reporting tools
- **Data Export**: CSV/Excel export capabilities
- **API Access**: RESTful APIs for custom integrations

## 🔌 Integrations

### Current Integrations
- **Chatwoot**: Customer support and live chat
- **EspoCRM**: Customer relationship management
- **Mautic**: Email marketing and automation
- **n8n**: Workflow automation
- **Telnyx**: Voice calling and SMS
- **Supabase**: Database and authentication

### Extensibility
The platform is designed for easy integration with additional services:
- RESTful API architecture
- Webhook support
- Custom automation workflows
- Plugin system for extensions

## 🧪 Testing

### Frontend Testing
```bash
npm run test          # Run unit tests
npm run test:e2e      # Run end-to-end tests
npm run lint          # Code linting
npm run type-check    # TypeScript checking
```

### Integration Testing
- API endpoint testing
- Webhook functionality
- Database operations
- Authentication flows

## 📚 Documentation

- [Deployment Guide](./DEPLOYMENT.md) - Complete production deployment instructions
- [Workflow Guide](./n8n-workflows/README.md) - Automation workflow documentation

## 🆘 Support

### Getting Help
- **Documentation**: Check the docs folder for detailed guides
- **Issues**: Report bugs and feature requests on GitHub
- **Community**: Join our Discord server for community support
- **Enterprise**: Contact us for enterprise support options

### Common Issues
- **Service startup problems**: Check Docker logs and system resources
- **Authentication issues**: Verify Supabase configuration
- **Webhook failures**: Ensure n8n is accessible and credentials are correct
- **Performance issues**: Monitor resource usage and optimize as needed

## 🗺️ Roadmap

### Upcoming Features
- [ ] Advanced analytics and reporting
- [ ] Mobile application
- [ ] Additional CRM integrations
- [ ] AI-powered insights
- [ ] Multi-tenant support
- [ ] Advanced workflow builder
- [ ] Video calling integration
- [ ] Social media integrations

### Version History
- **v1.0.0**: Initial MVP release with core features
- **v0.9.0**: Beta release with automation workflows
- **v0.8.0**: Alpha release with basic dashboard

---

**Ready to transform your customer support and sales processes?** 

Get started with FixiDesk today and experience the power of unified customer engagement!

