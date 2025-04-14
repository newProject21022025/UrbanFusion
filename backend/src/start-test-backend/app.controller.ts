import { Controller, Get, Query } from '@nestjs/common';
import { CardService } from './app.service';

@Controller('cards')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get()
  getCards(@Query('lang') lang: 'en' | 'uk' = 'en') {
    return this.cardService.findAll(lang);
  }
}
