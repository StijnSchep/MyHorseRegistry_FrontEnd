import { TestBed, async, ComponentFixture } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { Component } from '@angular/core'

import { AppComponent } from './app.component'
import { CommonModule } from '@angular/common'

@Component({ selector: 'app-navbar', template: '' })
class NavbarStubComponent {}

@Component({ selector: 'app-alert', template: '' })
class AlertStubComponent {}

describe('AppComponent', () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, NgbModule],
      declarations: [AppComponent, NavbarStubComponent, AlertStubComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(AppComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create the app', () => {
    expect(component).toBeTruthy()
  })

  it(`should have as title 'MyHorseRegistry'`, () => {
    expect(component.title).toEqual('MyHorseRegistry')
  })
})
