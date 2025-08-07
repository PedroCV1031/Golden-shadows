import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VictimsService } from './victims.service';
import { CreateVictimDto } from './dto/create-victim.dto';
import { UpdateVictimDto } from './dto/update-victim.dto';

@Controller('victims')
export class VictimsController {
  constructor(private readonly victimsService: VictimsService) {}

  @Post()
  create(@Body() createVictimDto: CreateVictimDto) {
    return this.victimsService.create(createVictimDto);
  }

  @Get()
  findAll() {
    return this.victimsService.findAll();
  }

  @Get(':caseId')
  findOne(@Param('caseId') caseId: string) {
    return this.victimsService.findOne(caseId);
  }

  @Patch(':caseId')
  update(@Param('caseId') caseId: string, @Body() updateVictimDto: UpdateVictimDto) {
    return this.victimsService.update(caseId, updateVictimDto);
  }

  @Delete(':caseId')
  remove(@Param('caseId') caseId: string) {
    return this.victimsService.remove(caseId);
  }
}
