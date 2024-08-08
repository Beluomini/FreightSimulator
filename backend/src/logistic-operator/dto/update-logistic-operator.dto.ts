import { PartialType } from '@nestjs/swagger';
import { CreateLogisticOperatorDto } from './create-logistic-operator.dto';

export class UpdateLogisticOperatorDto extends PartialType(
  CreateLogisticOperatorDto,
) {}
