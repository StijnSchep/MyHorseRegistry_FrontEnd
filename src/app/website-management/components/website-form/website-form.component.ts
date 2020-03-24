import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { WebsiteService } from '../../services/website.service'
import { map, tap } from 'rxjs/operators'
import { Website } from '../../models/website.model'

@Component({
  selector: 'app-website-form',
  templateUrl: './website-form.component.html',
  styleUrls: ['./website-form.component.scss']
})
export class WebsiteFormComponent implements OnInit {
  website: Website
  title: string
  editMode: boolean
  id: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private websiteService: WebsiteService
  ) {}

  ngOnInit() {
    this.title = this.route.snapshot.data['title'] || 'Paard aanpassen'
    this.editMode = this.route.snapshot.data['websiteAlreadyExists'] || false

    if (this.editMode) {
      // Get website from websiteService
      this.route.params
        .pipe(
          map(params => params['id']),
          tap(id => (this.id = id))
        )
        .subscribe(
          id => {
            // make local copy of user - detached from original array
            this.website = this.websiteService.getWebsite(this.id)
          },
          err => console.log('We hebben een fout', err)
        )
    } else {
      this.website = new Website()
    }
  }

  onSubmit() {
    if (this.editMode) {
      // Website should be updated
      this.websiteService.updateWebsite(this.website).subscribe(
        data => {
          this.router.navigate(['../..'], { relativeTo: this.route })
        },
        error => console.error(error)
      )
    } else {
      // Website should be created
      this.websiteService.createWebsite(this.website).subscribe(
        data => {
          this.router.navigate(['..'], { relativeTo: this.route })
        },
        error => console.error(error)
      )
    }
  }
}
