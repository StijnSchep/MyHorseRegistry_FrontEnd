import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { TodoToolsComponent } from './todo-tools.component'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthService } from 'src/app/auth/services/auth.service'
import { of } from 'rxjs'

describe('TodoToolsComponent', () => {
  let component: TodoToolsComponent
  let fixture: ComponentFixture<TodoToolsComponent>

  let authServiceSpy: { userIsAdvertiser: jasmine.Spy }

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['userIsAdvertiser'])

    TestBed.configureTestingModule({
      declarations: [TodoToolsComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents()

    fixture = TestBed.createComponent(TodoToolsComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should not show tools when user is advertiser', async(async () => {
    authServiceSpy.userIsAdvertiser.and.returnValue(of(true))

    await fixture.whenStable()
    fixture.detectChanges()

    let rootElement = fixture.debugElement.nativeElement.querySelector('.root')

    expect(rootElement).toBeFalsy()
  }))

  it('should show tools when user is not advertiser', async(async () => {
    authServiceSpy.userIsAdvertiser.and.returnValue(of(false))

    await fixture.whenStable()
    fixture.detectChanges()

    let rootElement = fixture.debugElement.nativeElement.querySelector('.root')

    expect(rootElement).toBeTruthy()
  }))
})
