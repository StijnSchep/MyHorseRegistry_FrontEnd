import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { tap, map, switchMap, catchError } from 'rxjs/operators'

import { TodoService } from '../../services/todo.service'
import { Todo } from '../../models/todo.model'

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.scss']
})
export class TodoDetailsComponent implements OnInit {
  todo: Todo
  id: string

  constructor(private route: ActivatedRoute, private todoService: TodoService) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => params['id']),
        tap(id => (this.id = id))
      )
      .subscribe(
        id => {
          this.todo = this.todoService.getTodo(id)
        },
        err => console.log('We hebben een fout', err)
      )
  }
}
