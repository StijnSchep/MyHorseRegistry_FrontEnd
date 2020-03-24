import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ReservationFormComponent } from './reservation-form.component'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { Router, ActivatedRoute } from '@angular/router'
import { HorseService } from 'src/app/horse-management/services/horse.service'
import { AlertService } from 'src/app/core/alert/alert.service'
import { ReservationService } from '../../services/reservation.service'
import { of } from 'rxjs'
import { Reservation } from '../../models/reservation.model'
import { Horse } from 'src/app/horse-management/models/horse.model'

describe('ReservationFormComponent', () => {
  let component: ReservationFormComponent
  let fixture: ComponentFixture<ReservationFormComponent>

  let routerSpy: { navigate: jasmine.Spy }
  let horseServiceSpy: { getHorses: jasmine.Spy }
  let alertServiceSpy: { error: jasmine.Spy }
  let reservationServiceSpy: {
    getReservation: jasmine.Spy
    updateReservation: jasmine.Spy
    createReservation: jasmine.Spy
  }

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    horseServiceSpy = jasmine.createSpyObj('HorseService', ['getHorses'])
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['error'])
    reservationServiceSpy = jasmine.createSpyObj('ReservationService', [
      'getReservation',
      'updateReservation',
      'createReservation'
    ])

    TestBed.configureTestingModule({
      declarations: [ReservationFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: HorseService, useValue: horseServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        { provide: ReservationService, useValue: reservationServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            snapshot: {
              data: {
                reservationAlreadyExists: true
              }
            }
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ReservationFormComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Should fetch a reservation and horses when in EditMode', async(async () => {
    horseServiceSpy.getHorses.and.returnValue(of([]))
    const reservation = new Reservation()
    reservation.horse = new Horse({ officialName: 'Horse', commonName: 'Horse' })
    reservationServiceSpy.getReservation.and.returnValue(reservation)

    await fixture.whenStable()
    fixture.detectChanges()

    expect(horseServiceSpy.getHorses).toHaveBeenCalled()
    expect(reservationServiceSpy.getReservation).toHaveBeenCalled()
  }))

  it('should create a new reservation and fetch horses when not in editmode', async(async () => {
    horseServiceSpy.getHorses.and.returnValue(of([]))
    let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.snapshot.data.reservationAlreadyExists = false
    component.ngOnInit()

    await fixture.whenStable()
    fixture.detectChanges()

    expect(horseServiceSpy.getHorses).toHaveBeenCalled()
    expect(reservationServiceSpy.getReservation).not.toHaveBeenCalled()
    expect(component.editMode).toBeFalsy()
    expect(component.reservation).toBeTruthy()
  }))

  it('should call updateReservation when in editmode', async(async () => {
    horseServiceSpy.getHorses.and.returnValue(of([]))
    const reservation = new Reservation()
    reservation.horse = new Horse({ officialName: 'Horse', commonName: 'Horse' })
    reservationServiceSpy.getReservation.and.returnValue(reservation)
    reservationServiceSpy.updateReservation.and.returnValue(of(true))

    await fixture.whenStable()
    fixture.detectChanges()

    component.onSubmit()
    await fixture.whenStable()
    fixture.detectChanges()

    expect(reservationServiceSpy.updateReservation).toHaveBeenCalled()
    expect(reservationServiceSpy.createReservation).not.toHaveBeenCalled()
  }))

  it('should call createReservation when not in editmode', async(async () => {
    horseServiceSpy.getHorses.and.returnValue(of([]))
    let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.snapshot.data.reservationAlreadyExists = false
    component.ngOnInit()
    const reservation = new Reservation()
    reservation.horse = new Horse({ officialName: 'Horse', commonName: 'Horse' })
    reservationServiceSpy.getReservation.and.returnValue(reservation)
    reservationServiceSpy.updateReservation.and.returnValue(of(true))
    reservationServiceSpy.createReservation.and.returnValue(of(true))

    await fixture.whenStable()
    fixture.detectChanges()

    component.onSubmit()
    await fixture.whenStable()
    fixture.detectChanges()

    expect(reservationServiceSpy.updateReservation).not.toHaveBeenCalled()
    expect(reservationServiceSpy.createReservation).toHaveBeenCalled()
  }))
})
