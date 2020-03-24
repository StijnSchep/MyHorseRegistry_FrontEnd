import { Injectable } from '@angular/core'
import { Observable, ReplaySubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RepollTodosNotificationService {
  subject: ReplaySubject<any> = new ReplaySubject()
  obs: Observable<any> = this.subject.asObservable()

  notify = (data: any) => {
    this.subject.next(data)
  }
}
