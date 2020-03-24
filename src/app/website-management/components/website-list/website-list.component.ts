import { Component, OnInit, Input, OnChanges } from '@angular/core'
import { Website } from '../../models/website.model'
import { WebsiteService } from '../../services/website.service'
import { Subscription } from 'rxjs'
import { RepollWebsitesNotificationService } from '../../services/repoll-websites-notification.service'

@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.scss']
})
export class WebsiteListComponent implements OnInit, OnChanges {
  @Input() filter
  private repollSubscription: Subscription
  websitesFetched = false
  websites: Array<Website>
  filterWebsites: Array<Website>

  constructor(private websiteService: WebsiteService, private repollSvc: RepollWebsitesNotificationService) {}

  ngOnInit() {
    this.repollSubscription = this.repollSvc.obs.subscribe(() => this.fetchWebsites())
    this.fetchWebsites()
  }

  ngOnChanges() {
    if (!this.filter || this.filter === '') {
      this.filterWebsites = this.websites
    } else {
      this.filterWebsites = this.websites.filter(website =>
        website.horses.find(
          horse =>
            horse.officialName.toLowerCase().includes(this.filter.toLowerCase()) ||
            horse.commonName.toLowerCase().includes(this.filter.toLowerCase())
        )
      )
    }
  }

  private fetchWebsites() {
    this.websiteService.getWebsites().subscribe(
      websites => {
        this.websites = websites
        this.filterWebsites = websites
        this.websitesFetched = true
      },
      error => console.log('Doe iets met deze error : ' + error)
    )
  }
}
