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

  @Get(':name/:family')
  findOne(@Param('name') name: string, @Param('family') family: string) {
    return this.victimsService.findOne(name, family);
  }

  @Patch(':name/:family')
  update(
    @Param('name') name: string,
    @Param('family') family: string,
    @Body() updateVictimDto: UpdateVictimDto,
  ) {
    return this.victimsService.update(name, family, updateVictimDto);
  }

  @Delete(':name/:family')
  remove(@Param('name') name: string, @Param('family') family: string) {
    return this.victimsService.remove(name, family);
  }
}
