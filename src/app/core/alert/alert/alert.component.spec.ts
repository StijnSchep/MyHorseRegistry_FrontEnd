import { AlertComponent } from './alert.component'
import { ComponentFixture, async, TestBed } from '@angular/core/testing'
import { CommonModule } from '@angular/common'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { Router } from '@angular/router'
import { of } from 'rxjs'
import { AlertService } from '../alert.service'

describe('AlertComponent', () => {
  let component: AlertComponent
  let fixture: ComponentFixture<AlertComponent>

  let routerSpy: { navigateByUrl: jasmine.Spy; navigate: jasmine.Spy }
  let alertServiceSpy: { getMessage: jasmine.Spy }

  beforeEach(async(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate'])
    alertServiceSpy = jasmine.createSpyObj('AlertService', ['getMessage'])

    TestBed.configureTestingModule({
      declarations: [AlertComponent],
      imports: [CommonModule, NgbModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AlertService, useValue: alertServiceSpy }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(AlertComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should set alert', async(() => {
    alertServiceSpy.getMessage.and.returnValue(of({ type: 'success', message: 'test' }))

    fixture.whenStable().then(() => {
      fixture.detectChanges()
      expect(component).toBeTruthy()
      expect(component.alert.message).toEqual('test')
      expect(component.staticAlertClosed).toBe(false)
    })
  }))
})
