import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { HorseListItemComponent } from './horse-list-item.component'
import { Component } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { RouterTestingModule } from '@angular/router/testing'
import { AuthService } from 'src/app/auth/services/auth.service'
import { of } from 'rxjs'

@Component({
  selector: `app-test-host-component`,
  template: `
    <app-horse-list-item [horse]="input"></app-horse-list-item>
  `
})
class TestHostComponent {
  input = {
    commonName: 'Horsy',
    color: 'zwart',
    gender: 'ruin',
    description: 'Beschrijving',
    officialName: 'Horsalot',
    title: 'Een lief paard',
    date_sold: '2019-11-30T18:31:34.717Z',
    date_added: '2019-11-30T18:31:34.717Z',
    price: 4300,
    _id: 'a335eed0-139f-11ea-9567-679b2ca6bac5',
    category: 'dressuur',
    status: 'Actief',
    height: 172,
    yearOfBirth: 2005
  }
}

describe('HorseListItemComponent', () => {
  let component: TestHostComponent
  let fixture: ComponentFixture<TestHostComponent>

  let authServiceSpy: { userIsEmployee: jasmine.Spy }

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['userIsEmployee'])
    TestBed.configureTestingModule({
      declarations: [HorseListItemComponent, TestHostComponent],
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

  it('should not show edit and delete options when user is employee', async(async () => {
    authServiceSpy.userIsEmployee.and.returnValue(of(true))

    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    let crudOptions = fixture.debugElement.nativeElement.querySelector('.crud-options')
    expect(crudOptions).toBeFalsy()
  }))

  it('should show edit and delete options when user is not employee', async(async () => {
    authServiceSpy.userIsEmployee.and.returnValue(of(false))

    fixture.detectChanges()
    await fixture.whenStable()
    fixture.detectChanges()

    let editElement = fixture.debugElement.nativeElement.querySelector('.fa-edit')
    let deleteElement = fixture.debugElement.nativeElement.querySelector('.fa-trash')
    expect(editElement).toBeTruthy()
    expect(deleteElement).toBeTruthy()
  }))
})
