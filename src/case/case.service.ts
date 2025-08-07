import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Case } from './entities/case.entity'; 
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';

@Injectable()
export class CaseService {
  constructor(
    @InjectModel(Case.name)
    private readonly caseModel: Model<Case>,
    
    @InjectModel('Victim')
    private readonly victimModel: Model<any> 
  ) {}

  async create(createCaseDto: CreateCaseDto) {
    const { caseId, detectives, relatedCases } = createCaseDto;
    const victims = await this.victimModel.find({ caseId }).exec();
    const victimNames = victims.map((v) => v.name);
    const murderMethods = victims.map((v) => v.murderMethod);
    const newCase = await this.caseModel.create({
      caseId,
      victimNames, 
      detectives,
      murderMethods,
      relatedCases,
    });
    return newCase;
  }



  async findAll() {
    return this.caseModel.find({});
  }

  async findOne(caseId: string) {
    const found = await this.caseModel.findOne({ caseId });

    if (!found) {
      throw new NotFoundException('Caso no encontrado');
    }

    return found;
  }

  async update(caseId: string, updateCaseDto: UpdateCaseDto) {
  const existing = await this.findOne(caseId);

  if (!existing) {
      throw new NotFoundException('Caso no encontrado');
    }

    const lookupCaseId = updateCaseDto.caseId ?? caseId;

    const victims = await this.victimModel.find({ caseId: lookupCaseId }).exec();
    const victimNames = victims.map(v => v.name);
    const murderMethods = victims.map(v => v.murderMethod);

    const updatedData = {
      ...updateCaseDto,
      victimNames,
      murderMethods,
    };

    await this.caseModel.updateOne({ caseId }, updatedData);

    return this.findOne(lookupCaseId);
  }


  async remove(caseId: string) {
    const existing = await this.findOne(caseId);
    await this.caseModel.deleteOne({ caseId });

    if (!existing) {
      throw new NotFoundException('Caso no encontrado');
    }

    return existing;
  }
}