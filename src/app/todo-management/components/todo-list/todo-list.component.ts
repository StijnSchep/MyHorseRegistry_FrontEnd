import { Component, OnInit, Input } from '@angular/core'
import { Todo } from '../../models/todo.model'
import { TodoService } from '../../services/todo.service'
import { Subscription } from 'rxjs'
import { RepollTodosNotificationService } from '../../services/repoll-todos-notification.service'
import { AlertService } from 'src/app/core/alert/alert.service'

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  private repollSubscription: Subscription
  todosFetched = false
  todos: Todo[]

  constructor(
    private todoService: TodoService,
    private alertService: AlertService,
    private repollSvc: RepollTodosNotificationService
  ) {}

  ngOnInit() {
    this.repollSubscription = this.repollSvc.obs.subscribe(() => this.fetchTodos())
    this.fetchTodos()
  }

  ngOnDestroy() {
    if (this.repollSubscription) {
      this.repollSubscription.unsubscribe()
    }
  }

  private fetchTodos() {
    this.todoService.getTodos().subscribe(
      todos => {
        this.todos = todos
        this.todosFetched = true
      },
      error => this.alertService.error('Kon geen todos ophalen')
    )
  }
}
