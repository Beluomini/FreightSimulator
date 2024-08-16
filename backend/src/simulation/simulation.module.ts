import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { SimulationController } from './simulation.controller';
import { SimulationRepository } from './simulation.repository';
import { PrismaService } from 'src/database/prisma.service';
import { CoordinatesService } from 'src/integrations/geocoding/coordinates.service';
import { LogisticOperatorService } from 'src/logistic-operator/logistic-operator.service';
import { LogisticOperatorRepository } from 'src/logistic-operator/logistic-operator.repository';

@Module({
  controllers: [SimulationController],
  providers: [
    SimulationService,
    SimulationRepository,
    PrismaService,
    CoordinatesService,
    LogisticOperatorService,
    LogisticOperatorRepository,
  ],
})
export class SimulationModule {}
