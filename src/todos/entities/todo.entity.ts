import { TodoList } from '../../todo-lists/entities/todo-list.entity';
import { BaseEntity } from '../../base-entity/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Commentary } from '../../comments/entities/comment.entity';

@Entity()
export class Todo extends BaseEntity {
  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => TodoList, (todoList) => todoList.todos)
  todoList: TodoList;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => User)
  assignee: null | User;

  @OneToMany(() => Commentary, (comment) => comment.todo)
  comments: Commentary[];
}
