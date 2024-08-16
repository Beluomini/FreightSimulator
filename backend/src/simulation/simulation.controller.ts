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
import { SimulationService } from './simulation.service';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { UpdateSimulationDto } from './dto/update-simulation.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Simulation')
@Controller('simulation')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Simulation created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request data is incorrect',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error creating Simulation',
  })
  async create(@Body() createSimulationDto: CreateSimulationDto) {
    const createdSimulation =
      await this.simulationService.create(createSimulationDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Simulation created successfully',
      data: createdSimulation,
    };
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Simulations fetched',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error fetching Simulations',
  })
  async findAll() {
    const list = await this.simulationService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Simulations fetched successfully',
      data: list,
    };
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Simulation fetched',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Simulation not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error fetching Simulation',
  })
  async findOne(@Param('id') id: string) {
    const simulation = await this.simulationService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Simulation fetched successfully',
      data: simulation,
    };
  }

  @Patch(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Simulation updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Simulation not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error updating Simulation',
  })
  async update(
    @Param('id') id: string,
    @Body() updateSimulationDto: UpdateSimulationDto,
  ) {
    const updatedSimulation = await this.simulationService.update(
      id,
      updateSimulationDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Simulation updated successfully',
      data: updatedSimulation,
    };
  }

  @Delete(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Simulation removed',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Simulation not found',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Error removing Simulation',
  })
  async remove(@Param('id') id: string) {
    await this.simulationService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Simulation removed successfully',
      data: id,
    };
  }
}
