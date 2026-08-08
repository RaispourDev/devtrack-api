import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.project.findMany();
  }

  create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: { name: createProjectDto.name },
    });
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException('there is no project with this id');
    }
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    await this.findOne(id);
    return this.prisma.project.update({
      where: {
        id,
      },
      data: {
        name: updateProjectDto.name,
      },
    });
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    await this.prisma.project.delete({ where: { id } });
    return project;
  }
}
