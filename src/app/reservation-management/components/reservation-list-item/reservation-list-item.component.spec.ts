import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ReservationListItemComponent } from './reservation-list-item.component'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientModule } from '@angular/common/http'
import { Component } from '@angular/core'
import { AuthService } from 'src/app/auth/services/auth.service'
import { of } from 'rxjs'

@Component({
  selector: `app-test-host-component`,
  template: `
    <app-reservation-list-item [reservation]="input"></app-reservation-list-item>
  `
})
class TestHostComponent {
  input = {
    _id: '34fda',
    horseId: '34qt',
    horse: {
      officialName: 'Tester',
      commonName: 'Testeroo',
      gender: 'ruin',
      yearOfBirth: 2005
    },
    active: 'true',
    activated_on: new Date(),
    deactivated_on: new Date(),
    customerName: 'Jack',
    customerCountry: 'Nederland'
  }
}

describe('ReservationListItemComponent', () => {
  let component: TestHostComponent
  let fixture: ComponentFixture<TestHostComponent>

  let authServiceSpy: { userIsEmployee: jasmine.Spy }

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['userIsEmployee'])
    TestBed.configureTestingModule({
      declarations: [ReservationListItemComponent, TestHostComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should not show edit and delete options when user is employee', async(async () => {
    authServiceSpy.userIsEmployee.and.returnValue(of(true))

    await fixture.whenStable()
    fixture.detectChanges()

    const optionsElement = fixture.debugElement.nativeElement.querySelector('.crud-options')
    expect(optionsElement).toBeFalsy()
  }))

  it('should show edit and delete options when user is not employee', async(async () => {
    authServiceSpy.userIsEmployee.and.returnValue(of(false))

    await fixture.whenStable()
    fixture.detectChanges()

    const optionsElement = fixture.debugElement.nativeElement.querySelector('.crud-options')
    expect(optionsElement).toBeTruthy()
  }))
})
