import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ReservationListComponent } from './reservation-list.component'
import { Input, Component } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { ReservationService } from '../../services/reservation.service'
import { AlertService } from 'src/app/core/alert/alert.service'

@Component({ selector: 'app-reservation-list-item', template: '' })
class ReservationListItemStubComponent {
  @Input() reservation
}

@Component({ selector: 'app-reservation-list-tools', template: '' })
class ReservationListToolsStubComponent {}

describe('ReservationListComponent', () => {
  let component: ReservationListComponent
  let fixture: ComponentFixture<ReservationListComponent>

  let reservationServiceSpy: { getReservations: jasmine.Spy }
  let alertServiceSpy: { error: jasmine.Spy }

  beforeEach(async(() => {
    reservationServiceSpy = jasmine.createSpyObj('ReservationService', ['getReservations'])
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['error'])

    TestBed.configureTestingModule({
      declarations: [
        ReservationListComponent,
        ReservationListItemStubComponent,
        ReservationListToolsStubComponent
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: ReservationService, useValue: reservationServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ReservationListComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch reservations on init', async(async () => {
    reservationServiceSpy.getReservations.and.returnValue(of([]))

    await fixture.whenStable()
    fixture.detectChanges()

    expect(reservationServiceSpy.getReservations).toHaveBeenCalled()
  }))
})
