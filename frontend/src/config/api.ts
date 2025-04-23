// src/config/api.ts
export const API_CONFIG = {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    endpoints: {
      login: '/api/auth/login'
    }
  };