import { Component, OnInit, OnDestroy } from '@angular/core'
import { AlertService, Alert } from '../alert.service'
import { NgbAlertConfig } from '@ng-bootstrap/ng-bootstrap'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-alert',
  providers: [NgbAlertConfig],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  alert: Alert
  staticAlertClosed = false
  subs: Subscription

  constructor(private alertConfig: NgbAlertConfig, private alertService: AlertService) {
    alertConfig.type = 'success'
    alertConfig.dismissible = true
  }

  ngOnInit() {
    this.subs = this.alertService.getMessage().subscribe(alert => {
      this.alert = alert
      this.staticAlertClosed = false
      setTimeout(() => (this.staticAlertClosed = true), 12000)
    })
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe()
    }
  }
}
