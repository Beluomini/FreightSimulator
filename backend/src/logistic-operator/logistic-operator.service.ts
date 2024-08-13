import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLogisticOperatorDto } from './dto/create-logistic-operator.dto';
import { UpdateLogisticOperatorDto } from './dto/update-logistic-operator.dto';
import { LogisticOperatorRepository } from './logistic-operator.repository';

@Injectable()
export class LogisticOperatorService {
  constructor(private readonly repository: LogisticOperatorRepository) {}

  async create(createLogisticOperatorDto: CreateLogisticOperatorDto) {
    try {
      return await this.repository.create(createLogisticOperatorDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating Logistic Operator',
      );
    }
  }

  async findAll() {
    try {
      return await this.repository.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching Logistic Operators',
      );
    }
  }

  async findOne(id: string) {
    const logisticOperator = await this.repository.findOne(id);
    if (!logisticOperator) {
      throw new NotFoundException('Logistic Operator not found');
    }
    try {
      return logisticOperator;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching Logistic Operator',
      );
    }
  }

  async update(
    id: string,
    updateLogisticOperatorDto: UpdateLogisticOperatorDto,
  ) {
    const logisticOperator = await this.findOne(id);
    if (!logisticOperator) {
      throw new NotFoundException('Logistic Operator not found');
    }
    try {
      return await this.repository.update(id, updateLogisticOperatorDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating Logistic Operator',
      );
    }
  }

  async remove(id: string) {
    const logisticOperator = await this.findOne(id);
    if (!logisticOperator) {
      throw new NotFoundException('Logistic Operator not found');
    }
    try {
      return await this.repository.remove(id);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error deleting Logistic Operator',
      );
    }
  }
}
