import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  productHeight: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productWidth: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productDepth: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productWeight: number;
}
