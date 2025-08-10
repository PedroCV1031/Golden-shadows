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
    await this.caseModel.updateOne(
      { caseId: createVictimDto.caseId },
      {
        $setOnInsert: {
          caseId: createVictimDto.caseId,
          detectives: [],
          relatedCases: [],
        },
        $addToSet: {
          victimNames: createVictimDto.name,
          murderMethods: createVictimDto.murderMethod,
        },
      },
      { upsert: true }
    );
    return victim;
  }

 findAll() {
    return this.victimModel.find({});
  }
  
  async findOne(name: string, family: string) {
    const victim = await this.victimModel.findOne({ name, family });
    if (!victim) {
      throw new NotFoundException("Caso no encontrado");
    }
    return victim;
  }

  async update(name: string, family: string, updateVictimDto: UpdateVictimDto) {
    const victim = await this.findOne(name, family);
    await this.victimModel.updateOne({ name, family }, updateVictimDto);

    const updatedName = updateVictimDto.name ?? name;
    const updatedFamilyName = updateVictimDto.family ?? family;

    return this.findOne(updatedName, updatedFamilyName);
  }

  async remove(name: string, family: string) {
    const victim = await this.findOne(name, family);
    await this.victimModel.deleteOne({ name, family});

    return victim;
  }
}
