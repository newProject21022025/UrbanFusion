import { Injectable } from '@nestjs/common';
import { cards } from './dto/cards.data';  // Імпортуємо готові картки
import { CardDto } from './dto/card.dto';

@Injectable()
export class CardService {
  private readonly cards: CardDto[] = cards;  // Використовуємо імпортовані дані

  findAll(lang: 'en' | 'uk' = 'en') {
    return this.cards.map((card) => ({
      id: card.id,
      title: card.title[lang],
      description: card.description[lang],
    }));
  }
}

