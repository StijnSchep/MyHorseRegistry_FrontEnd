import { LoginPage } from './login.po'
import { browser, protractor, element, by, logging } from 'protractor'

describe('Login page', () => {
  let page: LoginPage

  beforeEach(() => {
    page = new LoginPage()
  })

  it('should be at /login route after initialisation', () => {
    browser.waitForAngularEnabled(false)
    page.navigateTo('/login')

    expect(browser.getCurrentUrl()).toContain('/login')
    expect(page.submitButton.isEnabled()).toBe(false)
  })

  it('should show input as invalid with empty values', () => {
    browser.waitForAngularEnabled(false)
    page.navigateTo('/login')

    page.nameInput.click()
    page.passwordInput.click()

    page.nameInput.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'))
    page.nameInput.sendKeys(protractor.Key.BACK_SPACE)
    page.passwordInput.sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a'))
    page.passwordInput.sendKeys(protractor.Key.BACK_SPACE)

    browser.driver.sleep(500)

    // expect(page.Invalid).toBeTruthy()
    expect(page.submitButton.isEnabled()).toBe(false)
    expect(browser.getCurrentUrl()).toContain('/login')
  })

  xit('should login when provided with a valid name and password', () => {
    browser.waitForAngularEnabled(false)
    page.navigateTo('/login')

    page.nameInput.sendKeys('name')
    page.passwordInput.sendKeys('password')
    expect(page.submitButton.isEnabled()).toBe(true)

    page.submitButton.click()

    browser.driver.sleep(500)
    expect(browser.getCurrentUrl()).toContain('/horses')
    expect(element(by.id('welcome-message'))).toBeTruthy()
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER)

    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    )

    // tslint:disable-next-line: quotemark
    browser.executeScript("window.localStorage.removeItem('token')")
    // tslint:disable-next-line: quotemark
    browser.executeScript("window.localStorage.removeItem('currentuser')")
  })
})
