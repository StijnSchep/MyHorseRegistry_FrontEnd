import { Component, OnInit, OnDestroy } from '@angular/core'
import { HorseService } from 'src/app/horse-management/services/horse.service'
import { Horse } from 'src/app/horse-management/models/horse.model'
import { RepollHorsesNotificationService } from 'src/app/horse-management/services/repoll-horses-notification.service'
import { Subscription } from 'rxjs'
import { WebsiteService } from '../../services/website.service'
import { ActivatedRoute, Router } from '@angular/router'
import { map, tap } from 'rxjs/operators'
import { AlertService } from 'src/app/core/alert/alert.service'
import { Website } from '../../models/website.model'

@Component({
  selector: 'app-website-horse-selector',
  templateUrl: './website-horse-selector.component.html',
  styleUrls: ['./website-horse-selector.component.scss']
})
export class WebsiteHorseSelectorComponent implements OnInit, OnDestroy {
  private repollSubscription: Subscription
  private horseFetchSubscription: Subscription
  horses: Array<Horse>
  selectedHorseId: string
  website: Website
  id: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private horseService: HorseService,
    private websiteService: WebsiteService,
    private repollSvc: RepollHorsesNotificationService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.repollSubscription = this.repollSvc.obs.subscribe(() => this.fetchHorses())
    this.route.params.pipe(map(params => params['id'])).subscribe(
      id => {
        this.id = id
        this.website = this.websiteService.getWebsite(id)
        this.fetchHorses()
      },
      err => console.log('We hebben een fout', err)
    )
  }

  ngOnDestroy() {
    if (this.repollSubscription) {
      this.repollSubscription.unsubscribe()
    }

    if (this.horseFetchSubscription) {
      this.horseFetchSubscription.unsubscribe()
    }
  }

  private fetchHorses() {
    this.horseFetchSubscription = this.horseService.getHorses().subscribe(
      horses => {
        this.horses = horses.filter(
          horse =>
            horse.status === 'Actief' &&
            !horse.active_reservation &&
            !this.website.horses.find(foundHorse => foundHorse._id === horse._id)
        )
      },
      error => console.log('Doe iets met deze error : ' + error)
    )
  }

  onSubmit() {
    this.websiteService.addHorse(this.id, this.selectedHorseId).subscribe(
      data => {
        this.router.navigate(['../..'], { relativeTo: this.route })
      },
      error => this.alertService.error('Dit paard kon niet worden toegevoegd')
    )
  }
}
