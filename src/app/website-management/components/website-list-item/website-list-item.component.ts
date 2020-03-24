import { Component, OnInit, Input } from '@angular/core'
import { Website } from '../../models/website.model'
import { AuthService } from 'src/app/auth/services/auth.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-website-list-item',
  templateUrl: './website-list-item.component.html',
  styleUrls: ['./website-list-item.component.scss']
})
export class WebsiteListItemComponent implements OnInit {
  isEmployee$: Observable<boolean>
  @Input() website: Website

  get incorrectHorse() {
    if (this.website.horses.filter(horse => horse.status != 'Actief').length > 0) {
      return true
    } else {
      return false
    }
  }

  get URL() {
    if (this.website.URL.substr(0, 4) != 'http') {
      return 'https://' + this.website.URL
    } else {
      return this.website.URL
    }
  }

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isEmployee$ = this.authService.userIsEmployee()
  }
}
