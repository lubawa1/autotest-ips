import { ChainablePromiseElement } from 'webdriverio'

class EmailPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/settings/emails'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async openEmail(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async turnEmailCheckbox(): Promise<void> {
        if (await this.getEmailCheckbox().isSelected()) {
            await this.getEmailCheckbox().click();
        } else {
            await this.getEmailCheckbox().click();
            await this.getEmailCheckbox().click();
        }
    }

    public isDisplayedUpdateBanner(): Promise<boolean> {
        return this.getUpdateBanner().isDisplayed()
    }

    private getUpdateBanner(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//main//*[contains(@class,"flash-full")]')
    }

    private getEmailCheckbox(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="toggle_visibility"]')
    }
}

export {
    EmailPage,
}