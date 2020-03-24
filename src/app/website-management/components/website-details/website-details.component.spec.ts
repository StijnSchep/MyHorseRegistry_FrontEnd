import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WebsiteDetailsComponent } from './website-details.component'
import { WebsiteService } from '../../services/website.service'
import { AuthService } from 'src/app/auth/services/auth.service'
import { ActivatedRoute } from '@angular/router'
import { of } from 'rxjs'
import { Website } from '../../models/website.model'
import { RouterTestingModule } from '@angular/router/testing'
import { Horse } from 'src/app/horse-management/models/horse.model'

describe('WebsiteDetailsComponent', () => {
  let component: WebsiteDetailsComponent
  let fixture: ComponentFixture<WebsiteDetailsComponent>

  let websiteServiceSpy: { getWebsite: jasmine.Spy; removeHorse: jasmine.Spy }
  let authServiceSpy: { userIsEmployee: jasmine.Spy }

  beforeEach(async(() => {
    websiteServiceSpy = jasmine.createSpyObj('WebsiteService', ['getWebsite', 'removeHorse'])
    authServiceSpy = jasmine.createSpyObj('AuthService', ['userIsEmployee'])

    TestBed.configureTestingModule({
      declarations: [WebsiteDetailsComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: WebsiteService, useValue: websiteServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' })
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(WebsiteDetailsComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch website on init', async(async () => {
    let testWebsite = new Website()
    testWebsite.URL = 'www.google.com'
    testWebsite.horses = []

    websiteServiceSpy.getWebsite.and.returnValue(testWebsite)

    await fixture.whenStable()
    fixture.detectChanges()

    expect(websiteServiceSpy.getWebsite).toHaveBeenCalled()
  }))

  it('should create a correct link for URL when http(s) is not provided', async(async () => {
    let testWebsite = new Website()
    testWebsite.URL = 'www.google.com'
    testWebsite.horses = []

    websiteServiceSpy.getWebsite.and.returnValue(testWebsite)

    await fixture.whenStable()
    fixture.detectChanges()

    expect(component.URL).toEqual('https://www.google.com')
  }))

  it('should create a correct link for URL when http(s) is provided', async(async () => {
    let testWebsite = new Website()
    testWebsite.URL = 'https://www.google.com'
    testWebsite.horses = []

    websiteServiceSpy.getWebsite.and.returnValue(testWebsite)

    await fixture.whenStable()
    fixture.detectChanges()

    expect(component.URL).toEqual('https://www.google.com')
  }))

  it('should remove a horse from the local list after deleting', async(async () => {
    let testWebsite = new Website()
    testWebsite.URL = 'https://www.google.com'
    testWebsite.horses = [new Horse({ _id: '1234' })]

    websiteServiceSpy.getWebsite.and.returnValue(testWebsite)
    websiteServiceSpy.removeHorse.and.returnValue(of(true))

    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    component.onDeleteHorse('1234')

    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    console.log(component.website)
    expect(component.website.horses.length).toEqual(0)
  }))
})
