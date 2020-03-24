import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ReservationDeleteComponent } from './reservation-delete.component'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import { AlertService } from 'src/app/core/alert/alert.service'
import { ReservationService } from '../../services/reservation.service'
import { ActivatedRoute, Router } from '@angular/router'
import { of } from 'rxjs'
import { Reservation } from '../../models/reservation.model'

describe('ReservationDeleteComponent', () => {
  let component: ReservationDeleteComponent
  let fixture: ComponentFixture<ReservationDeleteComponent>

  let alertServiceSpy: { error: jasmine.Spy }
  let reservationServiceSpy: { getReservation: jasmine.Spy; deleteReservation: jasmine.Spy }
  let routerSpy: { navigate: jasmine.Spy }

  beforeEach(async(() => {
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['error'])
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    reservationServiceSpy = jasmine.createSpyObj('ReservationService', [
      'getReservation',
      'deleteReservation'
    ])

    TestBed.configureTestingModule({
      declarations: [ReservationDeleteComponent],
      providers: [
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: ReservationService, useValue: reservationServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: '123'
            })
          }
        }
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationDeleteComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch a reservation', async(async () => {
    reservationServiceSpy.getReservation.and.returnValue(new Reservation())

    await fixture.whenStable()
    fixture.detectChanges()

    expect(reservationServiceSpy.getReservation).toHaveBeenCalled()
  }))

  it('should delete reservation when clicking on delete', async(async () => {
    reservationServiceSpy.getReservation.and.returnValue(new Reservation())
    reservationServiceSpy.deleteReservation.and.returnValue(of(true))

    await fixture.whenStable()
    fixture.detectChanges()

    let deleteButton = fixture.debugElement.nativeElement.querySelector('.btn-info')
    deleteButton.click()

    await fixture.whenStable()
    fixture.detectChanges()

    expect(reservationServiceSpy.getReservation).toHaveBeenCalled()
    expect(reservationServiceSpy.deleteReservation).toHaveBeenCalled()
    expect(routerSpy.navigate).toHaveBeenCalled()
  }))
})
