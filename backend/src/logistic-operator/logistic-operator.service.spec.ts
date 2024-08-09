import { Test, TestingModule } from '@nestjs/testing';
import { LogisticOperatorService } from './logistic-operator.service';
import { LogisticOperatorRepository } from './logistic-operator.repository';
import { PrismaService } from '../database/prisma.service';

describe('LogisticOperatorService', () => {
  let service: LogisticOperatorService;
  let repository: LogisticOperatorRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LogisticOperatorService,
        LogisticOperatorRepository,
        PrismaService,
      ],
    }).compile();

    service = module.get<LogisticOperatorService>(LogisticOperatorService);
    repository = module.get<LogisticOperatorRepository>(
      LogisticOperatorRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      repository.findMany = jest.fn().mockResolvedValue(testLO);
      expect(await service.findAll()).toBe(testLO);
      expect(repository.findMany).toHaveBeenCalledTimes(1);
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
      repository.findOne = jest.fn().mockResolvedValue(testLO);
      expect(await service.findOne('1')).toBe(testLO);
      expect(testLO.id).toBe('1');
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });
  });

  describe('create', () => {
    it('should create a logistic operator', async () => {
      const newLO = {
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
      repository.create = jest.fn().mockResolvedValue(newLO);
      expect(await service.create(newLO)).toBe(newLO);
      expect(repository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    it('should update a logistic operator', async () => {
      const updatedLO = {
        name: 'Logistic Operator Test Updated',
        weightCost: 2,
        distanceMult: 1,
        distanceMult100: 1.2,
        distanceMult500: 2,
        deliveryTime: 2,
        deliveryTime100: 3,
        deliveryTime500: 6,
      };
      repository.update = jest.fn().mockResolvedValue(updatedLO);
      expect(await service.update('1', updatedLO)).toBe(updatedLO);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should remove a logistic operator', async () => {
      repository.remove = jest.fn().mockResolvedValue({ id: '1' });
      expect(await service.remove('1')).toEqual({ id: '1' });
      expect(repository.remove).toHaveBeenCalledTimes(1);
    });
  });
});
