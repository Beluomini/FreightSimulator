import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateLogisticOperatorDto } from './dto/create-logistic-operator.dto';
import { UpdateLogisticOperatorDto } from './dto/update-logistic-operator.dto';
import { LogisticOperatorRepository } from './logistic-operator.repository';
import { ResponseLogisticOperatorDto } from './dto/response-logistic-operator.dto';

@Injectable()
export class LogisticOperatorService {
  constructor(private readonly repository: LogisticOperatorRepository) {}

  async create(
    createLogisticOperatorDto: CreateLogisticOperatorDto,
  ): Promise<ResponseLogisticOperatorDto> {
    try {
      return await this.repository.create(createLogisticOperatorDto);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating Logistic Operator',
      );
    }
  }

  async findAll(): Promise<ResponseLogisticOperatorDto[]> {
    try {
      return await this.repository.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error fetching Logistic Operators',
      );
    }
  }

  async findOne(id: string): Promise<ResponseLogisticOperatorDto> {
    try {
      const logisticOperator = await this.repository.findOne(id);
      if (!logisticOperator) {
        throw new NotFoundException('Logistic Operator not found');
      }
      return logisticOperator;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error fetching Logistic Operator',
      );
    }
  }

  async update(
    id: string,
    updateLogisticOperatorDto: UpdateLogisticOperatorDto,
  ): Promise<ResponseLogisticOperatorDto> {
    try {
      const logisticOperator = await this.findOne(id);
      if (!logisticOperator) {
        throw new NotFoundException('Logistic Operator not found');
      }
      return await this.repository.update(id, updateLogisticOperatorDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error updating Logistic Operator',
      );
    }
  }

  async remove(id: string): Promise<ResponseLogisticOperatorDto> {
    try {
      const logisticOperator = await this.findOne(id);
      if (!logisticOperator) {
        throw new NotFoundException('Logistic Operator not found');
      }
      return await this.repository.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error deleting Logistic Operator',
      );
    }
  }
}
