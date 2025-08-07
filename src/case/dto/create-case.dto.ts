import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateCaseDto {
  @IsString()
  caseId: string;

  @IsArray()
  @IsString({ each: true })
  detectives: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  relatedCases?: string[];
}



