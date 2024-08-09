import { Test, TestingModule } from '@nestjs/testing';
import { LogisticOperatorController } from './logistic-operator.controller';
import { LogisticOperatorService } from './logistic-operator.service';
import { PrismaService } from '../database/prisma.service';
import { LogisticOperatorRepository } from './logistic-operator.repository';

describe('LogisticOperatorController', () => {
  let controller: LogisticOperatorController;
  let service: LogisticOperatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogisticOperatorController],
      providers: [
        LogisticOperatorService,
        LogisticOperatorRepository,
        PrismaService,
      ],
    }).compile();

    controller = module.get<LogisticOperatorController>(
      LogisticOperatorController,
    );
    service = module.get<LogisticOperatorService>(LogisticOperatorService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all logistic operators', async () => {
      const testLO = [
        {
          id: '1',
          name: 'Logistic Operator Test',
          weightCost: 2,
          distanceMult: 1,
          distanceMult100: 1.2,
          distanceMult500: 2,
          deliveryTime: 2,
          deliveryTime100: 3,
          deliveryTime500: 6,
        },
      ];
      service.findAll = jest.fn().mockResolvedValue(testLO);
      expect(await controller.findAll()).toBe(testLO);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a logistic operator', async () => {
      const testLO = {
        id: '1',
        name: 'Logistic Operator Test',
        weightCost: 2,
        distanceMult: 1,
        distanceMult100: 1.2,
        distanceMult500: 2,
        deliveryTime: 2,
        deliveryTime100: 3,
        deliveryTime500: 6,
      };
      service.findOne = jest.fn().mockResolvedValue(testLO);
      expect(await controller.findOne('1')).toBe(testLO);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a logistic operator', async () => {
      const testLO = {
        id: '1',
        name: 'Logistic Operator Test',
        weightCost: 2,
        distanceMult: 1,
        distanceMult100: 1.2,
        distanceMult500: 2,
        deliveryTime: 2,
        deliveryTime100: 3,
        deliveryTime500: 6,
      };
      service.create = jest.fn().mockResolvedValue(testLO);
      expect(await controller.create(testLO)).toBe(testLO);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a logistic operator', async () => {
      const testLO = {
        id: '1',
        name: 'Logistic Operator Test',
        weightCost: 2,
        distanceMult: 1,
        distanceMult100: 1.2,
        distanceMult500: 2,
        deliveryTime: 2,
        deliveryTime100: 3,
        deliveryTime500: 6,
      };
      service.update = jest.fn().mockResolvedValue(testLO);
      expect(await controller.update('1', testLO)).toBe(testLO);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove a logistic operator', async () => {
      service.remove = jest.fn().mockResolvedValue('1');
      expect(await controller.remove('1')).toBe('1');
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
