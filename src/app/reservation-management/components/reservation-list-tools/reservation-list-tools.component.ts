import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth.service'

@Component({
  selector: 'app-reservation-list-tools',
  templateUrl: './reservation-list-tools.component.html',
  styleUrls: ['./reservation-list-tools.component.scss']
})
export class ReservationListToolsComponent implements OnInit {
  isEmployee$: Observable<boolean>

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isEmployee$ = this.authService.userIsEmployee()
  }
}
