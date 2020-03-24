import { browser } from 'protractor'

export class CommonPageObject {
  navigateTo(path: string = '') {
    return browser.get(browser.baseUrl + path) as Promise<any>
  }
}
