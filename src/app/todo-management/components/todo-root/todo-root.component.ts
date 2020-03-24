import { Component, OnInit } from '@angular/core'
import { Todo } from '../../models/todo.model'
import { TodoService } from '../../services/todo.service'

@Component({
  selector: 'app-todo-root',
  templateUrl: './todo-root.component.html',
  styleUrls: ['./todo-root.component.scss']
})
export class TodoRootComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
