import { Component, OnInit } from '@angular/core'
import { Reservation } from '../../models/reservation.model'
import { ReservationService } from '../../services/reservation.service'
import { RepollReservationsNotificationService } from '../../services/repoll-reservations-notification.service'
import { Subscription } from 'rxjs'
import { AlertService } from 'src/app/core/alert/alert.service'

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html'
})
export class ReservationListComponent implements OnInit {
  private repollSubscription: Subscription
  reservations: Array<Reservation>

  constructor(
    private reservationService: ReservationService,
    private repollSvc: RepollReservationsNotificationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.repollSubscription = this.repollSvc.obs.subscribe(() => this.fetchReservations())
    this.fetchReservations()
  }

  ngOnDestroy() {
    if (this.repollSubscription) {
      this.repollSubscription.unsubscribe()
    }
  }

  private fetchReservations() {
    this.reservationService.getReservations().subscribe(
      reservations => {
        this.reservations = reservations
      },
      error => this.alertService.error('Error gevonden: ' + error)
    )
  }
}
