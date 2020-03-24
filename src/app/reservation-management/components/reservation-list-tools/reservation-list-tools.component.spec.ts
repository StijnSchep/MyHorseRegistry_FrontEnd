import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ReservationListToolsComponent } from './reservation-list-tools.component'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthService } from 'src/app/auth/services/auth.service'
import { of } from 'rxjs'

describe('ReservationListToolsComponent', () => {
  let component: ReservationListToolsComponent
  let fixture: ComponentFixture<ReservationListToolsComponent>

  let authServiceSpy: { userIsEmployee: jasmine.Spy }

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['userIsEmployee'])

    TestBed.configureTestingModule({
      declarations: [ReservationListToolsComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents()

    fixture = TestBed.createComponent(ReservationListToolsComponent)
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
