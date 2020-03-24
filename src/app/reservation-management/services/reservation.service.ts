import { Injectable } from '@angular/core'
import { Reservation } from '../models/reservation.model'
import { RepollReservationsNotificationService } from './repoll-reservations-notification.service'
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http'
import { throwError, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  reservations = Array<Reservation>()

  constructor(
    private http: HttpClient,
    private repollNotifierService: RepollReservationsNotificationService
  ) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error.message || error)
  }

  public getReservation(_id: string): Reservation {
    return this.reservations.find(reservation => reservation._id === _id)
  }

  public getReservations(): Observable<Reservation[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })

    return this.http.get<any>(`${environment.api_url}/api/reservation/list`, { headers: headers }).pipe(
      map(reservations => reservations.map(data => new Reservation(data))),
      catchError(this.handleError),
      tap(reservations => {
        this.reservations = reservations
      })
    )
  }

  public createReservation(reservation: Reservation) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
    return this.http
      .post<any>(`${environment.api_url}/api/reservation`, reservation, { headers: headers })
      .pipe(
        catchError(this.handleError),
        tap(data => this.repollNotifierService.notify(data))
      )
  }

  public updateReservation(reservation: Reservation) {
    reservation.horseId = reservation.horse._id
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
    return this.http
      .put<any>(`${environment.api_url}/api/reservation/${reservation._id}`, reservation, {
        headers: headers
      })
      .pipe(
        catchError(this.handleError),
        tap(data => this.repollNotifierService.notify(data))
      )
  }

  public deleteReservation(reservation: Reservation) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
    return this.http
      .delete<any>(`${environment.api_url}/api/reservation/${reservation._id}`, { headers: headers })
      .pipe(
        catchError(this.handleError),
        tap(data => this.repollNotifierService.notify(data))
      )
  }
}
