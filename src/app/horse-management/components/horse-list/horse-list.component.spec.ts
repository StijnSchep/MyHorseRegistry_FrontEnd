import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { HorseListComponent } from './horse-list.component'
import { Component, Input } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'
import { HorseService } from '../../services/horse.service'
import { of } from 'rxjs'

@Component({ selector: 'app-horse-list-item', template: '' })
class HorseListItemStubComponent {
  @Input() horse
}

@Component({ selector: 'app-horse-list-tools', template: '' })
class HorseListToolsStubComponent {}

describe('HorseListComponent', () => {
  let component: HorseListComponent
  let fixture: ComponentFixture<HorseListComponent>

  let horseServiceSpy: { getHorses: jasmine.Spy }

  beforeEach(async(() => {
    horseServiceSpy = jasmine.createSpyObj('HorseService', ['getHorses'])

    TestBed.configureTestingModule({
      declarations: [HorseListComponent, HorseListItemStubComponent, HorseListToolsStubComponent],
      providers: [{ provide: HorseService, useValue: horseServiceSpy }]
    }).compileComponents()

    fixture = TestBed.createComponent(HorseListComponent)
    component = fixture.componentInstance
  }))

  afterEach(() => {
    fixture.destroy()
  })

  it('should create', async(() => {
    horseServiceSpy.getHorses.and.returnValue(of([]))

    fixture.whenStable().then(() => {
      fixture.detectChanges()
      expect(component).toBeTruthy()
      expect(horseServiceSpy.getHorses).toHaveBeenCalled()
    })
  }))
})
