// Widget API service for external integration
export class WidgetAPI {
  private static baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://your-domain.com/api' 
    : 'http://localhost:3000/api';

  static async getWidgetSettings(widgetId: string) {
    const response = await fetch(`${this.baseUrl}/widget?widgetId=${widgetId}`);
    return response.json();
  }

  static async sendMessage(widgetId: string, message: string, sessionId?: string) {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, widgetId, sessionId })
    });
    return response.json();
  }

  static async getMessages(widgetId: string, sessionId?: string) {
    const params = new URLSearchParams({ widgetId });
    if (sessionId) params.append('sessionId', sessionId);
    
    const response = await fetch(`${this.baseUrl}/chat?${params}`);
    return response.json();
  }

  static generateEmbedCode(widgetId: string): string {
    return `<script src="${this.baseUrl.replace('/api', '')}/widget.js" data-widget-id="${widgetId}"></script>`;
  }
}