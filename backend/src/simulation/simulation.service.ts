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
    const [fasterOperator, cheaperOperator] = await Promise.all([
      this.findLogisticOperator(distance, createSimulationDto, 'time'),
      this.findLogisticOperator(distance, createSimulationDto, 'price'),
    ]);
    try {
      const simulation = await this.repository.create(createSimulationDto);
      return {
        ...simulation,
        distance: distance,
        fasterOperator: fasterOperator.operator,
        fasterOperatorTime: fasterOperator.time,
        fasterOperatorPrice: fasterOperator.price,
        cheaperOperator: cheaperOperator.operator,
        cheaperOperatorPrice: cheaperOperator.price,
        cheaperOperatorTime: cheaperOperator.time,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error creating Simulation');
    }
  }

  private async findLogisticOperator(
    distance: number,
    { productHeight, productWidth, productLength }: CreateSimulationDto,
    sortBy: 'time' | 'price',
  ) {
    const logisticOperators: ResponseLogisticOperatorDto[] =
      await this.logisticOperatorService.findAll();

    const calculatePrice = (
      operator: ResponseLogisticOperatorDto,
      distanceMultiplier: number,
    ): number =>
      distanceMultiplier *
      ((productHeight * productWidth * productLength) / operator.cubicFactor);

    const promises = logisticOperators.map(async (operator) => {
      let time: number, price: number;

      if (distance <= 100) {
        time = operator.deliveryTime;
        price = parseFloat(
          calculatePrice(operator, operator.distanceMult).toFixed(2),
        );
      } else if (distance <= 500) {
        time = operator.deliveryTime100;
        price = parseFloat(
          calculatePrice(operator, operator.distanceMult100).toFixed(2),
        );
      } else {
        time = operator.deliveryTime500;
        price = parseFloat(
          calculatePrice(operator, operator.distanceMult500).toFixed(2),
        );
      }

      return { operator, time, price };
    });

    const results = await Promise.all(promises);
    const sortedResults = results.sort((a, b) => a[sortBy] - b[sortBy]);

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
