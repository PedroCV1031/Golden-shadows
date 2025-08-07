import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VictimsService } from './victims.service';
import { VictimsController } from './victims.controller';
import { Victim, VictimSchema } from './entities/victim.entity';
import { Case, CaseSchema } from 'src/case/entities/case.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Victim.name, schema: VictimSchema },
      { name: Case.name, schema: CaseSchema }, 
    ]),
  ],
  controllers: [VictimsController],
  providers: [VictimsService],
})
export class VictimsModule {}

