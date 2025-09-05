import { NextRequest, NextResponse } from 'next/server';

const MARKETING_BASE_URL = process.env.VITE_MARKETING_URL || 'http://localhost:8082';
const MARKETING_USERNAME = process.env.VITE_MARKETING_USERNAME || 'admin';
const MARKETING_PASSWORD = process.env.VITE_MARKETING_PASSWORD || 'admin';

const getAuthHeaders = () => ({
  'Authorization': `Basic ${Buffer.from(`${MARKETING_USERNAME}:${MARKETING_PASSWORD}`).toString('base64')}`,
  'Content-Type': 'application/json'
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const endpoint = searchParams.get('endpoint') || 'contacts';
    const limit = searchParams.get('limit') || '50';

    const response = await fetch(`${MARKETING_BASE_URL}/api/${endpoint}?limit=${limit}`, {
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`Mautic API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Mautic proxy error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch from marketing platform',
      fallback: true,
      contacts: {
        1: {
          id: 1,
          firstname: 'John',
          lastname: 'Doe',
          email: 'john.doe@example.com',
          company: 'Tech Corp',
          points: 150,
          date_added: new Date().toISOString()
        }
      }
    });
  }
}