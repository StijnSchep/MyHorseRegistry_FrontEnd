import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth.service'

@Component({
  selector: 'app-todo-tools',
  templateUrl: './todo-tools.component.html',
  styleUrls: ['./todo-tools.component.scss']
})
export class TodoToolsComponent implements OnInit {
  isAdvertiser$: Observable<boolean>

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdvertiser$ = this.authService.userIsAdvertiser()
  }
}
