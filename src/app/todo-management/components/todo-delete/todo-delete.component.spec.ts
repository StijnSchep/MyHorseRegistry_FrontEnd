import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'

import { TodoDeleteComponent } from './todo-delete.component'
import { Router, ActivatedRoute } from '@angular/router'
import { TodoService } from '../../services/todo.service'
import { of } from 'rxjs'
import { Todo } from '../../models/todo.model'

describe('TodoDeleteComponent', () => {
  let component: TodoDeleteComponent
  let fixture: ComponentFixture<TodoDeleteComponent>

  let routerSpy: { navigate: jasmine.Spy }
  let todoServiceSpy: { deleteTodo: jasmine.Spy; getTodo: jasmine.Spy }

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['deleteTodo', 'getTodo'])

    TestBed.configureTestingModule({
      declarations: [TodoDeleteComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: TodoService, useValue: todoServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' })
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TodoDeleteComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch a todo on init', async(async () => {
    todoServiceSpy.getTodo.and.returnValue(new Todo())

    await fixture.whenStable()
    fixture.detectChanges()

    expect(todoServiceSpy.getTodo).toHaveBeenCalled()
  }))

  it('should navigate after deleting todo', async(async () => {
    todoServiceSpy.getTodo.and.returnValue(new Todo())
    todoServiceSpy.deleteTodo.and.returnValue(of(true))

    await fixture.whenStable()
    fixture.detectChanges()

    component.onDelete()

    await fixture.whenStable()
    fixture.detectChanges()

    expect(todoServiceSpy.getTodo).toHaveBeenCalled()
    expect(todoServiceSpy.deleteTodo).toHaveBeenCalled()
    expect(routerSpy.navigate).toHaveBeenCalled()
  }))
})
