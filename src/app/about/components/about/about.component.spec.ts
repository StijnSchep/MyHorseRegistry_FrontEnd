import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component, Input } from '@angular/core'
import { AboutComponent } from './about.component'

@Component({ selector: 'app-about-entity', template: '' })
class EntityStubComponent {}

@Component({ selector: 'app-about-usecase', template: '' })
class UsecaseStubComponent {
  @Input() useCase
}

describe('AboutComponent', () => {
  let component: AboutComponent
  let fixture: ComponentFixture<AboutComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent, EntityStubComponent, UsecaseStubComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
