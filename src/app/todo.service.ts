import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface TodoItem {
  id: number;
  task: string;
  assignedTo: number;
  isComplete: boolean;
}

export interface AuthData {
  userName: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = 'https://localhost:7035/api';
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  authenticate(authData: AuthData): Observable<void> {
    return this.http
      .post<string>(`${this.apiUrl}/authentication/token`, authData, {
        responseType: 'text' as 'json',
      })
      .pipe(
        map((response: string) => {
          this.token = response;
          localStorage.setItem('token', this.token);
        }),
        catchError(this.handleError)
      );
  }

  getTodos(): Observable<TodoItem[]> {
    return this.http
      .get<TodoItem[]>(`${this.apiUrl}/todos`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  addTodo(task: string): Observable<TodoItem> {
    return this.http
      .post<TodoItem>(`${this.apiUrl}/todos`, JSON.stringify(task), {
        headers: this.getAuthHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(catchError(this.handleError));
  }

  deleteTodo(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/todos/${id}`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(catchError(this.handleError));
  }

  updateTodo(id: number, task: string): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/todos/${id}`, JSON.stringify(task), {
        headers: this.getAuthHeaders().set('Content-Type', 'application/json'),
      })
      .pipe(catchError(this.handleError));
  }

  completeTodo(id: number): Observable<void> {
    return this.http
      .put<void>(
        `${this.apiUrl}/todos/${id}/complete`,
        {},
        {
          headers: this.getAuthHeaders(),
        }
      )
      .pipe(catchError(this.handleError));
  }

  private getAuthHeaders(): HttpHeaders {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(
      () => new Error('Something went wrong; please try again later.')
    );
  }
}
