import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { ResponseSimulationDto } from './dto/reponse-simulation.dto';
import { UpdateSimulationDto } from './dto/update-simulation.dto';
import { SimulationRepository } from './simulation.repository';
import { CoordinatesService } from '../integrations/geocoding/coordinates.service';
import { calculateDistance } from '../utils/distanceCalculator';
import { LogisticOperatorService } from '../logistic-operator/logistic-operator.service';
import { ResponseLogisticOperatorDto } from '../logistic-operator/dto/response-logistic-operator.dto';
import { ResponseCoordenatesDto } from '../integrations/geocoding/coordinates.dto';

@Injectable()
export class SimulationService {
  constructor(
    private readonly repository: SimulationRepository,
    private readonly coordinatesService: CoordinatesService,
    private readonly logisticOperatorService: LogisticOperatorService,
  ) {}

  async create(
    createSimulationDto: CreateSimulationDto,
  ): Promise<ResponseSimulationDto> {
    const toAdCoordinates: ResponseCoordenatesDto =
      await this.coordinatesService.getCoordinates(
        createSimulationDto.toAddress,
      );
    const fromAdCoordinates: ResponseCoordenatesDto =
      await this.coordinatesService.getCoordinates(
        createSimulationDto.fromAddress,
      );
    const distance = calculateDistance(
      toAdCoordinates.lat,
      toAdCoordinates.lng,
      fromAdCoordinates.lat,
      fromAdCoordinates.lng,
    );
    const fasterOperator = await this.findFasterLogisticOperator(distance);
    const cheaperOperator = await this.findCheaperLogisticOperator(distance);
    try {
      const simulation = await this.repository.create(createSimulationDto);
      return {
        ...simulation,
        distance: distance,
        fasterOperator: fasterOperator.operator,
        fasterOperatorTime: fasterOperator.time,
        cheaperOperator: cheaperOperator.operator,
        cheaperOperatorPrice: cheaperOperator.price,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error creating Simulation');
    }
  }

  private async findFasterLogisticOperator(distance: number) {
    const logisticOperators: ResponseLogisticOperatorDto[] =
      await this.logisticOperatorService.findAll();
    const promises = logisticOperators.map(async (operator) => {
      if (distance <= 100) {
        return {
          operator: operator,
          time: operator.deliveryTime,
        };
      } else if (distance <= 500) {
        return {
          operator: operator,
          time: operator.deliveryTime100,
        };
      } else {
        return {
          operator: operator,
          time: operator.deliveryTime500,
        };
      }
    });
    const results = await Promise.all(promises);
    const sortedResults = results.sort((a, b) => a.time - b.time);
    return sortedResults[0];
  }

  private async findCheaperLogisticOperator(distance: number) {
    const logisticOperators: ResponseLogisticOperatorDto[] =
      await this.logisticOperatorService.findAll();
    const promises = logisticOperators.map(async (operator) => {
      if (distance <= 100) {
        return {
          operator: operator,
          price: operator.distanceMult * distance,
        };
      } else if (distance <= 500) {
        return {
          operator: operator,
          price: operator.distanceMult100 * distance,
        };
      } else {
        return {
          operator: operator,
          price: operator.distanceMult500 * distance,
        };
      }
    });
    const results = await Promise.all(promises);
    const sortedResults = results.sort((a, b) => a.price - b.price);
    return sortedResults[0];
  }

  async findAll() {
    try {
      return await this.repository.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Error fetching Simulations');
    }
  }

  async findOne(id: string) {
    try {
      const simulation = await this.repository.findOne(id);
      if (!simulation) {
        throw new NotFoundException('Simulation not found');
      }
      return simulation;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error fetching Simulation');
    }
  }

  async update(id: string, updateSimulationDto: UpdateSimulationDto) {
    try {
      const simulation = await this.findOne(id);
      if (!simulation) {
        throw new NotFoundException('Simulation not found');
      }
      return await this.repository.update(id, updateSimulationDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error updating Simulation');
    }
  }

  async remove(id: string) {
    try {
      const simulation = await this.findOne(id);
      if (!simulation) {
        throw new NotFoundException('Simulation not found');
      }
      return this.repository.remove(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Error removing Simulation');
    }
  }
}
