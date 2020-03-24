import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component, Input } from '@angular/core'

import { TodoListComponent } from './todo-list.component'
import { HttpClientModule } from '@angular/common/http'
import { TodoService } from '../../services/todo.service'
import { RepollTodosNotificationService } from '../../services/repoll-todos-notification.service'
import { of, throwError } from 'rxjs'
import { AlertService } from 'src/app/core/alert/alert.service'

@Component({ selector: 'app-todo-list-item', template: '' })
class TodoListItemStubComponent {
  @Input() todo
}

describe('TodoListComponent', () => {
  let component: TodoListComponent
  let fixture: ComponentFixture<TodoListComponent>

  let todoServiceSpy: { getTodos: jasmine.Spy }
  let alertServiceSpy: { error: jasmine.Spy }

  beforeEach(async(() => {
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['getTodos'])
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['error'])

    TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoListItemStubComponent],
      providers: [
        { provide: TodoService, useValue: todoServiceSpy },
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TodoListComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch todos on init', async(async () => {
    todoServiceSpy.getTodos.and.returnValue(of([]))

    await fixture.whenStable()
    fixture.detectChanges()

    expect(todoServiceSpy.getTodos).toHaveBeenCalled()
  }))

  it('should give an alert when observable throws error', async(async () => {
    todoServiceSpy.getTodos.and.returnValue(throwError('error'))

    await fixture.whenStable()
    fixture.detectChanges()

    expect(alertServiceSpy.error).toHaveBeenCalled()
  }))
})
