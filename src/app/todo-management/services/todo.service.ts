import { environment } from 'src/environments/environment'
import { map, tap, delay, catchError } from 'rxjs/operators'
import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, throwError, of } from 'rxjs'

import { Todo } from '../models/todo.model'
import { RepollTodosNotificationService } from './repoll-todos-notification.service'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { User } from 'src/app/auth/models/user.model'

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todos = new Array<Todo>()

  constructor(private http: HttpClient, private repollNotifierService: RepollTodosNotificationService) {}

  public getTodos(): Observable<Todo[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
    return this.http.get<any>(`${environment.api_url}/api/todo/list`, { headers: headers }).pipe(
      map(todos => todos.map(data => new Todo(data))),
      catchError(this.handleError),
      tap(todos => {
        this.todos = todos
      })
    )
  }

  public getTodo(id: string): Todo {
    return this.todos.find(todo => todo._id === id)
  }

  public updateTodo(todo: Todo) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
    return this.http.put<any>(`${environment.api_url}/api/todo/${todo._id}`, todo, { headers: headers }).pipe(
      catchError(this.handleError),
      tap(data => this.repollNotifierService.notify(data))
    )
  }

  public deleteTodo(todo: Todo) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
    return this.http.delete<any>(`${environment.api_url}/api/todo/${todo._id}`, { headers: headers }).pipe(
      catchError(this.handleError),
      tap(data => this.repollNotifierService.notify(data))
    )
  }

  public createTodo(todo: Todo) {
    const token = localStorage.getItem('token')
    const user = JSON.parse(localStorage.getItem('currentuser'))
    todo.user = user.name
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
    return this.http.post<any>(`${environment.api_url}/api/todo`, todo, { headers: headers }).pipe(
      catchError(this.handleError),
      tap(data => this.repollNotifierService.notify(data))
    )
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error)
    return throwError(error.message || error)
  }
}
