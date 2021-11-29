import { Task } from 'src/tasks/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

// Define the entity and its attributes
@Entity()
export class User {
  // nestjs pk generated by uuid
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // define column in table
  @Column({ unique: true })
  username: string;

  // define column in table
  @Column()
  password: string;

  @OneToMany((_type) => Task, (task) => task.user, { eager: true })
  tasks: Task[];
}