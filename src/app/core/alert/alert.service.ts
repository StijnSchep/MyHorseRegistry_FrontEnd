import { Injectable } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'
import { Observable, Subject } from 'rxjs'

export interface Alert {
  type: string
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private subject = new Subject<Alert>()
  private keepAfterNavigationChange = false

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false
        } else {
          this.subject.next()
        }
      }
    })
  }

  success(msg: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange
    this.subject.next({ type: 'success', message: msg })
  }

  error(msg: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange
    this.subject.next({ type: 'error', message: msg })
  }

  getMessage(): Observable<Alert> {
    return this.subject.asObservable()
  }
}
