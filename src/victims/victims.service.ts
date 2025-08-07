import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVictimDto } from './dto/create-victim.dto';
import { UpdateVictimDto } from './dto/update-victim.dto';
import { Victim } from './entities/victim.entity';
import { Model } from 'mongoose';
import { Case } from 'src/case/entities/case.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VictimsService {
  constructor(
    @InjectModel(Victim.name) private readonly victimModel: Model<Victim>,
    @InjectModel(Case.name) private readonly caseModel: Model<Case>,
  ) {}

  async create(createVictimDto: CreateVictimDto) {
    const victim = await this.victimModel.create(createVictimDto);
    const existingCase = await this.caseModel.findOne({ caseId: createVictimDto.caseId }).exec();
    if (!existingCase) {
      await this.caseModel.create({
        caseId: createVictimDto.caseId,
        victimNames: [createVictimDto.name],
        detectives: [], 
        murderMethods: [createVictimDto.murderMethod],
        relatedCases: [],
      });
    }
    return victim;
  }

 findAll() {
    return this.victimModel.find({});
  }

  async findOne(caseId: string) {
    const victim = await this.victimModel.findOne({caseId:caseId});
    if(!victim){
      throw new NotFoundException
      ("Caso no encontrado");
    }
    return victim;
  }

  async update(caseId: string, updateVictimDto: UpdateVictimDto) {
    const victim = await this.findOne(caseId);
    await this.victimModel.updateOne({ caseId }, updateVictimDto);
    const lookupCaseId = updateVictimDto.caseId ?? caseId;

    if (!victim) {
      throw new NotFoundException("Caso no encontrado");
    }

    return this.findOne(lookupCaseId);
  }

  async remove(caseId: string) {
    const victim = await this.findOne(caseId);
    await this.victimModel.deleteOne({ caseId });
    if(!victim){
      throw new NotFoundException
      ("Caso no encontrado");
    }
    return victim;
  }
}
