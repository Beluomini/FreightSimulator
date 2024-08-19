import { ApiProperty } from '@nestjs/swagger';

export class ResponseLogisticOperatorDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cubicFactor: number;

  @ApiProperty()
  distanceMult: number;

  @ApiProperty()
  distanceMult100: number;

  @ApiProperty()
  distanceMult500: number;

  @ApiProperty()
  deliveryTime: number;

  @ApiProperty()
  deliveryTime100: number;

  @ApiProperty()
  deliveryTime500: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
