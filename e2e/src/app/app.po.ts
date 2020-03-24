import { browser, by, element } from 'protractor'
import { CommonPageObject } from '../common.po'

export class AppPage extends CommonPageObject {
  getTitleText() {
    return element(by.css('app-root .navbar-brand')).getText() as Promise<string>
  }
}
