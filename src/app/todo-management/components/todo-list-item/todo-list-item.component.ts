import { Component, OnInit, Input } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.scss']
})
export class TodoListItemComponent implements OnInit {
  @Input() todo
  isAdvertiser$: Observable<boolean>

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdvertiser$ = this.authService.userIsAdvertiser()
  }
}
