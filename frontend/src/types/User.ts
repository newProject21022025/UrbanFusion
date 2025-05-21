export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    dateOfBirth?: string | null;
    phone?: string | null;
    address?: string | null;
    postOfficeDetails?: string | null;
    role?: string | null;
    orderHistory?: any[]; // Уточни тип, якщо є
    feedback?: any[];     // Уточни тип, якщо є
    createdAt: string;
    updatedAt: string;
  }
  