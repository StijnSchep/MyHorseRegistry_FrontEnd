import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { WebsiteService } from '../../services/website.service'
import { map, tap } from 'rxjs/operators'
import { Website } from '../../models/website.model'
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/auth/services/auth.service'

@Component({
  selector: 'app-website-details',
  templateUrl: './website-details.component.html',
  styleUrls: ['./website-details.component.scss']
})
export class WebsiteDetailsComponent implements OnInit {
  isEmployee$: Observable<boolean>
  website: Website
  id: string
  URL: string

  constructor(
    private route: ActivatedRoute,
    private websiteService: WebsiteService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isEmployee$ = this.authService.userIsEmployee()
    this.route.params
      .pipe(
        map(params => params['id']),
        tap(id => (this.id = id))
      )
      .subscribe(
        id => {
          this.website = this.websiteService.getWebsite(id)
          if (this.website.URL.substr(0, 4) != 'http') {
            this.URL = 'https://' + this.website.URL
          } else {
            this.URL = this.website.URL
          }
        },
        err => console.log('We hebben een fout', err)
      )
  }

  onDeleteHorse(_id: string) {
    this.websiteService.removeHorse(this.id, _id).subscribe(
      data => {
        this.website.horses = this.website.horses.filter(horse => horse._id != _id)
      },
      error => console.log(error)
    )
  }
}
