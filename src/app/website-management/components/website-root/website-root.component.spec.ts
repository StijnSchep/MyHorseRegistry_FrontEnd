import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WebsiteRootComponent } from './website-root.component'
import { Component, Input, Output, EventEmitter } from '@angular/core'
import { RouterTestingModule } from '@angular/router/testing'

@Component({ selector: 'app-website-list', template: '' })
class WebsiteListStubComponent {
  @Input() filter
}

@Component({ selector: 'app-website-list-tools', template: '' })
class WebsiteListToolsStubComponent {
  @Output() filter = new EventEmitter()
}

describe('WebsiteRootComponent', () => {
  let component: WebsiteRootComponent
  let fixture: ComponentFixture<WebsiteRootComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WebsiteRootComponent, WebsiteListStubComponent, WebsiteListToolsStubComponent],
      imports: [RouterTestingModule]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteRootComponent)
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
