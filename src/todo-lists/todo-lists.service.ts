import { Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from '../todos/dto/create-todo.dto';
import { Todo } from '../todos/entities/todo.entity';
import { UpdateTodoDto } from '../todos/dto/update-todo.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { Commentary } from '../comments/entities/comment.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TodoListsService {
  constructor(
    @InjectRepository(TodoList)
    private todoListRepository: Repository<TodoList>,
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
    @InjectRepository(Commentary)
    private commentsRepository: Repository<Commentary>,
    private usersService: UsersService,
  ) {}
  async createTodoList(createTodoListDto: CreateTodoListDto) {
    const todoList = await this.todoListRepository.create({
      ...createTodoListDto,
      todos: [],
    });
    return this.todoListRepository.save(todoList);
  }

  async findAllTodoList() {
    return await this.todoListRepository.find({
      relations: ['todos', 'todos.author', 'todos.assignee'],
    });
  }

  async findTodoList(id: number) {
    return await this.todoListRepository.findOne({
      where: { id },
      relations: ['todos'],
    });
  }

  async findTodoListByName(name: string) {
    return await this.todoListRepository.findOne({
      where: { name },
      relations: ['todos'],
    });
  }

  async changeTodoList(newtodoListId: number, todoId: number) {
    const todoList = await this.findTodoList(newtodoListId);
    await this.todoRepository.update(todoId, { todoList });
    return this.findAllTodoList();
  }

  async removeToDoList(id: number) {
    const todoList = await this.findTodoList(id);
    return await this.todoListRepository.remove(todoList);
  }

  async addTodo(userId: number, createTodoDto: CreateTodoDto) {
    const { todoListName, ...data } = createTodoDto;
    const todoList = await this.findTodoListByName(todoListName);
    const user = await this.usersService.findOne(userId);
    const todo = await this.todoRepository.create({
      ...data,
      todoList,
      author: user,
      assignee: null,
    });
    return this.todoRepository.save(todo);
  }

  async findTodo(id: number) {
    return await this.todoRepository.findOne({
      where: { id },
      relations: ['author', 'comments', 'todoList', 'assignee'],
    });
  }

  async removeTodo(id: number) {
    const todo = await this.findTodo(id);
    return await this.todoRepository.remove(todo);
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto) {
    await this.todoRepository.update(id, updateTodoDto);
    return this.findTodo(id);
  }

  async assignTodo(userId: number, todoId: number) {
    const user = await this.usersService.findOne(userId);
    return await this.updateTodo(todoId, { assignee: user });
  }

  async addComment(
    todoId: number,
    userId: number,
    createCommentDto: CreateCommentDto,
  ) {
    const todo = await this.findTodo(todoId);
    const user = await this.usersService.findOne(userId);
    const comment = await this.commentsRepository.create({
      ...createCommentDto,
      todo,
      author: user,
    });
    await this.commentsRepository.save(comment);
    return todo;
  }
}
