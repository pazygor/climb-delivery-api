// dto/protheus-alert.dto.ts
import { IsString, IsNumber, IsDateString, IsArray, IsOptional } from 'class-validator';

export class ProtheusAlertDto {
    @IsArray()
    @IsOptional()
    alerts?: any[];
    @IsString()
    tenant: string;

    @IsString()
    user_so: string;

    @IsString()
    service_name: string;

    @IsString()
    routine: string;

    @IsNumber()
    percent_use: number;

    @IsNumber()
    memory_usage: number;

    @IsNumber()
    memory_app: number;

    @IsString()
    server_ip: string;

    @IsNumber()
    memory_server: number;

    @IsDateString()
    timestamp: string;
}
