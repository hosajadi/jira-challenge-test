import { Injectable, NotFoundException } from '@nestjs/common';
import type { TaskStatus } from '@prisma/client';

import { errorsTypes } from '../../common';
import type { TaskDto } from '../../models/task/task.dto';
import type { Task } from '../../models/task/task.model';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private readonly prismaService: PrismaService) {}

  private async getTaskById(id: string): Promise<Task | null> {
    return this.prismaService.task.findUnique({
      where: {
        id,
      },
    });
  }

  async getTask(id: string): Promise<Task> {
    const task = await this.getTaskById(id);
    if(!task) {
      throw new NotFoundException(errorsTypes.task.TASK_NOT_FOUND);
    }

    return task;
  }

  async getTasks(): Promise<Task[]> {
    const tasks = await this.prismaService.task.findMany();

    if (!tasks) {
      return [];
    }

    return tasks;
  }

  async createTask(taskDto: TaskDto): Promise<Task> {
    return this.prismaService.task.create({
      data: taskDto,
    });
  }

  async changeTaskStatus(taskId: string, taskStatus: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(taskId);

    if (!task) {
      throw new NotFoundException(errorsTypes.task.TASK_NOT_FOUND);
    }

    return this.prismaService.task.update({
      where: {
        id: taskId,
      },
      data: {
        status: taskStatus,
      },
    });
  }

  async deleteTask(taskID: string) {
    const task = await this.getTaskById(taskID);

    if (!task) {
      throw new NotFoundException(errorsTypes.task.TASK_NOT_FOUND);
    }

    await this.prismaService.task.delete({
      where: {
        id: taskID,
      },
    });
  }
}
