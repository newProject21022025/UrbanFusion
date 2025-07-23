// visits/visits.service.ts

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Visit, VisitDocument } from './schemas/visit.schema';

@Injectable()
export class VisitsService {
  constructor(@InjectModel(Visit.name) private visitModel: Model<VisitDocument>) {}

  async create(visit: Partial<Visit>): Promise<Visit> {
    const createdVisit = new this.visitModel(visit);
    return createdVisit.save();
  }

  async findAll(): Promise<Visit[]> {
    return this.visitModel.find().sort({ timestamp: -1 }).exec();
  }
}
