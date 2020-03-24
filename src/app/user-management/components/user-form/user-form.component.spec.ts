import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserFormComponent } from './user-form.component'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import { UserService } from '../../services/user.service'
import { AlertService } from 'src/app/core/alert/alert.service'
import { Router, ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'

describe('UserFormComponent', () => {
  let component: UserFormComponent
  let fixture: ComponentFixture<UserFormComponent>

  let userServiceSpy: { createUser: jasmine.Spy }
  let alertServiceSpy: { error: jasmine.Spy }
  let routerSpy: { navigate: jasmine.Spy }

  beforeEach(async(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['createUser'])
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['error'])
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])

    TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(UserFormComponent)
    component = fixture.componentInstance
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Should navigate after saving user', async(async () => {
    userServiceSpy.createUser.and.returnValue(of(true))
    component.onSubmit()

    await fixture.whenStable()
    fixture.detectChanges()

    expect(userServiceSpy.createUser).toHaveBeenCalled()
    expect(routerSpy.navigate).toHaveBeenCalled()
  }))
})
