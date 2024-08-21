import { Test, TestingModule } from '@nestjs/testing';
import { SimulationService } from './simulation.service';
import { SimulationRepository } from './simulation.repository';
import { CoordinatesService } from '../integrations/geocoding/coordinates.service';
import { LogisticOperatorService } from '../logistic-operator/logistic-operator.service';
import { PrismaService } from '../database/prisma.service';
import { LogisticOperatorRepository } from '../logistic-operator/logistic-operator.repository';
import { calculateDistance } from '../utils/distanceCalculator';
import { ResponseLogisticOperatorDto } from 'src/logistic-operator/dto/response-logistic-operator.dto';
import { InternalServerErrorException } from '@nestjs/common';

describe('SimulationService', () => {
  let service: SimulationService;
  let repository: SimulationRepository;
  let coordinatesService: CoordinatesService;
  let logisticOperatorService: LogisticOperatorService;

  const mockOperatorList: ResponseLogisticOperatorDto[] = [
    {
      id: '1',
      name: 'Logistic Operator 1',
      cubicFactor: 300,
      deliveryTime: 10,
      deliveryTime100: 10,
      deliveryTime500: 10,
      distanceMult: 10,
      distanceMult100: 10,
      distanceMult500: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Logistic Operator 2',
      cubicFactor: 500,
      deliveryTime: 20,
      deliveryTime100: 20,
      deliveryTime500: 20,
      distanceMult: 5,
      distanceMult100: 5,
      distanceMult500: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockSimulation = {
    id: '1',
    clientName: 'Client 1',
    fromAddress: 'From Address 1',
    toAddress: 'To Address 1',
    productHeight: 10,
    productWidth: 10,
    productLength: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulationService,
        SimulationRepository,
        CoordinatesService,
        LogisticOperatorService,
        LogisticOperatorRepository,
        PrismaService,
      ],
    }).compile();

    service = module.get<SimulationService>(SimulationService);
    repository = module.get<SimulationRepository>(SimulationRepository);
    coordinatesService = module.get<CoordinatesService>(CoordinatesService);
    logisticOperatorService = module.get<LogisticOperatorService>(
      LogisticOperatorService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('calculate distance', () => {
    it('should return 0 as distance', async () => {
      const distance = calculateDistance(0, 0, 0, 0);
      expect(distance).toBe(0);
    });
    it('should return a next distance', async () => {
      const distance = calculateDistance(0, 0, 0, 1);
      expect(distance).toBe(111.195);
    });
    it('should return a next distance', async () => {
      const distance = calculateDistance(-23.55052, -46.6333, 40.7128, -74.006);
      expect(distance).toBe(7685.628);
    });
  });

  describe('create', () => {
    it('should create a simulation', async () => {
      jest.spyOn(repository, 'create').mockResolvedValue(mockSimulation);
      jest.spyOn(coordinatesService, 'getCoordinates').mockResolvedValueOnce({
        lat: -23.55052,
        lng: -46.6333,
      });
      jest.spyOn(coordinatesService, 'getCoordinates').mockResolvedValueOnce({
        lat: -23.65052,
        lng: -46.6333,
      });
      jest
        .spyOn(logisticOperatorService, 'findAll')
        .mockResolvedValue(mockOperatorList);
      expect(await service.create(mockSimulation)).toEqual({
        ...mockSimulation,
        distance: 11.119,
        fasterOperator: mockOperatorList[0],
        fasterOperatorPrice: 33.33,
        fasterOperatorTime: 10,
        cheaperOperator: mockOperatorList[1],
        cheaperOperatorPrice: 10,
        cheaperOperatorTime: 20,
      });
    });
  });

  describe('create - find all logistic operators error', () => {
    it('should throw an error in the logistic operators findall method', async () => {
      jest.spyOn(repository, 'create').mockResolvedValue(mockSimulation);
      jest.spyOn(coordinatesService, 'getCoordinates').mockResolvedValueOnce({
        lat: -23.55052,
        lng: -46.6333,
      });
      jest.spyOn(coordinatesService, 'getCoordinates').mockResolvedValueOnce({
        lat: -23.65052,
        lng: -46.6333,
      });
      jest
        .spyOn(logisticOperatorService, 'findAll')
        .mockRejectedValue(new Error());
      try {
        await service.create(mockSimulation);
      } catch (error) {
        expect(error.message).toBe('Error fetching Logistic Operators');
        expect(error.status).toBe(500);
      }
    });
  });

  describe('create - simulation error', () => {
    it('should throw an error in the simulations create method', async () => {
      jest.spyOn(coordinatesService, 'getCoordinates').mockResolvedValueOnce({
        lat: -23.55052,
        lng: -46.6333,
      });
      jest.spyOn(coordinatesService, 'getCoordinates').mockResolvedValueOnce({
        lat: -23.65052,
        lng: -46.6333,
      });
      jest
        .spyOn(logisticOperatorService, 'findAll')
        .mockResolvedValue(mockOperatorList);
      jest.spyOn(repository, 'create').mockRejectedValue(new Error());
      try {
        await service.create(mockSimulation);
      } catch (error) {
        expect(error.message).toBe('Error creating Simulation');
        expect(error.status).toBe(500);
      }
    });
  });

  describe('create - geocoding error', () => {
    it('should throw an error in the external API', async () => {
      jest.clearAllMocks();
      jest
        .spyOn(coordinatesService, 'getCoordinates')
        .mockRejectedValue(
          new InternalServerErrorException('Error getting coordinates'),
        );
      try {
        await service.create(mockSimulation);
      } catch (error) {
        expect(error.message).toBe('Error getting coordinates');
        expect(error.status).toBe(500);
      }
    });
  });
});
