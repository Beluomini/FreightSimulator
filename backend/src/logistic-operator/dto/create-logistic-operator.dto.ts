import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateLogisticOperatorDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  cubicFactor: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  distanceMult: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  distanceMult100: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  distanceMult500: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  deliveryTime: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  deliveryTime100: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  deliveryTime500: number;
}
