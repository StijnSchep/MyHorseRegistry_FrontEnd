import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { HorseRootComponent } from './components/horse-root/horse-root.component'
import { HorseListComponent } from './components/horse-list/horse-list.component'
import { HorseFormComponent } from './components/horse-form/horse-form.component'
import { HorseDeleteComponent } from './components/horse-delete/horse-delete.component'

const routes: Routes = [
  {
    path: '',
    component: HorseRootComponent,
    children: [
      {
        path: '',
        component: HorseListComponent
      },
      {
        path: 'list',
        component: HorseListComponent
      },
      {
        path: 'new',
        component: HorseFormComponent,
        data: {
          horseAlreadyExists: false,
          title: 'Nieuw paard'
        }
      },
      {
        path: ':id/edit',
        component: HorseFormComponent,
        data: {
          horseAlreadyExists: true,
          title: 'Paard aanpassen'
        }
      },
      {
        path: ':id/delete',
        component: HorseDeleteComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorseRoutingModule {}
