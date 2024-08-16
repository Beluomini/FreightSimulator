import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogisticOperatorModule } from './logistic-operator/logistic-operator.module';
import { SimulationModule } from './simulation/simulation.module';

@Module({
  imports: [ConfigModule.forRoot(), LogisticOperatorModule, SimulationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
