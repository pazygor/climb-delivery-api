import { IsDateString, IsOptional, IsInt } from 'class-validator';

export class ReportFiltersDto {
  @IsInt()
  empresaId: number;

  @IsDateString()
  dataInicio: string;

  @IsDateString()
  dataFim: string;
}
