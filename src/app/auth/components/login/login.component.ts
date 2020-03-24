import { Component, OnInit, OnDestroy } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  name: string
  password: string
  subs: Subscription

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.subs = this.authService.userIsLoggedIn().subscribe(alreadyLoggedIn => {
      if (alreadyLoggedIn) {
        this.router.navigate(['/paarden'])
      }
    })
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe()
    }
  }

  onSubmit() {
    this.authService.login(this.name, this.password)
  }
}
