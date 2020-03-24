import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WebsiteListToolsComponent } from './website-list-tools.component'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import { FormsModule } from '@angular/forms'
import { AuthService } from 'src/app/auth/services/auth.service'
import { of } from 'rxjs'

describe('WebsiteListToolsComponent', () => {
  let component: WebsiteListToolsComponent
  let fixture: ComponentFixture<WebsiteListToolsComponent>

  let authServiceSpy: { userIsEmployee: jasmine.Spy }

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['userIsEmployee'])

    TestBed.configureTestingModule({
      declarations: [WebsiteListToolsComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents()

    fixture = TestBed.createComponent(WebsiteListToolsComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should not show tools when user is employee', async(async () => {
    authServiceSpy.userIsEmployee.and.returnValue(of(true))

    await fixture.whenStable()
    fixture.detectChanges()

    let rootElement = fixture.debugElement.nativeElement.querySelector('.root')

    expect(rootElement).toBeFalsy()
  }))

  it('should show tools when user is not employee', async(async () => {
    authServiceSpy.userIsEmployee.and.returnValue(of(false))

    await fixture.whenStable()
    fixture.detectChanges()

    let rootElement = fixture.debugElement.nativeElement.querySelector('.root')

    expect(rootElement).toBeTruthy()
  }))
})
