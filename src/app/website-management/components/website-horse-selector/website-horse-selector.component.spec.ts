import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WebsiteHorseSelectorComponent } from './website-horse-selector.component'
import { Router, ActivatedRoute } from '@angular/router'
import { HorseService } from 'src/app/horse-management/services/horse.service'
import { WebsiteService } from '../../services/website.service'
import { AlertService } from 'src/app/core/alert/alert.service'
import { of, throwError } from 'rxjs'
import { FormsModule } from '@angular/forms'
import { Website } from '../../models/website.model'

describe('WebsiteHorseSelectorComponent', () => {
  let component: WebsiteHorseSelectorComponent
  let fixture: ComponentFixture<WebsiteHorseSelectorComponent>

  let routerSpy: { navigate: jasmine.Spy }
  let horseServiceSpy: { getHorses: jasmine.Spy }
  let websiteServiceSpy: { getWebsite: jasmine.Spy; addHorse: jasmine.Spy }
  let alertServiceSpy: { error: jasmine.Spy }

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    horseServiceSpy = jasmine.createSpyObj('HorseService', ['getHorses'])
    websiteServiceSpy = jasmine.createSpyObj('WebsiteService', ['getWebsite', 'addHorse'])
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['error'])

    TestBed.configureTestingModule({
      declarations: [WebsiteHorseSelectorComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: HorseService, useValue: horseServiceSpy },
        { provide: WebsiteService, useValue: websiteServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' })
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(WebsiteHorseSelectorComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch a website on init', async(async () => {
    websiteServiceSpy.getWebsite.and.returnValue(new Website())
    horseServiceSpy.getHorses.and.returnValue(of([]))

    await fixture.whenStable()
    fixture.detectChanges()

    expect(websiteServiceSpy.getWebsite).toHaveBeenCalled()
  }))

  it('should navigate after saving horse', async(async () => {
    websiteServiceSpy.getWebsite.and.returnValue(new Website())
    websiteServiceSpy.addHorse.and.returnValue(of(true))
    horseServiceSpy.getHorses.and.returnValue(of([]))

    await fixture.whenStable()
    fixture.detectChanges()

    component.onSubmit()

    await fixture.whenStable()
    fixture.detectChanges()

    expect(routerSpy.navigate).toHaveBeenCalled()
  }))

  it('should throw an alert when addHorse throws an error', async(async () => {
    websiteServiceSpy.getWebsite.and.returnValue(new Website())
    websiteServiceSpy.addHorse.and.returnValue(throwError('error'))
    horseServiceSpy.getHorses.and.returnValue(of([]))

    await fixture.whenStable()
    fixture.detectChanges()

    component.onSubmit()

    await fixture.whenStable()
    fixture.detectChanges()

    expect(alertServiceSpy.error).toHaveBeenCalled()
  }))
})
