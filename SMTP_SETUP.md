# SMTP Setup Guide for FixiDesk

This guide will help you configure SMTP for email functionality across all FixiDesk services.

## Quick Setup

### 1. Update Environment Variables

Edit your `.env` file with your SMTP credentials:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM_EMAIL=noreply@fixidesk.com
SMTP_FROM_NAME=FixiDesk

# Chatwoot SMTP
CHATWOOT_SMTP_HOST=smtp.gmail.com
CHATWOOT_SMTP_PORT=587
CHATWOOT_SMTP_USERNAME=your-email@gmail.com
CHATWOOT_SMTP_PASSWORD=your-app-password

# Mautic SMTP
MAUTIC_MAILER_HOST=smtp.gmail.com
MAUTIC_MAILER_PORT=587
MAUTIC_MAILER_USERNAME=your-email@gmail.com
MAUTIC_MAILER_PASSWORD=your-app-password
```

### 2. Restart Services

```bash
docker-compose down
docker-compose up -d
```

## Supported SMTP Providers

### Gmail
- Host: `smtp.gmail.com`
- Port: `587`
- Requires App Password (not regular password)

### Outlook/Hotmail
- Host: `smtp-mail.outlook.com`
- Port: `587`

### SendGrid
- Host: `smtp.sendgrid.net`
- Port: `587`
- Username: `apikey`
- Password: Your SendGrid API key

### Mailgun
- Host: `smtp.mailgun.org`
- Port: `587`

## Gmail Setup Instructions

1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account settings > Security > App passwords
3. Generate an app password for "Mail"
4. Use this app password in your SMTP configuration

## Testing SMTP Configuration

The services will automatically use the SMTP configuration. Check logs for any connection issues:

```bash
docker-compose logs chatwoot_web
docker-compose logs mautic
```

## Troubleshooting

### Common Issues

1. **Authentication Failed**: Check username/password
2. **Connection Timeout**: Verify host/port settings
3. **SSL/TLS Errors**: Ensure correct port (587 for TLS, 465 for SSL)

### Service-Specific Configuration

Each service (Chatwoot, Mautic, EspoCRM) may require additional configuration through their web interfaces after initial setup.