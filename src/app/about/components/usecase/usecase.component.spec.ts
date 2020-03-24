import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { Component } from '@angular/core'

import { UsecaseComponent } from './usecase.component'

@Component({
  selector: `app-host-component`,
  template: `
    <app-about-usecase [useCase]="input"></app-about-usecase>
  `
})
class TestHostComponent {
  input = {
    id: 'UC-01',
    name: 'Inloggen',
    description: 'Hiermee logt een bestaande gebruiker in.',
    scenario: [
      'Gebruiker vult email en password in en klikt op Login knop.',
      'De applicatie valideert de ingevoerde gegevens.',
      'Indien gegevens correct zijn dan redirect de applicatie naar het startscherm.'
    ],
    actor: 'Reguliere gebruiker',
    precondition: 'Geen',
    postcondition: 'De actor is ingelogd'
  }
}

describe('UsecaseComponent', () => {
  let testHostComponent: TestHostComponent
  let testHostFixture: ComponentFixture<TestHostComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsecaseComponent, TestHostComponent]
    }).compileComponents()
  }))

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent)
    testHostComponent = testHostFixture.componentInstance
    testHostFixture.detectChanges()
  })

  it('should create', () => {
    expect(testHostComponent).toBeTruthy()
  })
})
