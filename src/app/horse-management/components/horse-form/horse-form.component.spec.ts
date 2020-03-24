import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { HorseFormComponent } from './horse-form.component'
import { FormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { HttpClientModule } from '@angular/common/http'
import { HorseService } from '../../services/horse.service'
import { ActivatedRoute, Router } from '@angular/router'
import { of } from 'rxjs'
import { Horse } from '../../models/horse.model'

describe('HorseFormComponent', () => {
  let component: HorseFormComponent
  let fixture: ComponentFixture<HorseFormComponent>

  let routerSpy: { navigate: jasmine.Spy }
  let horseServiceSpy: {
    getHorse: jasmine.Spy
    updateHorse: jasmine.Spy
    createHorse: jasmine.Spy
  }

  beforeEach(async(() => {
    horseServiceSpy = jasmine.createSpyObj('HorseService', ['getHorse', 'updateHorse', 'createHorse'])
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])

    TestBed.configureTestingModule({
      declarations: [HorseFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: HorseService, useValue: horseServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test' }),
            snapshot: {
              data: {
                horseAlreadyExists: true
              }
            }
          }
        },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(HorseFormComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should fetch a horse when in editmode', async(() => {
    let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.snapshot.data.horseAlreadyExists = true
    component.ngOnInit()

    fixture.whenStable().then(() => {
      horseServiceSpy.getHorse.and.returnValue(new Horse({ officialName: 'Horsy' }))

      fixture.whenStable().then(() => {
        fixture.detectChanges()
        expect(horseServiceSpy.getHorse).toHaveBeenCalled()
      })
    })
  }))

  it('should create a new horse when not in editmode', async(() => {
    let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.snapshot.data.horseAlreadyExists = false
    component.ngOnInit()

    fixture.whenStable().then(() => {
      horseServiceSpy.getHorse.and.returnValue(new Horse({ officialName: 'Horsy' }))

      fixture.whenStable().then(() => {
        fixture.detectChanges()
        expect(component.editMode).toBeFalsy()
        expect(component.horse.status).toEqual('Actief')
        expect(horseServiceSpy.getHorse).not.toHaveBeenCalled()
      })
    })
  }))

  it('should call updateHorse when in editmode', async(() => {
    horseServiceSpy.getHorse.and.returnValue(new Horse({ officialName: 'Horsy' }))
    horseServiceSpy.updateHorse.and.returnValue(of(true))

    fixture.whenStable().then(() => {
      fixture.detectChanges()
      component.year = '2000'
      component.horse.yearOfBirth = 2000
      component.onSubmit()

      fixture.whenStable().then(() => {
        fixture.detectChanges()
        expect(horseServiceSpy.updateHorse).toHaveBeenCalled()
      })
    })
  }))

  it('should call createHorse when not in editmode', async(async () => {
    let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.snapshot.data.horseAlreadyExists = false
    component.ngOnInit()

    await fixture.whenStable()
    horseServiceSpy.getHorse.and.returnValue(new Horse({ officialName: 'Horsy' }))
    horseServiceSpy.updateHorse.and.returnValue(of(true))
    horseServiceSpy.createHorse.and.returnValue(of(true))

    await fixture.whenStable()
    fixture.detectChanges()
    component.year = '2000'
    component.horse.yearOfBirth = 2000
    component.onSubmit()

    await fixture.whenStable()
    fixture.detectChanges()
    expect(horseServiceSpy.createHorse).toHaveBeenCalled()
  }))
})
