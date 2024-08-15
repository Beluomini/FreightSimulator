import { Injectable } from '@nestjs/common';
import { CreateLogisticOperatorDto } from './dto/create-logistic-operator.dto';
import { UpdateLogisticOperatorDto } from './dto/update-logistic-operator.dto';
import { PrismaService } from '../database/prisma.service';
import { ResponseLogisticOperatorDto } from './dto/response-logistic-operator.dto';

@Injectable()
export class LogisticOperatorRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    createLogisticOperatorDto: CreateLogisticOperatorDto,
  ): Promise<ResponseLogisticOperatorDto> {
    return await this.prisma.logisticOperator.create({
      data: createLogisticOperatorDto,
    });
  }

  async findMany(): Promise<ResponseLogisticOperatorDto[]> {
    return await this.prisma.logisticOperator.findMany();
  }

  async findOne(id: string): Promise<ResponseLogisticOperatorDto> {
    return await this.prisma.logisticOperator.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateLogisticOperatorDto: UpdateLogisticOperatorDto,
  ): Promise<ResponseLogisticOperatorDto> {
    return await this.prisma.logisticOperator.update({
      where: { id },
      data: updateLogisticOperatorDto,
    });
  }

  async remove(id: string): Promise<ResponseLogisticOperatorDto> {
    return await this.prisma.logisticOperator.delete({
      where: { id },
    });
  }
}
