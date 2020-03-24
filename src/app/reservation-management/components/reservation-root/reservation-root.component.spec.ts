import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { ReservationRootComponent } from './reservation-root.component'
import { RouterTestingModule } from '@angular/router/testing'

describe('ReservationRootComponent', () => {
  let component: ReservationRootComponent
  let fixture: ComponentFixture<ReservationRootComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationRootComponent],
      imports: [RouterTestingModule]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationRootComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
