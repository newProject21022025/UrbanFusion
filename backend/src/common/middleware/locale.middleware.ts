// src/common/middleware/locale.middleware.ts

import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const supportedLocales = ['uk', 'en'];

@Injectable()
export class LocaleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const locale = req.url.split('/')[1]; // перший сегмент URL після /

    if (!supportedLocales.includes(locale)) {
      throw new BadRequestException(`Unsupported locale: ${locale}`);
    }

    // можна зберігати локаль у req для подальшого використання
    (req as any).locale = locale;

    next();
  }
}
