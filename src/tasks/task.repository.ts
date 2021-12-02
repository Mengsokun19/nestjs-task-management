import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  private logger = new Logger('TaskRepository');

  async getTasks(filterDto: GetTaskFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');
    // give access to the tasks that only belong to the particular user
    query.where({ user });

    if (status) {
      // check task.status with column status in database, in object is the value of the column in database
      query.andWhere('task.status = :status', { status: 'OPEN' });
    }
    if (search) {
      // query task.title that is LIKE(Not Exactly), same to task.description
      // convert to lowercase with LOWER()
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))',
        // %% return anything that in between what you want to search
        { search: `%${search}%` },
      );
    }

    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (err) {
      // log
      this.logger.error(
        `Fail to get task for user: ${user.username}. Filter: ${JSON.stringify(
          filterDto,
        )}`,
        err.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }
}
