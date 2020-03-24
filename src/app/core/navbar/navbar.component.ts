import { Component, Input, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Input() title: string
  isNavbarCollapsed = true

  isLoggedIn$: Observable<boolean>
  isAdmin$: Observable<boolean>
  nameSubscription: Subscription
  name = ''

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.userIsLoggedIn()
    this.isAdmin$ = this.authService.userIsAdmin()
    this.nameSubscription = this.authService.userName().subscribe(name => (this.name = name))
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy() {
    if (this.nameSubscription) {
      this.nameSubscription.unsubscribe()
    }
  }
}
