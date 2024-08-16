import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { UpdateSimulationDto } from './dto/update-simulation.dto';

@Injectable()
export class SimulationRepository {
  constructor(private prisma: PrismaService) {}

  async create(createSimulationDto: CreateSimulationDto) {
    return await this.prisma.simulation.create({
      data: createSimulationDto,
    });
  }

  async findAll() {
    return await this.prisma.simulation.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.simulation.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateSimulationDto: UpdateSimulationDto) {
    return await this.prisma.simulation.update({
      where: { id },
      data: updateSimulationDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.simulation.delete({
      where: { id },
    });
  }
}
