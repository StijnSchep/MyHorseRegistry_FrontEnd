import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LoginComponent } from '../auth/components/login/login.component'

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'horses',
    loadChildren: () =>
      import('../horse-management/horse-management.module').then(mod => mod.HorseManagementModule)
  },
  {
    path: 'websites',
    loadChildren: () =>
      import('../website-management/website-management.module').then(mod => mod.WebsiteManagementModule)
  },
  {
    path: 'reservations',
    loadChildren: () =>
      import('../reservation-management/reservation-management.module').then(
        mod => mod.ReservationManagementModule
      )
  },
  {
    path: 'todo',
    loadChildren: () =>
      import('../todo-management/todo-management.module').then(mod => mod.TodoManagementModule)
  },
  {
    path: 'users',
    loadChildren: () =>
      import('../user-management/user-management.module').then(mod => mod.UserManagementModule)
  },
  {
    path: 'about',
    loadChildren: () => import('../about/about.module').then(mod => mod.AboutModule)
  },
  {
    path: '',
    redirectTo: 'horses',
    pathMatch: 'full'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
