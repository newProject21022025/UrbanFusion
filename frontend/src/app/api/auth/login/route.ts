// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // Важно для Vercel

export async function POST(request: Request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const body = await request.json();
    console.log('[Login API] Request data:', body);

    // Валидация обязательных полей
    if (!body.login || !body.password) {
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          message: 'Email and password are required' 
        }),
        { 
          status: 400,
          headers: corsHeaders 
        }
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://urban-fusion-amber.vercel.app';
    const backendUrl = `${apiUrl}/uk/auth/login`;

    console.log('[Login API] Forwarding to:', backendUrl);

    const res = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        login: body.login,
        password: body.password
      })
    });

    // Обработка не-JSON ответов
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      const text = await res.text();
      console.error('[Login API] Non-JSON response:', text);
      return new NextResponse(
        JSON.stringify({ 
          success: false, 
          message: 'Invalid response format from backend' 
        }),
        { 
          status: 500,
          headers: corsHeaders
        }
      );
    }

    const responseData = await res.json();

    if (!res.ok) {
      console.error('[Login API] Backend error:', responseData);
      return new NextResponse(
        JSON.stringify({
          success: false,
          message: responseData.message || 'Login failed',
          details: responseData
        }),
        {
          status: res.status,
          headers: corsHeaders
        }
      );
    }

    console.log('[Login API] Login successful');
    return new NextResponse(
      JSON.stringify(responseData),
      {
        status: 200,
        headers: corsHeaders
      }
    );

  } catch (error) {
    console.error('[Login API] Error:', error);
    return new NextResponse(
      JSON.stringify({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    }
  });
}