import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { NavbarComponent } from './navbar.component'
import { AuthService } from '../../auth/services/auth.service'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { of } from 'rxjs'

describe('NavbarComponent', () => {
  let component: NavbarComponent
  let fixture: ComponentFixture<NavbarComponent>

  let authServiceSpy: {
    userIsLoggedIn: jasmine.Spy
    userName: jasmine.Spy
    userIsAdmin: jasmine.Spy
  }

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('authService', ['userIsAdmin', 'userIsLoggedIn', 'userName'])

    TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      imports: [NgbModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents()

    fixture = TestBed.createComponent(NavbarComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('Should set user name', async(() => {
    authServiceSpy.userName.and.returnValue(of('User'))

    fixture.whenStable().then(() => {
      fixture.detectChanges()
      expect(component.name).toEqual('User')
    })
  }))

  it('Should show login button if user is not logged in', async(() => {
    authServiceSpy.userIsLoggedIn.and.returnValue(of(false))
    authServiceSpy.userName.and.returnValue(of(''))

    fixture.whenStable().then(() => {
      fixture.detectChanges()

      const compiled = fixture.debugElement.nativeElement
      expect(compiled.querySelector('#loginButton')).toBeTruthy()
    })
  }))

  it('Should not show login button if user is logged in', async(() => {
    authServiceSpy.userIsLoggedIn.and.returnValue(of(true))
    authServiceSpy.userName.and.returnValue(of(''))

    fixture.whenStable().then(() => {
      fixture.detectChanges()

      const compiled = fixture.debugElement.nativeElement
      expect(compiled.querySelector('#loginButton')).toBeFalsy()
    })
  }))
})
