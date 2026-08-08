import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

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

  update(id: number, updateProjectDto: UpdateProjectDto): Project {
    const project = this.findOne(id);
    if (updateProjectDto.name !== undefined) {
      project.name = updateProjectDto.name;
    }
    return project;
  }

  remove(id: number): Project {
    const project = this.findOne(id);
    const index = this.projects.findIndex((i) => i.id === id);
    this.projects.splice(index, 1);
    return project;
  }
}
