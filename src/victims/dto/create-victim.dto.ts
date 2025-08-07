import { IsString, IsInt, Min, Max, IsNumber } from 'class-validator';

export class CreateVictimDto {
  @IsString()
  name: string;

  @IsInt()
  @Min(0)
  @Max(120)
  age: number;

  @IsString()
  family: string;

  @IsString()
  murderMethod: string;

  @IsString()
  caseId: string;
}