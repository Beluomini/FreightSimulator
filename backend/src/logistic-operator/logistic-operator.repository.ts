import { Injectable } from '@nestjs/common';
import { CreateLogisticOperatorDto } from './dto/create-logistic-operator.dto';
import { UpdateLogisticOperatorDto } from './dto/update-logistic-operator.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LogisticOperatorRepository {
  constructor(private prisma: PrismaService) {}

  create(createLogisticOperatorDto: CreateLogisticOperatorDto) {
    return `This action adds the ${createLogisticOperatorDto} logisticOperator`;
  }

  findMany() {
    return `This action return all logisticOperators`;
  }

  findOne(id: number) {
    return `This action returns a #${id} logisticOperator`;
  }

  update(id: number, updateLogisticOperatorDto: UpdateLogisticOperatorDto) {
    return `This action updates a #${id} logisticOperator to ${updateLogisticOperatorDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} logisticOperator`;
  }
}
