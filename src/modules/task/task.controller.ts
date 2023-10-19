import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';

import { BasicResponse } from '../../models/customResponses/basicResponse';
import { TaskDto } from '../../models/task/task.dto';
import type { Task } from '../../models/task/task.model';
import { TaskStatusUpdateDto } from '../../models/task/taskUpdateStatus.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Get('/:id')
  async getTask(@Param('id') id: string): Promise<Task> {
    return this.taskService.getTask(id);
  }

  @Post()
  async createTask(@Body(ValidationPipe) taskDto: TaskDto): Promise<Task> {
    return this.taskService.createTask(taskDto);
  }

  @Patch('/:id')
  async editTask(@Param('id') id: string, @Body(ValidationPipe) status: TaskStatusUpdateDto): Promise<Task> {
    return this.taskService.changeTaskStatus(id, status.status);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string): Promise<BasicResponse> {
    await this.taskService.deleteTask(id);
    const resp = new BasicResponse();
    resp.status = 'ok';
    resp.id = 200;

    return resp;
  }
}
