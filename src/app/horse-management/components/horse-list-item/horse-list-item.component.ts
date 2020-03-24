import { Component, OnInit, Input } from '@angular/core'
import { Horse } from '../../models/horse.model'
import { AuthService } from 'src/app/auth/services/auth.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-horse-list-item',
  templateUrl: './horse-list-item.component.html',
  styleUrls: ['./horse-list-item.component.scss']
})
export class HorseListItemComponent implements OnInit {
  @Input() horse: Horse
  showDetails = false
  isEmployee$: Observable<boolean>

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isEmployee$ = this.authService.userIsEmployee()
  }

  get price() {
    if (this.horse.price > 0) {
      return '€' + this.horse.price + ',-'
    } else {
      return 'NOTK'
    }
  }

  get age() {
    return new Date().getFullYear() - this.horse.yearOfBirth
  }
}
