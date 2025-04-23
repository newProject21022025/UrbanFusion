// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

  console.log('Получен запрос на авторизацию');

  try {
    const body = await request.json();
    console.log('Данные запроса:', body);

    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('Статус ответа бэкенда:', response.status);

    if (!response.ok) {
      let errorData = {};
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: 'Authentication failed' };
      }
      console.error('Ошибка бэкенда:', errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    console.log('Успешный ответ:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Ошибка в API роуте:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
