import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  // Method to return after get the request
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTaskWithFilter(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   // do something with status
  //   let tasks = this.getAllTasks();
  //   // do something with status
  //   if (status) {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   // do something with search
  //   if (search) {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }
  //   // return final result
  //   return tasks;
  // }
  // // get a task
  // getTaskById(id: string): Task {
  //   // try to get task
  //   const found = this.tasks.find((task) => task.id === id);
  //   // if not, throw an error (404 error)
  //   if (!found) {
  //     throw new NotFoundException(`Task with ${id} not found.`);
  //   }
  //   // otherwise, return the found task
  //   return found;
  // }
  // // create new task
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   // push created task to array(tasks)
  //   this.tasks.push(task);
  //   // return task to client
  //   return task;
  // }
  // // Update task status
  // updateTask(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  // // Delete task
  // deleteTask(id: string): void {
  //   const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== found.id);
  // }
}
