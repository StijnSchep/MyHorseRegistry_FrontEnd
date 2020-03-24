import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-horse-list-tools',
  templateUrl: './horse-list-tools.component.html',
  styleUrls: ['./horse-list-tools.component.scss']
})
export class HorseListToolsComponent implements OnInit {
  isEmployee$: Observable<boolean>

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isEmployee$ = this.authService.userIsEmployee()
  }
}
