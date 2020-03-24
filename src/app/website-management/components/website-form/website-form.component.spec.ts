import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WebsiteFormComponent } from './website-form.component'
import { FormsModule } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { WebsiteService } from '../../services/website.service'
import { of } from 'rxjs'
import { Website } from '../../models/website.model'

describe('WebsiteFormComponent', () => {
  let component: WebsiteFormComponent
  let fixture: ComponentFixture<WebsiteFormComponent>

  let routerSpy: { navigate: jasmine.Spy }
  let websiteServiceSpy: { getWebsite: jasmine.Spy; updateWebsite: jasmine.Spy; createWebsite: jasmine.Spy }

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    websiteServiceSpy = jasmine.createSpyObj('WebsiteService', [
      'getWebsite',
      'updateWebsite',
      'createWebsite'
    ])

    TestBed.configureTestingModule({
      declarations: [WebsiteFormComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: WebsiteService, useValue: websiteServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            snapshot: {
              data: {
                websiteAlreadyExists: true
              }
            }
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(WebsiteFormComponent)
    component = fixture.componentInstance
  }))

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch a website on init when in editMode', async(async () => {
    websiteServiceSpy.getWebsite.and.returnValue(new Website())

    await fixture.whenStable()
    fixture.detectChanges()

    expect(component.editMode).toBeTruthy()
    expect(websiteServiceSpy.getWebsite).toHaveBeenCalled()
  }))

  it('should create a new website on init when in not editMode', async(async () => {
    let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.snapshot.data.websiteAlreadyExists = false
    component.ngOnInit()

    websiteServiceSpy.getWebsite.and.returnValue(new Website())

    await fixture.whenStable()
    fixture.detectChanges()

    expect(component.editMode).toBeFalsy()
    expect(websiteServiceSpy.getWebsite).not.toHaveBeenCalled()
    expect(component.website).toBeTruthy()
  }))

  it('Should call updateWebsite when in editMode', async(async () => {
    websiteServiceSpy.getWebsite.and.returnValue(new Website())
    websiteServiceSpy.updateWebsite.and.returnValue(of(true))
    websiteServiceSpy.createWebsite.and.returnValue(of(true))

    await fixture.whenStable()
    fixture.detectChanges()

    component.onSubmit()
    await fixture.whenStable()
    fixture.detectChanges()

    expect(component.editMode).toBeTruthy()
    expect(websiteServiceSpy.updateWebsite).toHaveBeenCalled()
    expect(websiteServiceSpy.createWebsite).not.toHaveBeenCalled()
  }))

  it('Should call createWebsite when not in editMode', async(async () => {
    let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.snapshot.data.websiteAlreadyExists = false
    component.ngOnInit()

    websiteServiceSpy.getWebsite.and.returnValue(new Website())
    websiteServiceSpy.updateWebsite.and.returnValue(of(true))
    websiteServiceSpy.createWebsite.and.returnValue(of(true))

    await fixture.whenStable()
    fixture.detectChanges()

    component.onSubmit()
    await fixture.whenStable()
    fixture.detectChanges()

    expect(component.editMode).toBeFalsy()
    expect(websiteServiceSpy.updateWebsite).not.toHaveBeenCalled()
    expect(websiteServiceSpy.createWebsite).toHaveBeenCalled()
  }))
})
