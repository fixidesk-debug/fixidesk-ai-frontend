export interface SMTPConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
}

export const defaultSMTPConfig: SMTPConfig = {
  host: import.meta.env.VITE_SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(import.meta.env.VITE_SMTP_PORT || '587'),
  username: import.meta.env.VITE_SMTP_USERNAME || '',
  password: import.meta.env.VITE_SMTP_PASSWORD || '',
  fromEmail: import.meta.env.VITE_SMTP_FROM_EMAIL || 'noreply@fixidesk.com',
  fromName: import.meta.env.VITE_SMTP_FROM_NAME || 'FixiDesk'
};

export const validateSMTPConfig = (config: SMTPConfig): boolean => {
  return !!(config.host && config.username && config.password && config.fromEmail);
};