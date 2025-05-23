// src/app/api/auth/register/route.ts


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
    
    // Упрощенная валидация (основную делаем на фронтенде)
    if (!body.firstName || !body.login || !body.password) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Необхідні поля: firstName, login, password' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const backendResponse = await fetch('https://urban-fusion-amber.vercel.app/uk/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: body.firstName,
        login: body.login,
        password: body.password,
        lastName: body.lastName || null,
        dateOfBirth: body.dateOfBirth || null,
        phone: body.phone || null,
        address: body.address || null,
        postOfficeDetails: body.postOfficeDetails || null
      })
    });

    const responseData = await backendResponse.json();

    if (!backendResponse.ok) {
      return new NextResponse(
        JSON.stringify({ 
          success: false,
          message: responseData.message || 'Помилка реєстрації',
          details: responseData
        }),
        { status: backendResponse.status, headers: corsHeaders }
      );
    }

    return new NextResponse(
      JSON.stringify(responseData),
      { status: 200, headers: corsHeaders }
    );

  } catch (error) {
    return new NextResponse(
      JSON.stringify({ 
        success: false,
        message: 'Внутрішня помилка сервера',
        error: error instanceof Error ? error.message : 'Невідома помилка'
      }),
      { status: 500, headers: corsHeaders }
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