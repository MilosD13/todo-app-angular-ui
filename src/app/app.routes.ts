import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TodoListComponent } from './todo-list/todo-list.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'todos', component: TodoListComponent },
];
