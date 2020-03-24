import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { UserRootComponent } from './components/user-root/user-root.component'
import { AdminGuard } from '../auth/services/admin.guard'
import { UserListComponent } from './components/user-list/user-list.component'
import { UserFormComponent } from './components/user-form/user-form.component'

const routes: Routes = [
  {
    path: '',
    component: UserRootComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'list',
        component: UserListComponent
      },
      {
        path: 'new',
        component: UserFormComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  providers: [AdminGuard],
  exports: [RouterModule]
})
export class UserRoutingModule {}
