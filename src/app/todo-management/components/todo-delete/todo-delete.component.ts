import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { tap, map, switchMap, catchError } from 'rxjs/operators'

import { TodoService } from '../../services/todo.service'
import { Todo } from '../../models/todo.model'

@Component({
  selector: 'app-todo-delete',
  templateUrl: './todo-delete.component.html',
  styleUrls: ['./todo-delete.component.scss']
})
export class TodoDeleteComponent implements OnInit {
  todo: Todo
  id: string

  constructor(private route: ActivatedRoute, private router: Router, private todoService: TodoService) {}

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

  public onDelete() {
    this.todoService.deleteTodo(this.todo).subscribe(
      data => {
        this.router.navigate(['../..'], { relativeTo: this.route })
      },
      error => console.error(error)
    )
  }
}
