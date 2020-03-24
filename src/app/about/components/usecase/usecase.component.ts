import { Component, OnInit, Input } from '@angular/core'

import { UseCase } from '../../models/usecase.model'

@Component({
  selector: 'app-about-usecase',
  templateUrl: './usecase.component.html',
  styleUrls: ['./usecase.component.scss']
})
export class UsecaseComponent implements OnInit {
  @Input() useCase: UseCase

  constructor() {}

  ngOnInit() {}
}
