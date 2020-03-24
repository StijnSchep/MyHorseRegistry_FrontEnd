import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WebsiteDeleteComponent } from './website-delete.component'
import { RouterTestingModule } from '@angular/router/testing'
import { Router, ActivatedRoute } from '@angular/router'
import { WebsiteService } from '../../services/website.service'
import { AlertService } from 'src/app/core/alert/alert.service'
import { of, throwError } from 'rxjs'
import { Website } from '../../models/website.model'

describe('WebsiteDeleteComponent', () => {
  let component: WebsiteDeleteComponent
  let fixture: ComponentFixture<WebsiteDeleteComponent>

  let routerSpy: { navigate: jasmine.Spy }
  let websiteServiceSpy: { getWebsite: jasmine.Spy; deleteWebsite: jasmine.Spy }
  let alertServiceSpy: { error: jasmine.Spy }

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    websiteServiceSpy = jasmine.createSpyObj('WebsiteService', ['getWebsite', 'deleteWebsite'])
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['error'])

    TestBed.configureTestingModule({
      declarations: [WebsiteDeleteComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
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

    fixture = TestBed.createComponent(WebsiteDeleteComponent)
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

    await fixture.whenStable()
    fixture.detectChanges()

    expect(websiteServiceSpy.getWebsite).toHaveBeenCalled()
  }))

  it('should navigate after deleting website', async(async () => {
    websiteServiceSpy.getWebsite.and.returnValue(new Website())
    websiteServiceSpy.deleteWebsite.and.returnValue(of(true))

    component.onDelete()

    await fixture.whenStable()
    fixture.detectChanges()

    expect(websiteServiceSpy.deleteWebsite).toHaveBeenCalled()
    expect(routerSpy.navigate).toHaveBeenCalled()
  }))

  it('should navigate on cancel', async(async () => {
    websiteServiceSpy.getWebsite.and.returnValue(new Website())
    websiteServiceSpy.deleteWebsite.and.returnValue(of(true))
    component.onCancel()

    await fixture.whenStable()
    fixture.detectChanges()

    expect(websiteServiceSpy.deleteWebsite).not.toHaveBeenCalled()
    expect(routerSpy.navigate).toHaveBeenCalled()
  }))

  it('should give an alert when deleteUser throws an error', async(async () => {
    websiteServiceSpy.getWebsite.and.returnValue(new Website())
    websiteServiceSpy.deleteWebsite.and.returnValue(throwError('error'))
    component.onDelete()

    await fixture.whenStable()
    fixture.detectChanges()

    expect(websiteServiceSpy.deleteWebsite).toHaveBeenCalled()
    expect(alertServiceSpy.error).toHaveBeenCalled()
  }))
})
