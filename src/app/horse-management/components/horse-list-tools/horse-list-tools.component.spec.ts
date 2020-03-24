import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { HorseListToolsComponent } from './horse-list-tools.component'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import { of } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth.service'

describe('HorseListToolsComponent', () => {
  let component: HorseListToolsComponent
  let fixture: ComponentFixture<HorseListToolsComponent>

  let authServiceSpy: { userIsEmployee: jasmine.Spy }

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['userIsEmployee'])

    TestBed.configureTestingModule({
      declarations: [HorseListToolsComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents()

    fixture = TestBed.createComponent(HorseListToolsComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should not show toolbar when user is employee', async(async () => {
    authServiceSpy.userIsEmployee.and.returnValue(of(true))

    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    let root = fixture.debugElement.nativeElement.querySelector('.root')
    expect(root).toBeFalsy()
  }))

  it('should show toolbar when user is not employee', async(async () => {
    authServiceSpy.userIsEmployee.and.returnValue(of(false))

    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    let root = fixture.debugElement.nativeElement.querySelector('.root')
    expect(root).toBeTruthy()
  }))
})
