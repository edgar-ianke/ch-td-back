import { User } from '../../users/entities/user.entity';

export class CreateTodoDto {
  title: string;
  description: string;
  todoListName: string;
  author: User;
  assignee?: User;
}
