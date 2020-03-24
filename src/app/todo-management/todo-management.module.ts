import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { TodoRoutingModule } from './todo-routing.module'
import { TodoRootComponent } from './components/todo-root/todo-root.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'
import { TodoListItemComponent } from './components/todo-list-item/todo-list-item.component'
import { TodoDetailsComponent } from './components/todo-details/todo-details.component'
import { TodoFormComponent } from './components/todo-form/todo-form.component'
import { TodoDeleteComponent } from './components/todo-delete/todo-delete.component'
import { TodoToolsComponent } from './components/todo-tools/todo-tools.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    TodoRootComponent,
    TodoListComponent,
    TodoListItemComponent,
    TodoDetailsComponent,
    TodoFormComponent,
    TodoDeleteComponent,
    TodoToolsComponent
  ],
  imports: [CommonModule, TodoRoutingModule, RouterModule, FormsModule]
})
export class TodoManagementModule {}
