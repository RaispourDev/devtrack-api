import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';

type Project = {
  id: number;
  name: string;
};

@Injectable()
export class ProjectsService {
  private readonly projects: Project[] = [
    {
      id: 1,
      name: 'Learn NestJS',
    },
    {
      id: 2,
      name: 'DevTrack',
    },
  ];
  findAll() {
    return this.projects;
  }

  create(createProjectDto: CreateProjectDto): Project {
    const id = this.projects.length + 1;
    const newProject: Project = {
      id,
      name: createProjectDto.name,
    };
    this.projects.push(newProject);
    return newProject;
  }

  findOne(id: number): Project {
    const project = this.projects.find((project) => project.id === id);
    if (project) {
      return project;
    }
    throw new NotFoundException('there is no project with this id');
  }
}
