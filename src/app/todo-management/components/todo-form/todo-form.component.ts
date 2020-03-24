import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { tap, map, switchMap, catchError } from 'rxjs/operators'

import { Todo } from '../../models/todo.model'
import { TodoService } from '../../services/todo.service'
import { AlertService } from 'src/app/core/alert/alert.service'

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {
  title: string
  editMode: boolean
  id: string
  minDate = new Date()
  todo: Todo

  constructor(private route: ActivatedRoute, private router: Router, private todoService: TodoService) {}

  ngOnInit() {
    this.title = this.route.snapshot.data['title'] || 'Todo aanpassen'
    this.editMode = this.route.snapshot.data['todoAlreadyExists'] || false

    if (this.editMode) {
      this.route.params
        .pipe(
          map(params => params['id']),
          tap(id => (this.id = id))
        )
        .subscribe(
          id => {
            // make local copy of user - detached from original array
            this.todo = this.todoService.getTodo(this.id)
          },
          err => console.log('We hebben een fout', err)
        )
    } else {
      this.todo = new Todo()
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.todoService.updateTodo(this.todo).subscribe(
        data => {
          this.router.navigate(['..'], { relativeTo: this.route })
        },
        error => console.error(error)
      )
    } else {
      this.todoService.createTodo(this.todo).subscribe(
        data => {
          this.router.navigate(['..'], { relativeTo: this.route })
        },
        error => console.error(error)
      )
    }
  }
}
