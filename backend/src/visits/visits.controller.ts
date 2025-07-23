// visits/visits.controller.ts

import { Controller, Get, Post, Req } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { Request } from 'express';

@Controller('visits')
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Get()
  async getVisits() {
    const visits = await this.visitsService.findAll();
    return { success: true, visits };
  }

  @Post()
  async logVisit(@Req() req: Request) {
    const forwardedFor = req.headers['x-forwarded-for'] as string | undefined;
    const ip = forwardedFor?.split(',')[0].trim() || req.ip || 'невідомо';
    const userAgent = req.headers['user-agent'] || 'невідомо';
    const url = req.headers.referer || 'невідомо'; // Краще читати звідси
    const timestamp = new Date().toISOString();

    const city = 'невідомо';
    const country = 'невідомо';

    await this.visitsService.create({
      ip,
      userAgent,
      url,
      timestamp,
      city,
      country,
    });

    return { success: true };
  }
}
