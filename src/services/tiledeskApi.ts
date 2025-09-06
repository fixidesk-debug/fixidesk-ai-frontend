const TILEDESK_BASE_URL = import.meta.env.VITE_TILEDESK_URL || 'http://localhost:8082';

export interface TiledeskProject {
  _id: string;
  name: string;
  id_project: string;
  createdAt: string;
  updatedAt: string;
}

export interface TiledeskConversation {
  _id: string;
  conversation_id: string;
  status: number;
  lead: {
    fullname: string;
    email: string;
  };
  messages_count: number;
  createdAt: string;
  updatedAt: string;
}

export interface TiledeskMessage {
  _id: string;
  text: string;
  sender: string;
  senderFullname: string;
  recipient: string;
  timestamp: number;
  type: string;
}

class TiledeskAPI {
  private baseUrl: string;
  private token: string | null = null;

  constructor() {
    this.baseUrl = TILEDESK_BASE_URL;
  }

  setToken(token: string) {
    this.token = token;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `JWT ${this.token}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Tiledesk API error: ${response.statusText}`);
    }

    return response.json();
  }

  // Authentication
  async login(email: string, password: string) {
    const response = await this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  // Projects
  async getProjects(): Promise<TiledeskProject[]> {
    return this.request('/projects');
  }

  async getProject(projectId: string): Promise<TiledeskProject> {
    return this.request(`/projects/${projectId}`);
  }

  // Conversations
  async getConversations(projectId: string): Promise<TiledeskConversation[]> {
    return this.request(`/${projectId}/requests`);
  }

  async getConversation(projectId: string, conversationId: string): Promise<TiledeskConversation> {
    return this.request(`/${projectId}/requests/${conversationId}`);
  }

  // Messages
  async getMessages(projectId: string, conversationId: string): Promise<TiledeskMessage[]> {
    return this.request(`/${projectId}/requests/${conversationId}/messages`);
  }

  async sendMessage(projectId: string, conversationId: string, text: string) {
    return this.request(`/${projectId}/requests/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ text }),
    });
  }

  // Analytics
  async getAnalytics(projectId: string) {
    return this.request(`/${projectId}/analytics/requests/aggregate`);
  }

  // Widget
  getWidgetScript(projectId: string) {
    return `
      <script>
        window.tiledeskSettings = {
          projectid: "${projectId}",
          preChatForm: true,
          hideHeaderCloseButton: false,
          themeColor: "hsl(var(--primary))",
          themeForegroundColor: "hsl(var(--primary-foreground))"
        };
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "${this.baseUrl}/widget/launch.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'tiledesk-jssdk'));
      </script>
    `;
  }
}

export const tiledeskApi = new TiledeskAPI();