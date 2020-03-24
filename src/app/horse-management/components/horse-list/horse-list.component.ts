import { Component, OnInit, OnDestroy } from '@angular/core'
import { Horse } from '../../models/horse.model'
import { HorseService } from '../../services/horse.service'
import { RepollHorsesNotificationService } from '../../services/repoll-horses-notification.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-horse-list',
  templateUrl: './horse-list.component.html'
})
export class HorseListComponent implements OnInit, OnDestroy {
  private repollSubscription: Subscription
  horses: Array<Horse>

  constructor(private horseService: HorseService, private repollSvc: RepollHorsesNotificationService) {}

  ngOnInit() {
    this.repollSubscription = this.repollSvc.obs.subscribe(() => this.fetchHorses())
    this.fetchHorses()
  }

  ngOnDestroy() {
    if (this.repollSubscription) {
      this.repollSubscription.unsubscribe()
    }
  }

  private fetchHorses() {
    this.horseService.getHorses().subscribe(horses => {
      this.horses = horses
    })
  }
}
