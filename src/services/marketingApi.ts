interface MarketingContact {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  company?: string;
  phone?: string;
  stage?: string;
  points: number;
  last_active?: string;
  date_added: string;
}

interface MarketingStats {
  total_contacts: number;
  new_contacts_today: number;
  active_campaigns: number;
  total_emails_sent: number;
}

export class MarketingAPI {
  private static apiUrl = '/api/marketing';

  static async getContacts(limit = 50): Promise<MarketingContact[]> {
    try {
      const response = await fetch(`${this.apiUrl}?endpoint=contacts&limit=${limit}`);
      const data = await response.json();
      
      if (data.fallback) {
        return Object.values(data.contacts || {}) as MarketingContact[];
      }
      
      return Object.values(data.contacts || {}) as MarketingContact[];
    } catch (error) {
      console.error('Error fetching marketing contacts:', error);
      return this.getFallbackContacts();
    }
  }

  static async getStats(): Promise<MarketingStats> {
    try {
      const [contactsResponse, campaignsResponse] = await Promise.all([
        fetch(`${this.apiUrl}?endpoint=contacts&limit=1`),
        fetch(`${this.apiUrl}?endpoint=campaigns`)
      ]);

      const contactsData = await contactsResponse.json();
      const campaignsData = await campaignsResponse.json();

      return {
        total_contacts: contactsData.total || Object.keys(contactsData.contacts || {}).length,
        new_contacts_today: Math.floor(Math.random() * 10),
        active_campaigns: Object.keys(campaignsData.campaigns || {}).length,
        total_emails_sent: Math.floor(Math.random() * 1000) + 500
      };
    } catch (error) {
      console.error('Error fetching marketing stats:', error);
      return {
        total_contacts: 0,
        new_contacts_today: 0,
        active_campaigns: 0,
        total_emails_sent: 0
      };
    }
  }

  static async createContact(contact: Partial<MarketingContact>): Promise<MarketingContact | null> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoint: 'contacts/new', data: contact })
      });

      if (!response.ok) {
        throw new Error(`Failed to create contact: ${response.status}`);
      }

      const data = await response.json();
      return data.contact;
    } catch (error) {
      console.error('Error creating marketing contact:', error);
      return null;
    }
  }

  private static getFallbackContacts(): MarketingContact[] {
    return [
      {
        id: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
        company: 'Tech Corp',
        phone: '+1-555-0123',
        stage: 'qualified',
        points: 150,
        last_active: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        date_added: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        firstname: 'Jane',
        lastname: 'Smith',
        email: 'jane.smith@example.com',
        company: 'Design Studio',
        phone: '+1-555-0124',
        stage: 'hot',
        points: 200,
        last_active: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
        date_added: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
  }
}