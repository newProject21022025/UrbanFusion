// src/callback/dto/create-callback.dto.ts
import { IsString, IsEmail, IsPhoneNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateCallbackDto {
  @IsString()
  orderNumber!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  @IsPhoneNumber()
  phone!: string;

  @IsEmail()
  email!: string;

  @IsString()
  description!: string;

  @IsBoolean()
  @IsOptional()
  isProcessed?: boolean;
}