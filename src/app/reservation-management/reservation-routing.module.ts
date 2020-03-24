import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ReservationRootComponent } from './components/reservation-root/reservation-root.component'
import { ReservationListComponent } from './components/reservation-list/reservation-list.component'
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component'
import { ReservationDeleteComponent } from './components/reservation-delete/reservation-delete.component'

const routes: Routes = [
  {
    path: '',
    component: ReservationRootComponent,
    children: [
      {
        path: '',
        component: ReservationListComponent
      },
      {
        path: 'list',
        component: ReservationListComponent
      },
      {
        path: 'new',
        component: ReservationFormComponent,
        data: {
          reservationAlreadyExists: false,
          title: 'Nieuwe reservering'
        }
      },
      {
        path: ':id/edit',
        component: ReservationFormComponent,
        data: {
          reservationAlreadyExists: true,
          title: 'Reservering aanpassen'
        }
      },
      {
        path: ':id/delete',
        component: ReservationDeleteComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationRoutingModule {}
