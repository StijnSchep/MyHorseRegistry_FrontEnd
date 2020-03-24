import { Component, OnInit } from '@angular/core'
import { Horse } from '../../models/horse.model'
import { ActivatedRoute, Router } from '@angular/router'
import { HorseService } from '../../services/horse.service'
import { map, tap } from 'rxjs/operators'
import { AlertService } from 'src/app/core/alert/alert.service'

@Component({
  selector: 'app-horse-delete',
  templateUrl: './horse-delete.component.html',
  styleUrls: ['./horse-delete.component.scss']
})
export class HorseDeleteComponent implements OnInit {
  id: string

  horse: Horse

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private horseService: HorseService,
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
          this.horse = this.horseService.getHorse(this.id)
        },
        err => {
          console.log('got an error!')
          this.alertService.error('Error, kon paard niet ophalen')
        }
      )
  }

  get name() {
    if (this.horse) {
      return this.horse.officialName
    } else {
      return '---'
    }
  }

  onCancel() {
    this.router.navigate(['../..'], { relativeTo: this.route })
  }

  onDelete() {
    this.horseService.deleteHorse(this.horse).subscribe(
      data => {
        this.router.navigate(['../..'], { relativeTo: this.route })
      },
      error => {
        this.alertService.error(
          'Dit paard wordt nog op een website geadverteerd en kan niet verwijderd worden'
        )
      }
    )
  }
}
