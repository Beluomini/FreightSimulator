import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { LogisticOperatorService } from './logistic-operator.service';
import { CreateLogisticOperatorDto } from './dto/create-logistic-operator.dto';
import { UpdateLogisticOperatorDto } from './dto/update-logistic-operator.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseLogisticOperatorDto } from './dto/response-logistic-operator.dto';

@Controller('logistic-operator')
export class LogisticOperatorController {
  constructor(
    private readonly logisticOperatorService: LogisticOperatorService,
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Logistic Operator created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request data is incorrect',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error creating Logistic Operator',
  })
  async create(@Body() createLogisticOperatorDto: CreateLogisticOperatorDto) {
    const createdLogisticOperator: ResponseLogisticOperatorDto =
      await this.logisticOperatorService.create(createLogisticOperatorDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Logistic Operator created successfully',
      data: createdLogisticOperator,
    };
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logistic Operators fetched',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error creating Logistic Operator',
  })
  async findAll() {
    const list: ResponseLogisticOperatorDto[] =
      await this.logisticOperatorService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Logistic Operators fetched successfully',
      data: list,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logistic Operator fetched',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Logistic Operator not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error creating Logistic Operator',
  })
  async findOne(@Param('id') id: string) {
    const logisticOperator: ResponseLogisticOperatorDto =
      await this.logisticOperatorService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Logistic Operator fetched successfully',
      data: logisticOperator,
    };
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logistic Operator updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Logistic Operator not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error creating Logistic Operator',
  })
  async update(
    @Param('id') id: string,
    @Body() updateLogisticOperatorDto: UpdateLogisticOperatorDto,
  ) {
    const updatedLogisticOperator: ResponseLogisticOperatorDto =
      await this.logisticOperatorService.update(id, updateLogisticOperatorDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Logistic Operator updated successfully',
      data: updatedLogisticOperator,
    };
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logistic Operator deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Logistic Operator not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error creating Logistic Operator',
  })
  async remove(@Param('id') id: string) {
    await this.logisticOperatorService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Logistic Operator deleted successfully',
      data: id,
    };
  }
}
