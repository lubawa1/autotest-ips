import { ChainablePromiseElement } from 'webdriverio'

class EmailPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/settings/emails'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public isDisplayedUpdateBanner(): Promise<boolean> {
        return this.getUpdateBanner().isDisplayed()
    }

    public async openEmail(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async turnOffEmailCheckbox(): Promise<void> {//turnOff... еще подумать над реализацией
        if (await this.getEmailCheckbox().isSelected()) {
            await this.getEmailCheckbox().click()
        } else {}
    }

    private getEmailCheckbox(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="toggle_visibility"]')
    }

    private getUpdateBanner(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//main//*[contains(@class,"flash-full")]')
    }
}

export {
    EmailPage,
}