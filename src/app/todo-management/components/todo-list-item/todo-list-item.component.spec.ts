import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { TodoListItemComponent } from './todo-list-item.component'
import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { AuthService } from 'src/app/auth/services/auth.service'
import { of } from 'rxjs'

@Component({
  selector: `app-test-host-component`,
  template: `
    <app-todo-list-item [todo]="input"></app-todo-list-item>
  `
})
class TestHostComponent {
  input = {
    title: 'title',
    user: 'user',
    created_at: new Date()
  }
}

describe('TodoListItemComponent', () => {
  let component: TestHostComponent
  let fixture: ComponentFixture<TestHostComponent>

  let authServiceSpy: { userIsAdvertiser: jasmine.Spy }

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['userIsAdvertiser'])

    TestBed.configureTestingModule({
      declarations: [TestHostComponent, TodoListItemComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('Should not show edit option if user is advertiser', async(async () => {
    authServiceSpy.userIsAdvertiser.and.returnValue(of(true))

    await fixture.whenStable()
    fixture.detectChanges()

    let editElement = fixture.debugElement.nativeElement.querySelector('.fa-edit')

    expect(editElement).toBeFalsy()
  }))

  it('Should show edit option if user is not advertiser', async(async () => {
    authServiceSpy.userIsAdvertiser.and.returnValue(of(false))

    await fixture.whenStable()
    fixture.detectChanges()

    let editElement = fixture.debugElement.nativeElement.querySelector('.fa-edit')

    expect(editElement).toBeTruthy()
  }))
})
