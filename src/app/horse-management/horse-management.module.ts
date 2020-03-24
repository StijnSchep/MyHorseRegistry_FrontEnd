import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HorseRoutingModule } from './horse-routing.module'
import { HorseListComponent } from './components/horse-list/horse-list.component'
import { HorseListItemComponent } from './components/horse-list-item/horse-list-item.component'
import { HorseRootComponent } from './components/horse-root/horse-root.component'
import { HorseListToolsComponent } from './components/horse-list-tools/horse-list-tools.component'
import { HorseFormComponent } from './components/horse-form/horse-form.component'
import { HorseDeleteComponent } from './components/horse-delete/horse-delete.component'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    HorseRootComponent,
    HorseListComponent,
    HorseListItemComponent,
    HorseListToolsComponent,
    HorseFormComponent,
    HorseDeleteComponent
  ],
  imports: [CommonModule, HorseRoutingModule, RouterModule, FormsModule]
})
export class HorseManagementModule {}
