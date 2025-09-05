(function() {
  'use strict';

  const WIDGET_API_BASE = 'https://your-domain.com/api';
  
  class FixiDeskWidget {
    constructor(widgetId) {
      this.widgetId = widgetId;
      this.sessionId = this.generateSessionId();
      this.isOpen = false;
      this.settings = {};
      this.messages = [];
      
      this.init();
    }

    generateSessionId() {
      return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    async init() {
      try {
        await this.loadSettings();
        if (this.settings.enabled) {
          this.createWidget();
          this.loadMessages();
        }
      } catch (error) {
        console.error('FixiDesk Widget Error:', error);
      }
    }

    async loadSettings() {
      const response = await fetch(`${WIDGET_API_BASE}/widget?widgetId=${this.widgetId}`);
      const data = await response.json();
      this.settings = data.settings;
    }

    async loadMessages() {
      const response = await fetch(`${WIDGET_API_BASE}/chat?widgetId=${this.widgetId}&sessionId=${this.sessionId}`);
      const data = await response.json();
      this.messages = data.messages || [];
      this.renderMessages();
    }

    async sendMessage(content) {
      const response = await fetch(`${WIDGET_API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          widgetId: this.widgetId,
          sessionId: this.sessionId
        })
      });
      
      const data = await response.json();
      if (data.success) {
        this.messages.push(data.userMessage, data.aiMessage);
        this.renderMessages();
      }
    }

    createWidget() {
      const widgetHTML = `
        <div id="fixidesk-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 10000; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div id="fixidesk-button" style="width: 60px; height: 60px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 50%; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); display: flex; align-items: center; justify-content: center; transition: transform 0.2s;">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
          <div id="fixidesk-chat" style="display: none; width: 350px; height: 500px; background: white; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.12); position: absolute; bottom: 80px; right: 0; overflow: hidden;">
            <div id="fixidesk-header" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 16px; display: flex; align-items: center; gap: 12px;">
              <div style="width: 40px; height: 40px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <div style="width: 24px; height: 24px; background: white; border-radius: 50%;"></div>
              </div>
              <div>
                <h3 style="margin: 0; font-size: 16px; font-weight: 600;">${this.settings.widget_title}</h3>
                ${this.settings.show_online_status ? '<p style="margin: 0; font-size: 12px; opacity: 0.8;">Online now</p>' : ''}
              </div>
              <button id="fixidesk-close" style="margin-left: auto; background: none; border: none; color: white; font-size: 20px; cursor: pointer;">×</button>
            </div>
            <div id="fixidesk-messages" style="height: 380px; overflow-y: auto; padding: 16px; background: #f8fafc;"></div>
            <div id="fixidesk-input" style="padding: 16px; border-top: 1px solid #e2e8f0; background: white;">
              <div style="display: flex; gap: 8px; align-items: center;">
                <input type="text" id="fixidesk-message-input" placeholder="Type a message..." style="flex: 1; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 20px; outline: none; font-size: 14px;">
                <button id="fixidesk-send" style="width: 36px; height: 36px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border: none; border-radius: 50%; color: white; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', widgetHTML);
      this.attachEventListeners();
      
      if (this.settings.auto_greet) {
        this.messages.push({
          id: 'greeting',
          content: this.settings.greeting_message,
          sender: 'agent',
          timestamp: new Date().toISOString()
        });
        this.renderMessages();
      }
    }

    attachEventListeners() {
      const button = document.getElementById('fixidesk-button');
      const chat = document.getElementById('fixidesk-chat');
      const close = document.getElementById('fixidesk-close');
      const input = document.getElementById('fixidesk-message-input');
      const send = document.getElementById('fixidesk-send');

      button.addEventListener('click', () => this.toggleChat());
      close.addEventListener('click', () => this.toggleChat());
      send.addEventListener('click', () => this.handleSend());
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.handleSend();
      });
    }

    toggleChat() {
      const chat = document.getElementById('fixidesk-chat');
      this.isOpen = !this.isOpen;
      chat.style.display = this.isOpen ? 'block' : 'none';
    }

    handleSend() {
      const input = document.getElementById('fixidesk-message-input');
      const message = input.value.trim();
      if (message) {
        input.value = '';
        this.sendMessage(message);
      }
    }

    renderMessages() {
      const container = document.getElementById('fixidesk-messages');
      if (!container) return;

      container.innerHTML = this.messages.map(msg => `
        <div style="display: flex; gap: 8px; margin-bottom: 12px; ${msg.sender === 'user' ? 'justify-content: flex-end;' : ''}">
          ${msg.sender === 'agent' ? '<div style="width: 32px; height: 32px; background: linear-gradient(135deg, #3b82f6, #8b5cf6); border-radius: 50%; flex-shrink: 0;"></div>' : ''}
          <div style="max-width: 240px; padding: 8px 12px; border-radius: 12px; font-size: 14px; ${
            msg.sender === 'agent' 
              ? 'background: white; color: #374151; border-top-left-radius: 4px;' 
              : 'background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; border-top-right-radius: 4px;'
          }">
            ${msg.content}
          </div>
          ${msg.sender === 'user' ? '<div style="width: 32px; height: 32px; background: #9ca3af; border-radius: 50%; flex-shrink: 0;"></div>' : ''}
        </div>
      `).join('');

      container.scrollTop = container.scrollHeight;
    }
  }

  // Auto-initialize widget
  document.addEventListener('DOMContentLoaded', function() {
    const script = document.querySelector('script[data-widget-id]');
    if (script) {
      const widgetId = script.getAttribute('data-widget-id');
      new FixiDeskWidget(widgetId);
    }
  });

})();