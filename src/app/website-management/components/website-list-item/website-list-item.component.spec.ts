import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { WebsiteListItemComponent } from './website-list-item.component'
import { RouterTestingModule } from '@angular/router/testing'
import { Component } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { of } from 'rxjs'
import { Website } from '../../models/website.model'
import { Horse } from 'src/app/horse-management/models/horse.model'
import { AuthService } from 'src/app/auth/services/auth.service'

@Component({
  selector: `app-test-host-component`,
  template: `
    <app-website-list-item [website]="input"></app-website-list-item>
  `
})
class TestHostComponent {
  input = {
    _id: '3r3ef',
    name: 'facebook',
    URL: 'www.facebook.com',
    monthlyPrice: 0,
    pricePerAd: 0,
    horses: []
  }
}

describe('WebsiteListItemComponent', () => {
  let component: TestHostComponent
  let fixture: ComponentFixture<TestHostComponent>

  let authServiceSpy: { userIsEmployee: jasmine.Spy }

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['userIsEmployee'])

    TestBed.configureTestingModule({
      declarations: [WebsiteListItemComponent, TestHostComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
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

  it('should not show delete option if user is employee', async(async () => {
    authServiceSpy.userIsEmployee.and.returnValue(of(true))

    await fixture.whenStable()
    fixture.detectChanges()

    let trashElement = fixture.debugElement.nativeElement.querySelector('.fa-trash')

    expect(trashElement).toBeFalsy()
  }))

  it('should show delete option if user is not employee', async(async () => {
    authServiceSpy.userIsEmployee.and.returnValue(of(false))

    await fixture.whenStable()
    fixture.detectChanges()

    let trashElement = fixture.debugElement.nativeElement.querySelector('.fa-trash')

    expect(trashElement).toBeTruthy()
  }))

  it('should list website as incorrect if it has a non-active horse', async(async () => {
    let testWebsite = new Website()
    testWebsite.URL = 'www.google.com'
    testWebsite.horses = [new Horse({ status: 'Verkocht' })]

    component.input = testWebsite

    await fixture.whenStable()
    fixture.detectChanges()

    let falseElement = fixture.debugElement.nativeElement.querySelector('.is-incorrect')

    expect(falseElement).toBeTruthy()
  }))

  it('should list website as correct if it has a only an active horse', async(async () => {
    let testWebsite = new Website()
    testWebsite.URL = 'www.google.com'
    testWebsite.horses = [new Horse({ status: 'Actief' })]

    component.input = testWebsite

    await fixture.whenStable()
    fixture.detectChanges()

    let falseElement = fixture.debugElement.nativeElement.querySelector('.is-incorrect')

    expect(falseElement).toBeFalsy()
  }))
})
