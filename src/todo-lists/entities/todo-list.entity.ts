import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../base-entity/base.entity';
import { Todo } from '../../todos/entities/todo.entity';

@Entity()
export class TodoList extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Todo, (todo) => todo.todoList, { cascade: true })
  todos: Todo[];
}
