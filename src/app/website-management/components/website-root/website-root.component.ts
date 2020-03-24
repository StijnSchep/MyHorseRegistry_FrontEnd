import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-website-root',
  templateUrl: './website-root.component.html'
})
export class WebsiteRootComponent implements OnInit {
  filter

  constructor() {}

  ngOnInit() {}

  filterChanged(filter) {
    this.filter = filter
  }
}
