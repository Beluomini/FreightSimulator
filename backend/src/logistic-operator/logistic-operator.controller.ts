import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LogisticOperatorService } from './logistic-operator.service';
import { CreateLogisticOperatorDto } from './dto/create-logistic-operator.dto';
import { UpdateLogisticOperatorDto } from './dto/update-logistic-operator.dto';

@Controller('logistic-operator')
export class LogisticOperatorController {
  constructor(
    private readonly logisticOperatorService: LogisticOperatorService,
  ) {}

  @Post()
  create(@Body() createLogisticOperatorDto: CreateLogisticOperatorDto) {
    return this.logisticOperatorService.create(createLogisticOperatorDto);
  }

  @Get()
  findAll() {
    return this.logisticOperatorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logisticOperatorService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLogisticOperatorDto: UpdateLogisticOperatorDto,
  ) {
    return this.logisticOperatorService.update(id, updateLogisticOperatorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logisticOperatorService.remove(id);
  }
}
