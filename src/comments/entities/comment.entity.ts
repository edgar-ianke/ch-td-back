import { Todo } from 'src/todos/entities/todo.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../base-entity/base.entity';

@Entity()
export class Commentary extends BaseEntity {
  @Column()
  text: string;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Todo, (todo) => todo.comments)
  todo: Todo;
}
