// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('API Login request:', body);

    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const responseData = await res.json();
    
    if (!res.ok) {
      console.error('Backend error:', responseData);
      return NextResponse.json(
        { success: false, message: responseData.message || 'Login failed' },
        { status: res.status }
      );
    }

    console.log('Successful API login:', responseData);
    return NextResponse.json(responseData);
    
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}