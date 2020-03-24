import { Injectable } from '@angular/core'
import { User } from 'src/app/auth/models/user.model'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { RepollUsersNotificationService } from './repoll-users-notification.service'
import { throwError, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { map, catchError, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private repollNotifierService: RepollUsersNotificationService) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error.message || error)
  }

  public getUsers(): Observable<User[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })

    return this.http.get<any>(`${environment.api_url}/api/user/list`, { headers: headers }).pipe(
      map(users => users.map(data => new User(data))),
      catchError(this.handleError)
    )
  }

  public createUser(user: User) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })

    return this.http.post<any>(`${environment.api_url}/api/auth/register`, user, { headers: headers }).pipe(
      catchError(this.handleError),
      tap(data => this.repollNotifierService.notify(data))
    )
  }

  public deleteUser(user: User) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })

    return this.http.delete<any>(`${environment.api_url}/api/user/${user._id}`, { headers: headers }).pipe(
      catchError(this.handleError),
      tap(data => this.repollNotifierService.notify(data))
    )
  }
}
