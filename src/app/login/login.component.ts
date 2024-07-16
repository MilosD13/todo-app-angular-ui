import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService, AuthData } from '../todo.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  userName: string = '';
  password: string = '';

  constructor(private todoService: TodoService, private router: Router) {}

  login(): void {
    const authData: AuthData = {
      userName: this.userName,
      password: this.password,
    };
    this.todoService.authenticate(authData).subscribe({
      next: () => this.router.navigate(['/todos']),
      error: (err) => console.error('Login failed', err),
    });
  }
}
