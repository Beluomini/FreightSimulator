import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSimulationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fromAddress: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  toAddress: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  productHeight: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  productWidth: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  productLength: number;
}
