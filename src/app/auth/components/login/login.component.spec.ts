import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LoginComponent } from './login.component'
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { of, Observable, BehaviorSubject } from 'rxjs'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  let routerSpy: { navigateByUrl: jasmine.Spy; navigate: jasmine.Spy }
  let authServiceSpy: { userIsLoggedIn: jasmine.Spy }

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate'])
    authServiceSpy = jasmine.createSpyObj('AuthService', ['userIsLoggedIn'])

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ],
      imports: [FormsModule]
    }).compileComponents()

    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should show login page user is not logged in', async(() => {
    authServiceSpy.userIsLoggedIn.and.returnValue(of(false))

    fixture.whenStable().then(() => {
      fixture.detectChanges()
      expect(component).toBeTruthy()
    })
  }))

  it('should navigate away from login', async(() => {
    authServiceSpy.userIsLoggedIn.and.returnValue(of(true))

    fixture.whenStable().then(() => {
      fixture.detectChanges()
      expect(component).toBeTruthy()
      expect(routerSpy.navigate).toHaveBeenCalled()
    })
  }))
})
