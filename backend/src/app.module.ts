import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LogisticOperatorModule } from './logistic-operator/logistic-operator.module';

@Module({
  imports: [ConfigModule.forRoot(), LogisticOperatorModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
