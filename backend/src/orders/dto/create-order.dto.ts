// src/orders/dto/create-order.dto.ts
import { Types } from 'mongoose';

export class CreateOrderDto {
  userId!: Types.ObjectId;
  userEmail!: string;
  deliveryAddress!: string;
  postOfficeDetails?: string;

  firstName!: string;
  lastName!: string;
  phone!: string;

  items!: {
    productId: Types.ObjectId;
    quantity: number;
    size: string;
    color: string;
  }[];
}


// // src/orders/dto/create-order.dto.ts
// import { Types } from 'mongoose';

// export class CreateOrderDto {
//   userId!: Types.ObjectId;
//   userEmail!: string;
//   deliveryAddress!: string;
//   postOfficeDetails?: string;
//   items!: {
//     productId: Types.ObjectId;
//     quantity: number;
//     size: string;
//     color: string;
//   }[];
// }

