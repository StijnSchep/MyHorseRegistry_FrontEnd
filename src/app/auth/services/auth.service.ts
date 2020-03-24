import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { User } from '../models/user.model'
import { Router } from '@angular/router'
import { environment } from 'src/environments/environment'
import { AlertService } from 'src/app/core/alert/alert.service'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedInUser = new BehaviorSubject<boolean>(false)
  public loggedInName = new BehaviorSubject<string>('')
  private isAdminUser = new BehaviorSubject<boolean>(false)
  private isEmployeeUser = new BehaviorSubject<boolean>(false)
  private isAdvertiserUser = new BehaviorSubject<boolean>(false)

  private readonly currentUser = 'currentuser'
  private readonly currentToken = 'token'
  private readonly headers = new HttpHeaders({ 'Content-Type': 'application/json' })

  public readonly redirectUrl: string = '/horses'

  public getCurrentUser(): Observable<User> {
    return new Observable(observer => {
      const localUser: any = JSON.parse(localStorage.getItem(this.currentUser))
      if (localUser) {
        observer.next(new User(localUser))
        observer.complete()
      } else {
        observer.error('No localUser found')
        observer.complete()
      }
    })
  }

  private saveCurrentUser(user: User, token: string): void {
    localStorage.setItem(this.currentUser, JSON.stringify(user))
    localStorage.setItem(this.currentToken, token)
  }

  constructor(private http: HttpClient, private router: Router, private alertService: AlertService) {
    this.getCurrentUser().subscribe({
      next: (user: User) => {
        this.isLoggedInUser.next(true)
        this.loggedInName.next(user.name)

        if (user.role === 1) {
          this.isAdminUser.next(true)
          this.isAdvertiserUser.next(false)
          this.isEmployeeUser.next(false)
        }

        if (user.role === 2) {
          this.isAdminUser.next(false)
          this.isAdvertiserUser.next(true)
          this.isEmployeeUser.next(false)
        }

        if (user.role === 3) {
          this.isAdminUser.next(false)
          this.isAdvertiserUser.next(false)
          this.isEmployeeUser.next(true)
        }
      },
      error: message => {
        this.isLoggedInUser.next(false)
        this.isAdminUser.next(false)
        this.isEmployeeUser.next(false)
        this.isAdvertiserUser.next(false)
        this.router.navigate(['/login'])
      }
    })
  }

  userName(): Observable<string> {
    return this.loggedInName.asObservable()
  }

  userIsLoggedIn(): Observable<boolean> {
    return this.isLoggedInUser.asObservable()
  }

  userIsAdmin(): Observable<boolean> {
    return this.isAdminUser.asObservable()
  }
  userIsEmployee(): Observable<boolean> {
    return this.isEmployeeUser.asObservable()
  }
  userIsAdvertiser(): Observable<boolean> {
    return this.isAdvertiserUser.asObservable()
  }

  login(name: string, password: string) {
    return this.http
      .post(`${environment.api_url}/api/auth/login`, { name, password }, { headers: this.headers })
      .subscribe({
        next: (response: any) => {
          console.log('server response: ' + response)
          const currentUser = new User({
            name: name,
            role: response.role
          })

          this.saveCurrentUser(currentUser, response.token)
          this.isLoggedInUser.next(true)
          this.loggedInName.next(name)
          switch (response.role) {
            case 1:
              this.isAdminUser.next(true)
              this.isAdvertiserUser.next(false)
              this.isEmployeeUser.next(false)
              break
            case 2:
              this.isAdminUser.next(false)
              this.isAdvertiserUser.next(true)
              this.isEmployeeUser.next(false)
              break
            case 3:
              this.isAdminUser.next(false)
              this.isAdvertiserUser.next(false)
              this.isEmployeeUser.next(true)
              break
          }

          this.router.navigate([this.redirectUrl])
          this.alertService.success('Je bent ingelogd')
        },
        error: (message: any) => {
          this.alertService.error('Ongeldige naam of wachtwoord')
        }
      })
  }

  logout() {
    localStorage.removeItem(this.currentUser)
    localStorage.removeItem(this.currentToken)
    this.isLoggedInUser.next(false)
    this.isAdminUser.next(false)
    this.isAdvertiserUser.next(false)
    this.isEmployeeUser.next(false)
    this.alertService.success('You have been logged out')
  }
}
