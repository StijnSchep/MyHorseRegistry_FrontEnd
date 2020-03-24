import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { HorseRootComponent } from './horse-root.component'
import { RouterTestingModule } from '@angular/router/testing'

describe('HorseRootComponent', () => {
  let component: HorseRootComponent
  let fixture: ComponentFixture<HorseRootComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HorseRootComponent],
      imports: [RouterTestingModule]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(HorseRootComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
