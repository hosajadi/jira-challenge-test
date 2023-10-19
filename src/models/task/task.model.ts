import type { TaskStatus } from '@prisma/client';

export class Task {
  id: string;

  title: string;

  description: string;

  status: TaskStatus;
}
