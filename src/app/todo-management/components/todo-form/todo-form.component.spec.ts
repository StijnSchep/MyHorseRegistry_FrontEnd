import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { TodoFormComponent } from './todo-form.component'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { Router, ActivatedRoute } from '@angular/router'
import { TodoService } from '../../services/todo.service'
import { of } from 'rxjs'
import { Todo } from '../../models/todo.model'

describe('TodoFormComponent', () => {
  let component: TodoFormComponent
  let fixture: ComponentFixture<TodoFormComponent>

  let routerSpy: { navigate: jasmine.Spy }
  let todoServiceSpy: { getTodo: jasmine.Spy; updateTodo: jasmine.Spy; createTodo: jasmine.Spy }

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate'])
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['getTodo', 'updateTodo', 'createTodo'])

    TestBed.configureTestingModule({
      declarations: [TodoFormComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            snapshot: {
              data: {
                todoAlreadyExists: true
              }
            }
          }
        },
        { provide: Router, useValue: routerSpy },
        { provide: TodoService, useValue: todoServiceSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TodoFormComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch existing todo when in editmode', async(async () => {
    todoServiceSpy.getTodo.and.returnValue(new Todo({ content: 'test' }))

    await fixture.whenStable()
    fixture.detectChanges()

    expect(todoServiceSpy.getTodo).toHaveBeenCalled()
    expect(component.todo.content).toEqual('test')
  }))

  it('should call updateTodo when in editmode', async(async () => {
    todoServiceSpy.getTodo.and.returnValue(new Todo({ content: 'test' }))
    todoServiceSpy.updateTodo.and.returnValue(of(true))
    todoServiceSpy.createTodo.and.returnValue(of(true))

    await fixture.whenStable()
    fixture.detectChanges()

    component.onSubmit()

    await fixture.whenStable()
    fixture.detectChanges()

    expect(todoServiceSpy.updateTodo).toHaveBeenCalled()
    expect(todoServiceSpy.createTodo).not.toHaveBeenCalled()
  }))

  it('should create new todo when not in editmode', async(async () => {
    todoServiceSpy.getTodo.and.returnValue(new Todo({ content: 'test' }))
    let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.snapshot.data.todoAlreadyExists = false
    component.ngOnInit()

    await fixture.whenStable()
    fixture.detectChanges()

    expect(todoServiceSpy.getTodo).not.toHaveBeenCalled()
    expect(component.todo).toBeTruthy()
    expect(component.todo.content).not.toEqual('test')
  }))

  it('should call createTodo when not in editmode', async(async () => {
    todoServiceSpy.getTodo.and.returnValue(new Todo({ content: 'test' }))
    todoServiceSpy.createTodo.and.returnValue(of(true))
    todoServiceSpy.updateTodo.and.returnValue(of(true))
    let activatedRoute = fixture.debugElement.injector.get(ActivatedRoute)
    activatedRoute.snapshot.data.todoAlreadyExists = false
    component.ngOnInit()

    await fixture.whenStable()
    fixture.detectChanges()

    component.onSubmit()

    await fixture.whenStable()
    fixture.detectChanges()

    expect(todoServiceSpy.updateTodo).not.toHaveBeenCalled()
    expect(todoServiceSpy.createTodo).toHaveBeenCalled()
  }))
})
