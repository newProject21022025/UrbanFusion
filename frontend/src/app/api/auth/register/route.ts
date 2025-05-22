// src/app/api/auth/register/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('API Register request:', body);

    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://urban-fusion-5fee.vercel.app';

    const res = await fetch(`${apiUrl}/uk/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const contentType = res.headers.get('content-type') || '';

    if (!contentType.includes('application/json')) {
      const text = await res.text();
      console.error('Expected JSON, got:', text);
      return NextResponse.json(
        { success: false, message: 'Invalid response format from backend' },
        { status: 500 }
      );
    }

    const responseData = await res.json();

    if (!res.ok) {
      console.error('Backend register error:', responseData);
      return NextResponse.json(
        { success: false, message: responseData.message || 'Registration failed' },
        { status: res.status }
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Register route error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
