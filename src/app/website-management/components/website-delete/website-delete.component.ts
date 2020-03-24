import { Component, OnInit } from '@angular/core'
import { Website } from '../../models/website.model'
import { ActivatedRoute, Router } from '@angular/router'
import { WebsiteService } from '../../services/website.service'
import { map, tap } from 'rxjs/operators'
import { AlertService } from 'src/app/core/alert/alert.service'

@Component({
  selector: 'app-website-delete',
  templateUrl: './website-delete.component.html',
  styleUrls: ['./website-delete.component.scss']
})
export class WebsiteDeleteComponent implements OnInit {
  website: Website
  id: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private websiteService: WebsiteService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => params['id']),
        tap(id => (this.id = id))
      )
      .subscribe(
        id => {
          this.website = this.websiteService.getWebsite(id)
        },
        err => console.log('We hebben een fout', err)
      )
  }

  onDelete() {
    this.websiteService.deleteWebsite(this.website).subscribe(
      data => {
        this.router.navigate(['../..'], { relativeTo: this.route })
      },
      error => this.alertService.error('Deze website bevat nog paarden en kan niet verwijderd worden')
    )
  }

  onCancel() {
    this.router.navigate(['../..'], { relativeTo: this.route })
  }
}
