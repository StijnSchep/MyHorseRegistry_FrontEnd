import { Component, OnInit } from '@angular/core'
import { Reservation } from '../../models/reservation.model'
import { ActivatedRoute, Router } from '@angular/router'
import { ReservationService } from '../../services/reservation.service'
import { map, tap } from 'rxjs/operators'
import { AlertService } from 'src/app/core/alert/alert.service'
import { HorseService } from 'src/app/horse-management/services/horse.service'
import { Horse } from 'src/app/horse-management/models/horse.model'

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss']
})
export class ReservationFormComponent implements OnInit {
  title: string
  editMode: boolean
  id: string

  reservation: Reservation

  // Values for reservation.active
  statusList = [{ name: 'Actief', value: true }, { name: 'Verlopen', value: false }]

  horses: Array<Horse>
  countryList = [
    'Verenigde-Staten',
    'Nederland',
    'België',
    'Engeland',
    'Frankrijk',
    'Duitsland',
    'Noorwegen',
    'Zweden',
    'Ander land'
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private horseService: HorseService,
    private alertService: AlertService,
    private reservationService: ReservationService
  ) {}

  ngOnInit() {
    this.title = this.route.snapshot.data['title'] || 'Reservering aanpassen'
    this.editMode = this.route.snapshot.data['reservationAlreadyExists'] || false
    this.fetchHorses()

    if (this.editMode) {
      this.route.params
        .pipe(
          map(params => params['id']),
          tap(id => (this.id = id))
        )
        .subscribe(
          id => {
            this.reservation = this.reservationService.getReservation(this.id)
          },
          err => this.alertService.error('Error gevonden: ' + err)
        )
    } else {
      this.reservation = new Reservation()
    }
  }

  private fetchHorses() {
    this.horseService.getHorses().subscribe(
      horses => {
        this.horses = horses.filter(horse => !horse.active_reservation && horse.status === 'Actief')
      },
      error => this.alertService.error('Error:', error)
    )
  }

  onSubmit() {
    if (this.editMode) {
      this.reservationService.updateReservation(this.reservation).subscribe(
        data => {
          this.router.navigate(['../..'], { relativeTo: this.route })
        },
        error => this.alertService.error('Error gevonden: ' + error)
      )
    } else {
      this.reservationService.createReservation(this.reservation).subscribe(
        data => {
          this.router.navigate(['..'], { relativeTo: this.route })
        },
        error => this.alertService.error('Reservering kon niet aangemaakt worden!')
      )
    }
  }
}
