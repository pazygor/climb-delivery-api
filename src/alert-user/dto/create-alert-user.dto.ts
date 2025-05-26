import { IsString, IsNotEmpty, IsInt } from 'class-validator';
export class CreateAlertUserDto {
    @IsInt()
    @IsNotEmpty()
    servidorId: number;

    @IsString()
    @IsNotEmpty()
    contato: string;

    @IsString()
    @IsNotEmpty()
    grupo: string;
}
