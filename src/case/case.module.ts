import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Case, CaseSchema } from './entities/case.entity';
import { Victim, VictimSchema } from 'src/victims/entities/victim.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Case.name, schema: CaseSchema },
      { name: Victim.name, schema: VictimSchema }, // Importamos esquema de Victim para poblado
    ]),
  ],
  controllers: [CaseController],
  providers: [CaseService],
})
export class CaseModule {}