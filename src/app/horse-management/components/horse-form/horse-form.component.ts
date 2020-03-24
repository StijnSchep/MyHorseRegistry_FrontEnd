import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { Horse } from '../../models/horse.model'
import { HorseService } from '../../services/horse.service'
import { map, tap } from 'rxjs/operators'

@Component({
  selector: 'app-horse-form',
  templateUrl: './horse-form.component.html',
  styleUrls: ['./horse-form.component.scss']
})
export class HorseFormComponent implements OnInit {
  title: string
  editMode: boolean
  id: string
  year: string

  horse: Horse

  categories = ['dressuur', 'springen', 'recreatief', 'mennen']
  statuslist = ['Actief', 'Gereserveerd', 'Verkocht']
  genderlist = ['hengst', 'merrie', 'ruin']
  colors = [
    'Appaloosa',
    'Appelschimmel',
    'Blauwschimmel',
    'Bruin',
    'Cremello',
    'Donkerbruin',
    'Donkere-vos',
    'Bont',
    'Schimmel',
    'Vliegenschimmel',
    'Vos',
    'Wit',
    'Zwart',
    'Zwartbruin'
  ]

  get yearList(): Array<number> {
    let currentYear = new Date().getFullYear()
    let response = []
    for (var i = 0; i < 70; i++) {
      response.push(currentYear)
      currentYear--
    }

    return response
  }

  constructor(private route: ActivatedRoute, private router: Router, private horseService: HorseService) {}

  ngOnInit() {
    this.title = this.route.snapshot.data['title'] || 'Paard aanpassen'
    this.editMode = this.route.snapshot.data['horseAlreadyExists'] || false
    if (this.editMode) {
      // Get horse from horseService
      this.route.params
        .pipe(
          map(params => params['id']),
          tap(id => (this.id = id))
        )
        .subscribe(
          id => {
            // make local copy of user - detached from original array
            this.horse = this.horseService.getHorse(this.id)
          },
          err => console.log('We hebben een fout', err)
        )
    } else {
      this.horse = new Horse()
      this.horse.status = 'Actief'
    }
  }

  onSubmit() {
    this.horse.yearOfBirth = parseInt(this.year)
    if (this.editMode) {
      // Horse should be updated
      this.horseService.updateHorse(this.horse).subscribe(
        data => {
          this.router.navigate(['../..'], { relativeTo: this.route })
        },
        error => console.error(error)
      )
    } else {
      // Horse should be created
      this.horseService.createHorse(this.horse).subscribe(
        data => {
          this.router.navigate(['..'], { relativeTo: this.route })
        },
        error => console.error(error)
      )
    }
  }
}
