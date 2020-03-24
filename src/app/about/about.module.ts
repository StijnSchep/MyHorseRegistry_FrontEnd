import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AboutComponent } from './components/about/about.component'
import { EntityComponent } from './components/entity/entity.component'
import { UsecaseComponent } from './components/usecase/usecase.component'

import { AboutRoutingModule } from './about-routing.module'

@NgModule({
  declarations: [AboutComponent, EntityComponent, UsecaseComponent],
  imports: [CommonModule, AboutRoutingModule]
})
export class AboutModule {}
