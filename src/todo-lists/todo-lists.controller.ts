import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodoListsService } from './todo-lists.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { ChangeTodoListDto } from './dto/change-todo-list.dto';
import { CreateTodoDto } from '../todos/dto/create-todo.dto';
import { UpdateTodoDto } from '../todos/dto/update-todo.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../users/entities/user.entity';

@Controller('todo')
export class TodoListsController {
  constructor(private readonly todoListsService: TodoListsService) {}
  @UseGuards(JwtAuthGuard)
  @Post('/list')
  createTodoList(@Body() createTodoListDto: CreateTodoListDto) {
    return this.todoListsService.createTodoList(createTodoListDto);
  }

  @Get('/list')
  findAllTodoList() {
    return this.todoListsService.findAllTodoList();
  }

  @Get('/list/:id')
  findTodoList(@Param('id') id: string) {
    return this.todoListsService.findTodoList(+id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/list')
  changeTodoList(@Body() changeTodoListDto: ChangeTodoListDto) {
    return this.todoListsService.changeTodoList(
      changeTodoListDto.newtodoListId,
      changeTodoListDto.todoId,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/list/:id')
  removeTodoList(@Param('id') id: string) {
    return this.todoListsService.removeToDoList(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/task')
  createTodo(
    @Req() req: Request & { user: User },
    @Body() createTodoDto: CreateTodoDto,
  ) {
    return this.todoListsService.addTodo(req.user.id, createTodoDto);
  }

  @Get('/task/:id')
  findTodo(@Param('id') id: number) {
    return this.todoListsService.findTodo(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/task/:id')
  deleteTodo(@Param('id') id: number) {
    return this.todoListsService.removeTodo(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/task/:id')
  updateTodo(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoListsService.updateTodo(id, updateTodoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/task/assign/:id')
  assignTodo(@Req() req: Request & { user: User }, @Param('id') id: number) {
    return this.todoListsService.assignTodo(req.user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/task/comment/:id')
  addComment(
    @Param('id') id: number,
    @Req() req: Request & { user: User },
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.todoListsService.addComment(id, req.user.id, createCommentDto);
  }
}
