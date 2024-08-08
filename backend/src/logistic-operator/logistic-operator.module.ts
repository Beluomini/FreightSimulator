import { Module } from '@nestjs/common';
import { LogisticOperatorService } from './logistic-operator.service';
import { LogisticOperatorController } from './logistic-operator.controller';
import { PrismaService } from 'src/prisma.service';
import { LogisticOperatorRepository } from './logistic-operator.repository';

@Module({
  controllers: [LogisticOperatorController],
  providers: [
    PrismaService,
    LogisticOperatorService,
    LogisticOperatorRepository,
  ],
})
export class LogisticOperatorModule {}
