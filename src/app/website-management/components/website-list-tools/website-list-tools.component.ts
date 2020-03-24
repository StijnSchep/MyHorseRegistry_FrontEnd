import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth.service'

@Component({
  selector: 'app-website-list-tools',
  templateUrl: './website-list-tools.component.html',
  styleUrls: ['./website-list-tools.component.scss']
})
export class WebsiteListToolsComponent implements OnInit {
  isEmployee$: Observable<boolean>
  @Output() filter = new EventEmitter()
  filterValue = ''

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isEmployee$ = this.authService.userIsEmployee()
  }

  emitChange() {
    this.filter.emit(this.filterValue)
  }
}
