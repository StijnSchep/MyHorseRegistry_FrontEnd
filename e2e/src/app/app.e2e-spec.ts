import { AppPage } from './app.po'
import { browser, logging } from 'protractor'

describe('MyHorseRegistry App', () => {
  let page: AppPage
  const expectedTitle = 'MyHorseRegistry'

  beforeEach(() => {
    page = new AppPage()
  })

  it('should display the expected title as navbar-brand', () => {
    page.navigateTo()
    expect(page.getTitleText()).toEqual(expectedTitle)
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
  })
})
