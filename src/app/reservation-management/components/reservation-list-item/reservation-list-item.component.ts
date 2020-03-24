import { Component, OnInit, Input } from '@angular/core'
import { Reservation } from '../../models/reservation.model'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth.service'

@Component({
  selector: 'app-reservation-list-item',
  templateUrl: './reservation-list-item.component.html',
  styleUrls: ['./reservation-list-item.component.scss']
})
export class ReservationListItemComponent implements OnInit {
  @Input() reservation: Reservation
  isEmployee$: Observable<boolean>

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isEmployee$ = this.authService.userIsEmployee()
  }
}
