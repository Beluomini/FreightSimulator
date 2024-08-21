import { Test, TestingModule } from '@nestjs/testing';
import { LogisticOperatorController } from './logistic-operator.controller';
import { LogisticOperatorService } from './logistic-operator.service';
import { PrismaService } from '../database/prisma.service';
import { LogisticOperatorRepository } from './logistic-operator.repository';
import { HttpStatus } from '@nestjs/common';

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
          cubicFactor: 2,
          distanceMult: 1,
          distanceMult100: 1.2,
          distanceMult500: 2,
          deliveryTime: 2,
          deliveryTime100: 3,
          deliveryTime500: 6,
        },
      ];
      service.findAll = jest.fn().mockResolvedValue(testLO);
      const response = await controller.findAll();
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.message).toBe('Logistic Operators fetched successfully');
      expect(response.data).toBe(testLO);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a logistic operator', async () => {
      const testLO = {
        id: '1',
        name: 'Logistic Operator Test',
        cubicFactor: 2,
        distanceMult: 1,
        distanceMult100: 1.2,
        distanceMult500: 2,
        deliveryTime: 2,
        deliveryTime100: 3,
        deliveryTime500: 6,
      };
      service.findOne = jest.fn().mockResolvedValue(testLO);
      const response = await controller.findOne('1');
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.message).toBe('Logistic Operator fetched successfully');
      expect(response.data).toBe(testLO);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a logistic operator', async () => {
      const testLO = {
        id: '1',
        name: 'Logistic Operator Test',
        cubicFactor: 2,
        distanceMult: 1,
        distanceMult100: 1.2,
        distanceMult500: 2,
        deliveryTime: 2,
        deliveryTime100: 3,
        deliveryTime500: 6,
      };
      service.create = jest.fn().mockResolvedValue(testLO);
      const response = await controller.create(testLO);
      expect(response.statusCode).toBe(HttpStatus.CREATED);
      expect(response.message).toBe('Logistic Operator created successfully');
      expect(response.data).toBe(testLO);
      expect(service.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a logistic operator', async () => {
      const testLO = {
        id: '1',
        name: 'Logistic Operator Test',
        cubicFactor: 2,
        distanceMult: 1,
        distanceMult100: 1.2,
        distanceMult500: 2,
        deliveryTime: 2,
        deliveryTime100: 3,
        deliveryTime500: 6,
      };
      service.update = jest.fn().mockResolvedValue(testLO);
      const response = await controller.update('1', testLO);
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.message).toBe('Logistic Operator updated successfully');
      expect(response.data).toBe(testLO);
      expect(service.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove a logistic operator', async () => {
      service.remove = jest.fn().mockResolvedValue('1');
      const response = await controller.remove('1');
      expect(response.statusCode).toBe(HttpStatus.OK);
      expect(response.message).toBe('Logistic Operator deleted successfully');
      expect(response.data).toBe('1');
      expect(service.remove).toHaveBeenCalledTimes(1);
    });
  });
});
