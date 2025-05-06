// src/api/clothesService.ts
import type { FormData as ClothesFormData } from "../../../components/clothesForm/ClothesForm";
export interface Clothes {
    _id: string;
    slug: string;
    name: {
      en: string;
      uk: string;
    };
    description: {
      en: string;
      uk: string;
    };
    mainImage: {
      url: string;
      alt: {
        en: string;
        uk: string;
      };
    } | null;
    price: {
      amount: number;
      currency: string;
      discount: number;
    };
    availability: boolean;
    category: {
      id: string;
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
    careInstructions: {
      en: string;
      uk: string;
    }[];
    details: {
      en: string;
      uk: string;
    }[];
    reviews: {
      id: string;
      userId: string;
      userName: string;
      rating: number;
      comment: {
        en: string;
        uk: string;
      };
      likes: string[];
    }[];
    gender: 'male' | 'female';
  } 

  
  export const clothesService = {
    // Fetch all clothes items
    async getAllClothes(locale: string): Promise<Clothes[]> {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Failed to fetch clothes:", error);
        throw error;
      }
    },
  
    // Fetch single clothes item
    async getClothesById(id: string, locale: string): Promise<Clothes> {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes/${id}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error(`Failed to fetch clothes with id ${id}:`, error);
        throw error;
      }
    },
  
    // Create new clothes item
    async createClothes(data: ClothesFormData, locale: string): Promise<Clothes> {
        try {
          const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes`;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP помилка! статус: ${response.status}`);
          }
    
          return await response.json();
        } catch (error) {
          console.error("Помилка при створенні картки:", error);
          throw error;
        }
      },
  
    // Update clothes item
    async updateClothes(
      id: string,
      data: ClothesFormData,
      locale: string
    ): Promise<Clothes> {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes/${id}`;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error(`Failed to update clothes with id ${id}:`, error);
        throw error;
      }
    },
  
    // Delete clothes item
    async deleteClothes(id: string, locale: string): Promise<void> {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${locale}/clothes/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error(`Failed to delete clothes with id ${id}:`, error);
        throw error;
      }
    },
    
  };