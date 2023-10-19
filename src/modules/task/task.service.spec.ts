import { NotFoundException } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { PrismaClient } from '@prisma/client';
import { TaskStatus } from '@prisma/client';
import crypto from 'crypto';
import type { DeepMockProxy } from 'jest-mock-extended';
import { mockDeep } from 'jest-mock-extended';

import type { TaskDto } from '../../models/task/task.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { TaskService } from './task.service';

const registerTaskPayload1: TaskDto = {
  title: 'title test 1 with 234244 (numbers)',
  description: 'description test 1 with 6464.46 (numbers)',
};
const registerTaskPayload2: TaskDto = {
  title: 'title test 2 with 234244 (numbers)',
  description: 'description test 2 with 6464.46 (numbers)',
};

describe('TaskService', () => {
  let service: TaskService;
  let prisma: DeepMockProxy<PrismaClient>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get(TaskService);
    prisma = module.get(PrismaService);
  });

  afterEach(async () => {
    await prisma.task.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create task', () => {
    it('should create a task and return the created one', async () => {
      jest.spyOn(prisma.task, 'create').mockResolvedValue({
        id: 'sfsoifuosiufosifuos',
        status: TaskStatus.todo,
        title: registerTaskPayload1.title,
        description: registerTaskPayload1.description,
        ownerId: null,
      });
      const createdTask = await service.createTask(registerTaskPayload1);
      expect(createdTask.title).toBe(registerTaskPayload1.title);
    });
  });

  describe('get task by Id', () => {
    it('should get the exact task we created by id', async () => {
      const createdUser = await service.createTask(registerTaskPayload2);
      const gotTask = await service.getTask(createdUser.id);
      expect(gotTask.description).toBe(createdUser.description);
    });

    it('should return CastError exception by passing invalid id', async () => {
      // eslint-disable-next-line unicorn/consistent-function-scoping
      const gotTask = () => {
        crypto.randomBytes(12).toString('hex');

        return service.getTask('for test');
      };

      await expect(gotTask()).rejects.toThrow();
    });

    it('should return null or undefined if we ask for invalid random id', async () => {
      const randomString = crypto.randomBytes(12).toString('hex');
      const gotTask = await service.getTask(randomString);
      expect(gotTask).toBeNull();
    });
  });

  describe('get all tasks', () => {
    it('should return an empty array if no task found', async () => {
      const result = await service.getTasks();

      expect(result).toEqual([]);
    });

    it('should return an  array with length of 2 if we create 2 task', async () => {
      await service.createTask(registerTaskPayload1);
      await service.createTask(registerTaskPayload2);
      const result = await service.getTasks();

      expect(result.length).toBe(2);
    });
  });

  describe('patch task', () => {
    it('should patch the task correctly', async () => {
      const createdTask = await service.createTask(registerTaskPayload1);
      const updatedTask = await service.changeTaskStatus(createdTask.id, TaskStatus.done);
      expect(updatedTask.status).toBe(TaskStatus.done);
    });

    it('should patch the task correctly if we change another field', async () => {
      const createdTask = await service.createTask(registerTaskPayload1);
      const updatedTask = await service.changeTaskStatus(createdTask.id, TaskStatus.inProgress);
      expect(updatedTask.title).toBe(createdTask.title);
    });

    it('should throw a NotFoundException if provided id is invalid', async () => {
      await service.createTask(registerTaskPayload2);

      const updatedTask = () => {
        const randomString = crypto.randomBytes(12).toString('hex');

        return service.changeTaskStatus(randomString, TaskStatus.todo);
      };

      await expect(updatedTask()).rejects.toThrow(NotFoundException);
    });
  });
});
