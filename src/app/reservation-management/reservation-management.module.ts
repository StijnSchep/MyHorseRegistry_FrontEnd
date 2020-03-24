import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ReservationRoutingModule } from './reservation-routing.module'
import { ReservationRootComponent } from './components/reservation-root/reservation-root.component'
import { ReservationListComponent } from './components/reservation-list/reservation-list.component'
import { ReservationListItemComponent } from './components/reservation-list-item/reservation-list-item.component'
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component'
import { ReservationDeleteComponent } from './components/reservation-delete/reservation-delete.component'
import { ReservationListToolsComponent } from './components/reservation-list-tools/reservation-list-tools.component'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    ReservationRootComponent,
    ReservationListComponent,
    ReservationListItemComponent,
    ReservationFormComponent,
    ReservationDeleteComponent,
    ReservationListToolsComponent
  ],
  imports: [CommonModule, ReservationRoutingModule, HttpClientModule, FormsModule]
})
export class ReservationManagementModule {}
