import { Injectable } from '@angular/core'
import { Website } from '../models/website.model'
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http'
import { RepollWebsitesNotificationService } from './repoll-websites-notification.service'
import { throwError, Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { map, catchError, tap } from 'rxjs/operators'
import { AlertService } from 'src/app/core/alert/alert.service'

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {
  websites = new Array<Website>()

  constructor(private http: HttpClient, private repollNotifierService: RepollWebsitesNotificationService) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error.message || error)
  }

  public getWebsite(_id: string): Website {
    return this.websites.find(website => website._id === _id)
  }

  public getWebsites(): Observable<Website[]> {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })

    return this.http.get<any>(`${environment.api_url}/api/website/list`, { headers: headers }).pipe(
      map(websites => websites.map(data => new Website(data))),
      catchError(this.handleError),
      tap(websites => {
        this.websites = websites
      })
    )
  }

  public createWebsite(website: Website) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
    return this.http.post<any>(`${environment.api_url}/api/website`, website, { headers: headers }).pipe(
      catchError(this.handleError),
      tap(data => this.repollNotifierService.notify(data))
    )
  }

  public updateWebsite(website: Website) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
    return this.http
      .put<any>(`${environment.api_url}/api/website/${website._id}`, website, { headers: headers })
      .pipe(
        catchError(this.handleError),
        tap(data => this.repollNotifierService.notify(data))
      )
  }

  public deleteWebsite(website: Website) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })
    return this.http
      .delete<any>(`${environment.api_url}/api/website/${website._id}`, { headers: headers })
      .pipe(
        catchError(this.handleError),
        tap(data => this.repollNotifierService.notify(data))
      )
  }

  public addHorse(websiteId: string, horseId: string) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })

    return this.http
      .put<any>(`${environment.api_url}/api/website/${websiteId}/horse/${horseId}`, {}, { headers: headers })
      .pipe(
        catchError(this.handleError),
        tap(data => this.repollNotifierService.notify(data))
      )
  }

  public removeHorse(websiteId: string, horseId: string) {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` })

    return this.http
      .delete<any>(`${environment.api_url}/api/website/${websiteId}/horse/${horseId}`, { headers: headers })
      .pipe(
        catchError(this.handleError),
        tap(data => this.repollNotifierService.notify(data))
      )
  }
}
