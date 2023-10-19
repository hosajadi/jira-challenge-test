import { TaskStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class TaskStatusUpdateDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
