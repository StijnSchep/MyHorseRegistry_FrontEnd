import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app/app.component'
import { NavbarComponent } from './navbar/navbar.component'
import { LoginComponent } from '../auth/components/login/login.component'
import { AlertComponent } from './alert/alert/alert.component'

import { RepollTodosNotificationService } from '../todo-management/services/repoll-todos-notification.service'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [AppComponent, NavbarComponent, LoginComponent, AlertComponent],
  imports: [HttpClientModule, BrowserModule, RouterModule, NgbModule, AppRoutingModule, FormsModule],
  providers: [RepollTodosNotificationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
