import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'

import { TodoRootComponent } from './todo-root.component'

@Component({ selector: 'app-todo-tools', template: '' })
class TodoToolsStubComponent {}

@Component({ selector: 'app-todo-list', template: '' })
class TodoListStubComponent {}

describe('TodoRootComponent', () => {
  let component: TodoRootComponent
  let fixture: ComponentFixture<TodoRootComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TodoRootComponent, TodoToolsStubComponent, TodoListStubComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoRootComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})