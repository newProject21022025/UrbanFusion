export type LocalizedString = {
    en: string;
    uk: string;
  };
  
  export type ProductImage = {
    url: string;
    alt: LocalizedString;
  };
  
  export type ProductPrice = {
    amount: number;
    currency: string;
    discount: number;
  };
  
  export type ProductCategory = {
    id: string;
    en: string;
    uk: string;
  };
  
  export type OrderItem = {
    productId: string;
    quantity: number;
    size: string;
    color: string;
    name: LocalizedString;
    description: LocalizedString;
    mainImage: ProductImage | null;
    price: ProductPrice;
    category: ProductCategory;
    gender: "male" | "female";
  };
  
  export type OrderPayload = {
    userId: string;
    userEmail: string;
    firstName: string;
    lastName: string;
    phone: string;
    deliveryAddress: string;
    postOfficeDetails: string;
    items: OrderItem[];
  };
  