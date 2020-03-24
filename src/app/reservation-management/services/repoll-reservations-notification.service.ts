import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RepollReservationsNotificationService {
  subject: ReplaySubject<any> = new ReplaySubject()
  obs: Observable<any> = this.subject.asObservable()

  notify = (data: any) => {
    this.subject.next(data)
  }
}
