import { Injectable } from '@nestjs/common';
import { CreateLogisticOperatorDto } from './dto/create-logistic-operator.dto';
import { UpdateLogisticOperatorDto } from './dto/update-logistic-operator.dto';
import { LogisticOperatorRepository } from './logistic-operator.repository';

@Injectable()
export class LogisticOperatorService {
  constructor(private readonly repository: LogisticOperatorRepository) {}

  create(createLogisticOperatorDto: CreateLogisticOperatorDto) {
    return this.repository.create(createLogisticOperatorDto);
  }

  findAll() {
    return this.repository.findMany();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, updateLogisticOperatorDto: UpdateLogisticOperatorDto) {
    return this.repository.update(id, updateLogisticOperatorDto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
