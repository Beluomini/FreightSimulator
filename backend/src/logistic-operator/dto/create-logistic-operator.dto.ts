import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLogisticOperatorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  weightCost: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  distanceMult: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  distanceMult100: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  distanceMult500: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  deliveryTime: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  deliveryTime100: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  deliveryTime500: number;
}
