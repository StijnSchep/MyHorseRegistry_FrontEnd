import { Component, OnInit } from '@angular/core'
import { Reservation } from '../../models/reservation.model'
import { ReservationService } from '../../services/reservation.service'
import { ActivatedRoute, Router } from '@angular/router'
import { AlertService } from 'src/app/core/alert/alert.service'
import { map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-reservation-delete',
  templateUrl: './reservation-delete.component.html',
  styleUrls: ['./reservation-delete.component.scss']
})
export class ReservationDeleteComponent implements OnInit {
  id: string

  reservation: Reservation

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reservationService: ReservationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => params['id']),
        tap(id => (this.id = id))
      )
      .subscribe(
        id => {
          // make local copy of user - detached from original array
          this.reservation = this.reservationService.getReservation(this.id)
        },
        err => this.alertService.error('Error found: ' + err)
      )
  }

  onCancel() {
    this.router.navigate(['../..'], { relativeTo: this.route })
  }

  onDelete() {
    this.reservationService.deleteReservation(this.reservation).subscribe(
      data => {
        this.router.navigate(['../..'], { relativeTo: this.route })
      },
      error => this.alertService.error('Error gevonden: ' + error)
    )
  }
}
