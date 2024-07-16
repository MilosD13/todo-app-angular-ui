import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TodoService, TodoItem } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];
  newTask: string = '';
  editTask: string = '';
  editTodoId: number | null = null;

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if (this.newTask.trim()) {
      this.todoService.addTodo(this.newTask).subscribe((todo) => {
        this.todos.push(todo);
        this.newTask = '';
      });
    }
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    });
  }

  completeTodo(id: number): void {
    this.todoService.completeTodo(id).subscribe(() => {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
        todo.isComplete = true;
      }
    });
  }

  startEdit(todo: TodoItem): void {
    this.editTodoId = todo.id;
    this.editTask = todo.task;
  }

  updateTodo(): void {
    if (this.editTask.trim() && this.editTodoId !== null) {
      this.todoService
        .updateTodo(this.editTodoId, this.editTask)
        .subscribe(() => {
          const todo = this.todos.find((t) => t.id === this.editTodoId);
          if (todo) {
            todo.task = this.editTask;
          }
          this.editTodoId = null;
          this.editTask = '';
        });
    }
  }

  cancelEdit(): void {
    this.editTodoId = null;
    this.editTask = '';
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
