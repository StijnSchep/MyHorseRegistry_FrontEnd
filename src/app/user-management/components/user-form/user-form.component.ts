import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/auth/models/user.model'
import { UserService } from '../../services/user.service'
import { Router, ActivatedRoute } from '@angular/router'
import { AlertService } from 'src/app/core/alert/alert.service'

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  user = new User()

  roles = [
    {
      name: 'Adverteerder',
      role: 2
    },
    {
      name: 'Medewerker',
      role: 3
    }
  ]

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    this.userService.createUser(this.user).subscribe(
      data => {
        this.router.navigate(['..'], { relativeTo: this.route })
      },
      error => this.alertService.error('Error gevonden: ' + error)
    )
  }
}
