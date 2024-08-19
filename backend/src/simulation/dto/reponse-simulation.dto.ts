import { ApiProperty } from '@nestjs/swagger';
import { CreateLogisticOperatorDto } from 'src/logistic-operator/dto/create-logistic-operator.dto';

export class ResponseSimulationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  clientName: string;

  @ApiProperty()
  fromAddress: string;

  @ApiProperty()
  toAddress: string;

  @ApiProperty()
  productHeight: number;

  @ApiProperty()
  productWidth: number;

  @ApiProperty()
  productLength: number;

  @ApiProperty()
  distance: number;

  @ApiProperty()
  fasterOperator: CreateLogisticOperatorDto;

  @ApiProperty()
  fasterOperatorTime: number;

  @ApiProperty()
  fasterOperatorPrice: number;

  @ApiProperty()
  cheaperOperator: CreateLogisticOperatorDto;

  @ApiProperty()
  cheaperOperatorTime: number;

  @ApiProperty()
  cheaperOperatorPrice: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
