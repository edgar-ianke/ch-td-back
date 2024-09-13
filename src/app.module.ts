import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TodoListsModule } from './todo-lists/todo-lists.module';
import { User } from './users/entities/user.entity';
import { Commentary } from './comments/entities/comment.entity';
import { TodoList } from './todo-lists/entities/todo-list.entity';
import { Todo } from './todos/entities/todo.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'edgar',
      password: 'edgar',
      database: 'chtd',
      synchronize: true,
      entities: [User, Commentary, TodoList, Todo],
    }),
    UsersModule,
    TodoListsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
