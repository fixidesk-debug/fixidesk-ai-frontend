import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Services
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  register: (data: { name: string; email: string; password: string; company: string }) =>
    api.post('/auth/register', data),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  
  me: () => api.get('/auth/me'),
};

export const ticketsApi = {
  list: (params?: { status?: string; priority?: string; page?: number }) =>
    api.get('/tickets', { params }),
  
  get: (id: string) => api.get(`/tickets/${id}`),
  
  create: (data: { subject: string; description: string; priority: string }) =>
    api.post('/tickets', data),
  
  update: (id: string, data: Partial<{ status: string; priority: string; assignee: string }>) =>
    api.patch(`/tickets/${id}`, data),
  
  addMessage: (id: string, message: string) =>
    api.post(`/tickets/${id}/messages`, { message }),
};

export const analyticsApi = {
  overview: () => api.get('/analytics/overview'),
  tickets: (period: string) => api.get(`/analytics/tickets?period=${period}`),
  calls: (period: string) => api.get(`/analytics/calls?period=${period}`),
};

export const settingsApi = {
  profile: {
    get: () => api.get('/settings/profile'),
    update: (data: { name: string; email: string }) =>
      api.patch('/settings/profile', data),
  },
  
  company: {
    get: () => api.get('/settings/company'),
    update: (data: { name: string; domain: string; logo?: string }) =>
      api.patch('/settings/company', data),
  },
  
  integrations: {
    get: () => api.get('/settings/integrations'),
    toggle: (integration: string, enabled: boolean) =>
      api.patch(`/settings/integrations/${integration}`, { enabled }),
  },
  
  billing: {
    get: () => api.get('/settings/billing'),
    updatePlan: (plan: string) =>
      api.post('/settings/billing/plan', { plan }),
  },
};