import { by, element, ElementFinder } from 'protractor'
import { CommonPageObject } from '../common.po'

export class LoginPage extends CommonPageObject {
  get nameInput() {
    return element(by.id('name')) as ElementFinder
  }

  get passwordInput() {
    return element(by.id('password')) as ElementFinder
  }

  get submitButton() {
    return element(by.id('submitbutton')) as ElementFinder
  }

  get Invalid() {
    return element(by.css('.is-invalid')) as ElementFinder
  }
}
