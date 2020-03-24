import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WebsiteListComponent } from './website-list.component'
import { Component, Input } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { WebsiteService } from '../../services/website.service'
import { of } from 'rxjs'

@Component({ selector: 'app-website-list-item', template: '' })
class WebsiteListItemStubComponent {
  @Input() website
}

@Component({
  selector: `app-test-host-component`,
  template: `
    <app-website-list [filter]="filter"></app-website-list>
  `
})
class TestHostComponent {
  filter = ''
}

describe('WebsiteListComponent', () => {
  let component: TestHostComponent
  let fixture: ComponentFixture<TestHostComponent>

  let websiteServiceSpy: { getWebsites: jasmine.Spy }

  beforeEach(async(() => {
    websiteServiceSpy = jasmine.createSpyObj('WebsiteService', ['getWebsites'])

    TestBed.configureTestingModule({
      declarations: [TestHostComponent, WebsiteListComponent, WebsiteListItemStubComponent],
      providers: [{ provide: WebsiteService, useValue: websiteServiceSpy }]
    }).compileComponents()

    fixture = TestBed.createComponent(TestHostComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should fetch websites on init', async(async () => {
    websiteServiceSpy.getWebsites.and.returnValue(of([]))

    await fixture.whenStable()
    fixture.detectChanges()

    expect(websiteServiceSpy.getWebsites).toHaveBeenCalled()
  }))
})
