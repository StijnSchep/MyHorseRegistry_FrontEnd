import { NgModule } from '@angular/core'
import { UserRootComponent } from './components/user-root/user-root.component'
import { CommonModule } from '@angular/common'
import { UserRoutingModule } from './user-routing.module'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { UserListComponent } from './components/user-list/user-list.component'
import { UserFormComponent } from './components/user-form/user-form.component'

@NgModule({
  declarations: [UserRootComponent, UserListComponent, UserFormComponent],
  imports: [CommonModule, UserRoutingModule, RouterModule, FormsModule]
})
export class UserManagementModule {}
