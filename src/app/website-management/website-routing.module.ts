import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { WebsiteRootComponent } from './components/website-root/website-root.component'
import { WebsiteFormComponent } from './components/website-form/website-form.component'
import { WebsiteDetailsComponent } from './components/website-details/website-details.component'
import { WebsiteDeleteComponent } from './components/website-delete/website-delete.component'
import { WebsiteHorseSelectorComponent } from './components/website-horse-selector/website-horse-selector.component'

const routes: Routes = [
  {
    path: '',
    component: WebsiteRootComponent,
    children: [
      {
        path: '',
        component: null
      },
      {
        path: 'new',
        component: WebsiteFormComponent,
        data: {
          websiteAlreadyExists: false,
          title: 'Nieuwe website'
        }
      },
      {
        path: ':id',
        component: WebsiteDetailsComponent
      },
      {
        path: ':id/edit',
        component: WebsiteFormComponent,
        data: {
          websiteAlreadyExists: true,
          title: 'Website aanpassen'
        }
      },
      {
        path: ':id/delete',
        component: WebsiteDeleteComponent
      },
      {
        path: ':id/horse',
        component: WebsiteHorseSelectorComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule {}
