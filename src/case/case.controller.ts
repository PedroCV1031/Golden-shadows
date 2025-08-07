import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaseService } from './case.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';

@Controller('cases')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Post()
  create(@Body() createCaseDto: CreateCaseDto) {
    return this.caseService.create(createCaseDto);
  }

  @Get()
  findAll() {
    return this.caseService.findAll();
  }

  @Get(':caseId')
  findOne(@Param('caseId') caseId: string) {
    return this.caseService.findOne(caseId);
  }

  @Patch(':caseId')
  update(@Param('caseId') caseId: string, @Body() updateCaseDto: UpdateCaseDto) {
    return this.caseService.update(caseId, updateCaseDto);
  }

  @Delete(':caseId')
  remove(@Param('caseId') caseId: string) {
    return this.caseService.remove(caseId);
  }
}