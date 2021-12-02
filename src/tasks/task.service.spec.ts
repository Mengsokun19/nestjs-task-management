import { Test } from '@nestjs/testing';
import { TaskRepository } from './task.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({});

describe('TaskService', () => {
  let tasksService: TasksService;
  let tasksRepository: TaskRepository;

  beforeEach(async () => {
    // initialize a NestJS module with tasksService
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TaskRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = module.get(TasksService);
    tasksRepository = module.get(TaskRepository);
  });
});
