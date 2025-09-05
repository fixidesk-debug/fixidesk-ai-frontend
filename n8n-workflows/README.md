# FixiDesk n8n Automation Workflows

This directory contains pre-configured n8n workflows for the FixiDesk MVP platform. These workflows automate key business processes by connecting Supabase, EspoCRM, Mautic, Chatwoot, and Telnyx.

## Available Workflows

### 1. New Lead to CRM (`new-lead-to-crm.json`)
**Purpose**: Automatically process new leads from website forms and add them to your CRM and marketing automation.

**Trigger**: Webhook (POST to `/new-lead`)
**Flow**:
1. Receives lead data from website forms
2. Creates lead record in EspoCRM
3. Stores contact in Supabase database
4. Adds contact to Mautic for email marketing
5. Returns success response

**Required Data**:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@company.com",
  "phone": "+1234567890",
  "company": "Company Name"
}
```

### 2. Chat to Ticket (`chat-to-ticket.json`)
**Purpose**: Convert chat messages containing support requests into formal support tickets.

**Trigger**: Webhook (POST to `/chatwoot-message`)
**Flow**:
1. Receives message from Chatwoot
2. Filters for support-related messages
3. Creates case in EspoCRM
4. Stores ticket in Supabase
5. Sends confirmation message back to chat
6. Returns success response

**Required Setup**: Configure Chatwoot webhook to send message events to this endpoint.

### 3. Missed Call Alert (`missed-call-alert.json`)
**Purpose**: Process missed calls and create follow-up tasks with email notifications.

**Trigger**: Webhook (POST to `/telnyx-call-event`)
**Flow**:
1. Receives call event from Telnyx
2. Filters for missed calls (short duration, inbound)
3. Logs call details in Supabase
4. Creates follow-up task in EspoCRM
5. Sends email alert to support team
6. Returns success response

**Required Setup**: Configure Telnyx webhook for call events.

### 4. Lead Nurturing (`lead-nurturing.json`)
**Purpose**: Start automated nurturing campaigns for qualified high-value leads.

**Trigger**: Webhook (POST to `/crm-lead-update`)
**Flow**:
1. Receives lead update from CRM
2. Filters for qualified leads with high opportunity value
3. Creates contact in Mautic
4. Adds to high-value prospect segment
5. Starts nurture campaign
6. Updates records in Supabase and EspoCRM
7. Returns success response

## Installation Instructions

### 1. Import Workflows
1. Open your n8n instance at `http://localhost/n8n`
2. Go to **Workflows** → **Import from File**
3. Upload each JSON file from this directory
4. Save each workflow after import

### 2. Configure Credentials
Before activating workflows, set up these credentials in n8n:

#### EspoCRM API
- **Name**: `espocrm-credentials`
- **URL**: `http://espocrm:80` (or your EspoCRM URL)
- **Username**: `admin`
- **Password**: `admin123` (change in production)

#### Supabase API
- **Name**: `supabase-credentials`
- **URL**: Your Supabase project URL
- **Service Role Key**: Your Supabase service role key

#### Mautic API
- **Name**: `mautic-credentials`
- **URL**: `http://mautic:80` (or your Mautic URL)
- **Username**: Your Mautic username
- **Password**: Your Mautic password

#### Chatwoot API
- **Name**: `chatwoot-credentials`
- **URL**: `http://chatwoot_web:3000` (or your Chatwoot URL)
- **Access Token**: Your Chatwoot access token

#### SMTP (for email alerts)
- **Name**: `smtp-credentials`
- **Host**: Your SMTP server
- **Port**: 587 (or your SMTP port)
- **Username**: Your email username
- **Password**: Your email password

### 3. Configure Webhooks
Each workflow provides webhook URLs that need to be configured in the respective services:

#### Website Forms → New Lead to CRM
Add this webhook URL to your website forms:
```
http://your-n8n-domain/webhook/new-lead
```

#### Chatwoot → Chat to Ticket
Configure in Chatwoot settings:
```
http://your-n8n-domain/webhook/chatwoot-message
```

#### Telnyx → Missed Call Alert
Configure in Telnyx dashboard:
```
http://your-n8n-domain/webhook/telnyx-call-event
```

#### EspoCRM → Lead Nurturing
Configure in EspoCRM workflow or use API calls:
```
http://your-n8n-domain/webhook/crm-lead-update
```

### 4. Database Setup
Ensure these tables exist in your Supabase database:

#### `support_tickets`
```sql
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
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### `missed_calls`
```sql
CREATE TABLE missed_calls (
  id SERIAL PRIMARY KEY,
  call_id VARCHAR(255),
  from_number VARCHAR(50),
  to_number VARCHAR(50),
  duration INTEGER,
  timestamp TIMESTAMP,
  status VARCHAR(50)
);
```

#### `leads`
```sql
CREATE TABLE leads (
  id SERIAL PRIMARY KEY,
  espocrm_id VARCHAR(100),
  mautic_contact_id VARCHAR(100),
  nurture_campaign_started BOOLEAN DEFAULT FALSE,
  nurture_start_date TIMESTAMP,
  lead_score INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Activate Workflows
1. Open each workflow in n8n
2. Click **Active** toggle to enable
3. Test with sample data to ensure proper operation

## Testing

### Test New Lead to CRM
```bash
curl -X POST http://your-n8n-domain/webhook/new-lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "company": "Test Company"
  }'
```

### Test Chat to Ticket
```bash
curl -X POST http://your-n8n-domain/webhook/chatwoot-message \
  -H "Content-Type: application/json" \
  -d '{
    "message_type": "incoming",
    "content": "I need support with my account",
    "contact": {
      "name": "Test User",
      "email": "test@example.com"
    },
    "conversation": {
      "id": "123"
    }
  }'
```

## Monitoring

- Check workflow execution history in n8n dashboard
- Monitor error logs for failed executions
- Set up alerts for critical workflow failures
- Review performance metrics regularly

## Customization

Each workflow can be customized by:
1. Modifying node parameters
2. Adding additional processing steps
3. Changing filter conditions
4. Adding new integrations
5. Customizing response formats

## Support

For issues with these workflows:
1. Check n8n execution logs
2. Verify credential configurations
3. Test webhook endpoints
4. Review database table structures
5. Consult n8n documentation for node-specific issues

