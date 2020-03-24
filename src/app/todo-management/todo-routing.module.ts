import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { TodoRootComponent } from './components/todo-root/todo-root.component'
import { TodoDetailsComponent } from './components/todo-details/todo-details.component'
import { TodoFormComponent } from './components/todo-form/todo-form.component'
import { TodoDeleteComponent } from './components/todo-delete/todo-delete.component'

const routes: Routes = [
  {
    path: '',
    component: TodoRootComponent,
    children: [
      {
        path: '',
        component: null
      },
      {
        path: 'new',
        component: TodoFormComponent,
        data: {
          todoAlreadyExists: false,
          title: 'Nieuwe Todo'
        }
      },
      {
        path: ':id',
        component: TodoDetailsComponent
      },
      {
        path: ':id/edit',
        component: TodoFormComponent,
        data: {
          todoAlreadyExists: true,
          title: 'Todo aanpassen'
        }
      },
      {
        path: ':id/delete',
        component: TodoDeleteComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {}
