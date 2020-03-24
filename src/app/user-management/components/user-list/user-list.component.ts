import { Component, OnInit, OnDestroy } from '@angular/core'
import { User } from 'src/app/auth/models/user.model'
import { Subscription } from 'rxjs'
import { UserService } from '../../services/user.service'
import { RepollUsersNotificationService } from '../../services/repoll-users-notification.service'
import { AlertService } from 'src/app/core/alert/alert.service'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  private repollSubscription: Subscription
  users: Array<User>

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private repollSvc: RepollUsersNotificationService
  ) {}

  ngOnInit() {
    this.repollSubscription = this.repollSvc.obs.subscribe(() => this.fetchUsers())
    this.fetchUsers()
  }

  ngOnDestroy() {
    if (this.repollSubscription) {
      this.repollSubscription.unsubscribe()
    }
  }

  private fetchUsers() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users
      },
      error => this.alertService.error('Kon geen gebruikers ophalen')
    )
  }

  deleteUser(user: User) {
    this.userService.deleteUser(user).subscribe(
      data => {
        this.alertService.success('Gebruiker is verwijderd')
      },
      error => this.alertService.error('Kon gebruiker niet verwijderen')
    )
  }
}
