# Tiledesk Integration Guide

This guide explains how to set up and use Tiledesk alongside Chatwoot in your FixiDesk platform.

## Overview

Tiledesk is an open-source conversational AI platform that provides:
- Chatbot automation
- Live chat capabilities
- AI-powered responses
- Multi-channel support
- Analytics and reporting

## Services Setup

### Port Configuration
- **Chatwoot**: http://localhost:8080
- **Tiledesk**: http://localhost:8082
- **EspoCRM**: http://localhost:8081
- **Mautic**: http://localhost:8083
- **n8n**: http://localhost:5678

### Environment Variables

Add these to your `.env` file:

```env
# Tiledesk Configuration
VITE_TILEDESK_URL=http://localhost:8082
TILEDESK_SMTP_HOST=smtp.gmail.com
TILEDESK_SMTP_PORT=587
TILEDESK_SMTP_USERNAME=your-email@gmail.com
TILEDESK_SMTP_PASSWORD=your-app-password
TILEDESK_FROM_EMAIL=noreply@fixidesk.com
```

## Starting Services

1. **Start all services**:
   ```bash
   docker-compose up -d
   ```

2. **Check service status**:
   ```bash
   docker-compose ps
   ```

## Initial Setup

### Tiledesk Setup
1. Access Tiledesk at http://localhost:8082
2. Create admin account
3. Create your first project
4. Configure chatbot settings
5. Set up email notifications

### Chatwoot Setup
1. Access Chatwoot at http://localhost:8080
2. Create admin account
3. Create inbox for website
4. Configure agent settings
5. Set up webhooks for integration

## Integration Features

### Dashboard Integration
- View Tiledesk projects and conversations
- Monitor chat analytics
- Manage chatbot responses
- Access widget integration code

### API Integration
The platform includes:
- Tiledesk API service (`src/services/tiledeskApi.ts`)
- Dashboard page (`src/pages/dashboard/Tiledesk.tsx`)
- Navigation integration

### Widget Integration
Get the widget code from the Tiledesk dashboard page and add it to your website:

```html
<script>
  window.tiledeskSettings = {
    projectid: "your-project-id",
    preChatForm: true,
    hideHeaderCloseButton: false,
    themeColor: "hsl(var(--primary))",
    themeForegroundColor: "hsl(var(--primary-foreground))"
  };
  // Widget script will be loaded automatically
</script>
```

## Workflow Automation

### n8n Integration
Create workflows to:
1. Sync conversations between Chatwoot and Tiledesk
2. Route chats based on availability
3. Escalate bot conversations to human agents
4. Log interactions in EspoCRM

### Example Workflow
1. **Trigger**: New Tiledesk conversation
2. **Action**: Create ticket in Chatwoot
3. **Action**: Add contact to EspoCRM
4. **Action**: Send notification email

## Best Practices

### Chat Routing Strategy
- Use Tiledesk for initial bot interactions
- Escalate complex queries to Chatwoot agents
- Route based on business hours and agent availability

### Data Synchronization
- Keep customer data synced between platforms
- Use n8n workflows for real-time updates
- Maintain conversation history across platforms

### Performance Optimization
- Monitor response times
- Set up proper caching with Redis
- Use webhooks for real-time updates

## Troubleshooting

### Common Issues

1. **Services not starting**:
   ```bash
   docker-compose logs tiledesk
   docker-compose logs chatwoot_web
   ```

2. **Database connection issues**:
   - Check MongoDB for Tiledesk
   - Check PostgreSQL for Chatwoot
   - Verify network connectivity

3. **API authentication**:
   - Verify JWT tokens
   - Check API credentials
   - Ensure proper CORS settings

### Health Checks
- Tiledesk: http://localhost:8082/health
- Chatwoot: http://localhost:8080/health
- MongoDB: Check connection on port 27017
- PostgreSQL: Check connection on port 5432

## Support

For issues with:
- **Tiledesk**: Check [Tiledesk Documentation](https://docs.tiledesk.com)
- **Chatwoot**: Check [Chatwoot Documentation](https://docs.chatwoot.com)
- **Integration**: Create an issue in the project repository