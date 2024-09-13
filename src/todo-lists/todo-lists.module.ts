import { Module } from '@nestjs/common';
import { TodoListsService } from './todo-lists.service';
import { TodoListsController } from './todo-lists.controller';
import { TodoList } from './entities/todo-list.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../todos/entities/todo.entity';
import { Commentary } from '../comments/entities/comment.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoList, Todo, Commentary]),
    UsersModule,
  ],
  controllers: [TodoListsController],
  providers: [TodoListsService],
  exports: [TodoListsService],
})
export class TodoListsModule {}
