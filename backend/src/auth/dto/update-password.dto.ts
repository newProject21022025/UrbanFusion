// src/auth/dto/update-password.dto.ts

import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  currentPassword!: string;

  @IsString()
  @MinLength(6)
  newPassword!: string;
}
