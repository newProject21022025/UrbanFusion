// src/auth/dto/register-user.dto.ts
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
  } from 'class-validator';
  
  export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    firstName!: string;
  
    @IsOptional()
    @IsString()
    lastName?: string;
  
    @IsEmail()
    login!: string;
  
    @IsNotEmpty()
    @MinLength(6)
    password!: string;
  
    @IsOptional()
    dateOfBirth?: Date;
  
    @IsOptional()
    @IsString()
    phone?: string;
  
    @IsOptional()
    @IsString()
    address?: string;
  
    @IsOptional()
    @IsString()
    postOfficeDetails?: string;
  }
  