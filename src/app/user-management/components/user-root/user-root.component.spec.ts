import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { UserRootComponent } from './user-root.component'
import { RouterTestingModule } from '@angular/router/testing'

describe('UserRootComponent', () => {
  let component: UserRootComponent
  let fixture: ComponentFixture<UserRootComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserRootComponent],
      imports: [RouterTestingModule]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRootComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
