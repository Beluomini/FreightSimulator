import { Injectable } from '@nestjs/common';
import { CreateLogisticOperatorDto } from './dto/create-logistic-operator.dto';
import { UpdateLogisticOperatorDto } from './dto/update-logistic-operator.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class LogisticOperatorRepository {
  constructor(private prisma: PrismaService) {}

  create(createLogisticOperatorDto: CreateLogisticOperatorDto) {
    return this.prisma.logisticOperator.create({
      data: createLogisticOperatorDto,
    });
  }

  findMany() {
    return this.prisma.logisticOperator.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.logisticOperator.findUnique({
      where: { id },
    });
  }

  update(id: string, updateLogisticOperatorDto: UpdateLogisticOperatorDto) {
    return this.prisma.logisticOperator.update({
      where: { id },
      data: updateLogisticOperatorDto,
    });
  }

  remove(id: string) {
    return this.prisma.logisticOperator.delete({
      where: { id },
    });
  }
}
