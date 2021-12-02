import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user-decorator';
import { User } from '../auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';
import { Logger } from '@nestjs/common';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  // initialize logger in controller
  private logger = new Logger('TaskController');

  constructor(private tasksService: TasksService) {}

  // Method in REST API
  // Get All Tasks
  // @Get()
  // getAllTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTaskWithFilter(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  @Get()
  getTask(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all task. Filter: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  // Create new task
  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    this.logger.verbose(
      `User: "${user.username}" create task: ${JSON.stringify(createTaskDto)}`,
    );
    return this.tasksService.createTask(createTaskDto, user);
  }

  // Get a task by id
  @Get('/:id')
  async getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }

  // Update task status
  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    const { status } = updateTaskStatusDto;
    return this.tasksService.updateTask(id, status, user);
  }

  // // Delete Task (Self)
  // @Delete('/:id')
  // async deleteTask(@Param('id') id: string): Promise<void> {
  //   return this.tasksService.deleteTask(id);
  // }

  // Delete Task (Self)
  @Delete('/:id')
  async deleteTask(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }
}
