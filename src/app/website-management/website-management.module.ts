import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { WebsiteRoutingModule } from './website-routing.module'
import { WebsiteRootComponent } from './components/website-root/website-root.component'
import { WebsiteListComponent } from './components/website-list/website-list.component'
import { WebsiteListItemComponent } from './components/website-list-item/website-list-item.component'
import { WebsiteDetailsComponent } from './components/website-details/website-details.component'
import { WebsiteFormComponent } from './components/website-form/website-form.component'
import { WebsiteDeleteComponent } from './components/website-delete/website-delete.component'
import { WebsiteHorseSelectorComponent } from './components/website-horse-selector/website-horse-selector.component'
import { WebsiteListToolsComponent } from './components/website-list-tools/website-list-tools.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    WebsiteRootComponent,
    WebsiteListComponent,
    WebsiteListItemComponent,
    WebsiteDetailsComponent,
    WebsiteFormComponent,
    WebsiteDeleteComponent,
    WebsiteHorseSelectorComponent,
    WebsiteListToolsComponent
  ],
  imports: [CommonModule, WebsiteRoutingModule, FormsModule]
})
export class WebsiteManagementModule {}
