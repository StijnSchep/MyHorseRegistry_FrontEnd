import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserListComponent } from './user-list.component'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientModule } from '@angular/common/http'
import { AlertService } from 'src/app/core/alert/alert.service'
import { UserService } from '../../services/user.service'
import { of, throwError } from 'rxjs'
import { User } from 'src/app/auth/models/user.model'

describe('UserListComponent', () => {
  let component: UserListComponent
  let fixture: ComponentFixture<UserListComponent>

  let alertServiceSpy: { error: jasmine.Spy; success: jasmine.Spy }
  let userServiceSpy: { getUsers: jasmine.Spy; deleteUser: jasmine.Spy }

  beforeEach(async(() => {
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['error', 'success'])
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'deleteUser'])

    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(UserListComponent)
    component = fixture.componentInstance
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch users on init', async(async () => {
    userServiceSpy.getUsers.and.returnValue(of([]))

    await fixture.whenStable()
    fixture.detectChanges()

    expect(userServiceSpy.getUsers).toHaveBeenCalled()
  }))

  it('should give a success alert when user is deleted', async(async () => {
    userServiceSpy.getUsers.and.returnValue(of([]))
    userServiceSpy.deleteUser.and.returnValue(of(true))

    component.deleteUser(new User())

    await fixture.whenStable()
    fixture.detectChanges()

    expect(userServiceSpy.deleteUser).toHaveBeenCalled()
    expect(alertServiceSpy.success).toHaveBeenCalled()
  }))

  it('should give an error if deleteUser throws an error', async(async () => {
    userServiceSpy.getUsers.and.returnValue(of([]))
    userServiceSpy.deleteUser.and.returnValue(throwError('error'))

    component.deleteUser(new User())

    await fixture.whenStable()
    fixture.detectChanges()

    expect(userServiceSpy.deleteUser).toHaveBeenCalled()
    expect(alertServiceSpy.error).toHaveBeenCalled()
  }))
})
