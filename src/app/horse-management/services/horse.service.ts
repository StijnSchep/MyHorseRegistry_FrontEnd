import { Injectable } from '@angular/core'
import { Horse } from '../models/horse.model'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { environment } from 'src/environments/environment'
import { map, catchError, tap } from 'rxjs/operators'
import { RepollHorsesNotificationService } from './repoll-horses-notification.service'

@Injectable({
  providedIn: 'root'
})
export class HorseService {
  horses = new Array<Horse>()

  constructor(private http: HttpClient, private repollNotifierService: RepollHorsesNotificationService) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error.message || error)
  }

  public getHorse(_id: string): Horse {
    return this.horses.find(horse => horse._id === _id)
  }

  public getHorses(): Observable<Horse[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })

    return this.http.get<any>(`${environment.api_url}/api/horse/list`, { headers: headers }).pipe(
      map(horses => horses.map(data => new Horse(data))),
      catchError(this.handleError),
      tap(horses => {
        this.horses = horses
      })
    )
  }

  public createHorse(horse: Horse) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
    return this.http.post<any>(`${environment.api_url}/api/horse`, horse, { headers: headers }).pipe(
      catchError(this.handleError),
      tap(data => this.repollNotifierService.notify(data))
    )
  }

  public updateHorse(horse: Horse) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
    return this.http
      .put<any>(`${environment.api_url}/api/horse/${horse._id}`, horse, { headers: headers })
      .pipe(
        catchError(this.handleError),
        tap(data => this.repollNotifierService.notify(data))
      )
  }

  public deleteHorse(horse: Horse) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
    return this.http.delete<any>(`${environment.api_url}/api/horse/${horse._id}`, { headers: headers }).pipe(
      catchError(this.handleError),
      tap(data => this.repollNotifierService.notify(data))
    )
  }
}
