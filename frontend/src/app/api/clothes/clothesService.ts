// src/api/clothesService.ts

import type { FormData as ClothesFormData } from "@/components/clothesForm/ClothesForm";

export interface Clothes {
  selectedSize: string | undefined;
  selectedColor: string | undefined;
  _id: string;
  slug: string;
  name: { en: string; uk: string };
  description: { en: string; uk: string };
  mainImage: {
    url: string;
    alt: { en: string; uk: string };
  } | null;
  price: {
    amount: number;
    currency: string;
    discount: number;
  };
  availability: boolean;
  category: {
    en: string;
    uk: string;
  };
  stock: {
    color: {
      code: string;
      en: string;
      uk: string;
    };
    sizes: {
      size: string;
      quantity: number;
    }[];
  }[];
  careInstructions: { en: string; uk: string }[];
  details: { en: string; uk: string }[];
  reviews: {
    _id: string;
    id: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    likes: string[];
    dislikes: string[];
  }[];
  gender: "male" | "female";
}

export const clothesService = {
  async getPaginatedClothes(locale: string, page = 1, limit = 10) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes?page=${page}&limit=${limit}`
    );
    if (!res.ok) throw new Error("Failed to fetch paginated clothes");
    const json = await res.json();
    return {
      data: json.data || [],
      total: json.total || 0,
    };
  },

  async getAllClothes(locale: string): Promise<Clothes[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  },

  async getClothesById(id: string, locale: string): Promise<Clothes> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes/${id}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  },

  async createClothes(data: ClothesFormData, locale: string): Promise<Clothes> {
    const payloadToSend = {
      ...data,
      reviews: [],
      mainImage: {
        url: data.mainImage?.url || "",
        alt: {
          en: data.mainImage?.alt?.en || "",
          uk: data.mainImage?.alt?.uk || "",
        },
      },
      category: {
        en: data.category.en,
        uk: data.category.uk,
      },
      price: {
        amount: data.price.amount,
        currency: data.price.currency,
        discount: data.price.discount,
      },
      careInstructions: data.careInstructions.map(({ en, uk }) => ({ en, uk })),
      details: data.details.map(({ en, uk }) => ({ en, uk })),
      stock: data.stock.map((item) => ({
        color: {
          code: item.color.code,
          en: item.color.en,
          uk: item.color.uk,
        },
        sizes: item.sizes.map(({ size, quantity }) => ({ size, quantity })),
      })),
    };
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadToSend),
    });
  
    if (!res.ok) throw new Error(`HTTP помилка! статус: ${res.status}`);
    return await res.json();
  },
  
  async updateClothes(id: string, data: ClothesFormData, locale: string): Promise<Clothes> {
    const payloadToSend = {
      name: data.name,
      description: data.description,
      availability: data.availability,
      gender: data.gender,
      category: {
        en: data.category.en,
        uk: data.category.uk,
      },
      price: {
        amount: data.price.amount,
        currency: data.price.currency,
        discount: data.price.discount,
      },
      careInstructions: data.careInstructions.map(({ en, uk }) => ({ en, uk })),
      details: data.details.map(({ en, uk }) => ({ en, uk })),
      stock: data.stock.map((item) => ({
        color: {
          code: item.color.code,
          en: item.color.en,
          uk: item.color.uk,
        },
        sizes: item.sizes.map(({ size, quantity }) => ({ size, quantity })),
      })),
      mainImage: {
        url: data.mainImage?.url || "",
        alt: {
          en: data.mainImage?.alt?.en || "",
          uk: data.mainImage?.alt?.uk || "",
        },
      },
      // не додаємо selectedSize, selectedColor, slug, reviews, _id, createdAt, updatedAt, __v
    };
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadToSend),
      }
    );
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`HTTP error ${res.status}: ${JSON.stringify(errorData)}`);
    }
    return await res.json();
  },
  

  async deleteClothes(id: string, locale: string): Promise<void> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  },
};
