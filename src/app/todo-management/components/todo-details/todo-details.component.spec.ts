import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { TodoDetailsComponent } from './todo-details.component'
import { HttpClientModule } from '@angular/common/http'
import { ActivatedRoute } from '@angular/router'
import { TodoService } from '../../services/todo.service'
import { Todo } from '../../models/todo.model'
import { of } from 'rxjs'

describe('TodoDetailsComponent', () => {
  let component: TodoDetailsComponent
  let fixture: ComponentFixture<TodoDetailsComponent>

  let todoServiceSpy: { getTodo: jasmine.Spy }

  beforeEach(async(() => {
    todoServiceSpy = jasmine.createSpyObj('TodoService', ['getTodo'])

    TestBed.configureTestingModule({
      declarations: [TodoDetailsComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' })
          }
        },
        { provide: TodoService, useValue: todoServiceSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TodoDetailsComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch todo on init', async(async () => {
    todoServiceSpy.getTodo.and.returnValue(new Todo())

    await fixture.whenStable()
    fixture.detectChanges()

    expect(todoServiceSpy.getTodo).toHaveBeenCalled()
  }))
})
