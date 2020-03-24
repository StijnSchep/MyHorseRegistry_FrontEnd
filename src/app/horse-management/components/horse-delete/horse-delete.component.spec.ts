import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { HorseDeleteComponent } from './horse-delete.component'
import { RouterTestingModule } from '@angular/router/testing'
import { AlertService } from 'src/app/core/alert/alert.service'
import { HorseService } from '../../services/horse.service'
import { Horse } from '../../models/horse.model'
import { ActivatedRoute, Router } from '@angular/router'
import { of, Observable, throwError } from 'rxjs'

describe('HorseDeleteComponent', () => {
  let component: HorseDeleteComponent
  let fixture: ComponentFixture<HorseDeleteComponent>

  let horseServiceSpy: { getHorse: jasmine.Spy; deleteHorse: jasmine.Spy }
  let alertServiceSpy: { error: jasmine.Spy }

  beforeEach(async(() => {
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['error'])
    horseServiceSpy = jasmine.createSpyObj('HorseService', ['getHorse', 'deleteHorse'])

    TestBed.configureTestingModule({
      declarations: [HorseDeleteComponent],
      imports: [
        RouterTestingModule.withRoutes([{ path: 'horses/:id/delete', component: HorseDeleteComponent }])
      ],
      providers: [
        { provide: HorseService, useValue: horseServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(HorseDeleteComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should fetch a horse', async(() => {
    let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.params = of({ id: '123' })

    fixture.whenStable().then(() => {
      horseServiceSpy.getHorse.and.returnValue(new Horse({ officialName: 'Horsy' }))

      fixture.whenStable().then(() => {
        fixture.detectChanges()
        expect(component.horse.officialName).toEqual('Horsy')
      })
    })
  }))

  it('Should call deleteHorse on delete', async(() => {
    let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.params = of({ id: '123' })

    fixture.whenStable().then(() => {
      horseServiceSpy.getHorse.and.returnValue(new Horse({ officialName: 'Horsy' }))
      horseServiceSpy.deleteHorse.and.returnValue(of(true))

      fixture.whenStable().then(() => {
        fixture.detectChanges()
        expect(component.horse.officialName).toEqual('Horsy')
        let button = fixture.debugElement.nativeElement.querySelector('.btn-info')
        button.click()
        fixture.whenStable().then(() => {
          expect(horseServiceSpy.deleteHorse).toHaveBeenCalled()
        })
      })
    })
  }))

  it('Should give error when error is thrown', async(() => {
    let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.params = of({ id: '123' })

    fixture.whenStable().then(() => {
      horseServiceSpy.getHorse.and.returnValue(new Horse({ officialName: 'Horsy' }))
      horseServiceSpy.deleteHorse.and.returnValue(throwError('error'))

      fixture.whenStable().then(() => {
        fixture.detectChanges()
        expect(component.horse.officialName).toEqual('Horsy')
        let button = fixture.debugElement.nativeElement.querySelector('.btn-info')
        button.click()
        fixture.whenStable().then(() => {
          expect(horseServiceSpy.deleteHorse).toHaveBeenCalled()
          expect(alertServiceSpy.error).toHaveBeenCalled()
        })
      })
    })
  }))

  it('Should call router.navigate on cancel', async(() => {
    let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    let router = fixture.debugElement.injector.get(Router)
    spyOn(router, 'navigate')
    activatedRoute.params = of({ id: '123' })

    fixture.whenStable().then(() => {
      horseServiceSpy.getHorse.and.returnValue(new Horse({ officialName: 'Horsy' }))
      horseServiceSpy.deleteHorse.and.returnValue(throwError('error'))

      fixture.whenStable().then(() => {
        fixture.detectChanges()
        expect(component.horse.officialName).toEqual('Horsy')
        let button = fixture.debugElement.nativeElement.querySelector('.btn-link')
        button.click()
        fixture.whenStable().then(() => {
          expect(horseServiceSpy.deleteHorse).not.toHaveBeenCalled()
          expect(alertServiceSpy.error).not.toHaveBeenCalled()
          expect(router.navigate).toHaveBeenCalled()
        })
      })
    })
  }))
})
