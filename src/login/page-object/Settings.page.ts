import { ChainablePromiseElement } from 'webdriverio'

class SettingsPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/settings/profile'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async openSettings(): Promise<void> {
        await this.browser.url(this.url)
    }

    public getUpdateUsernameText(): Promise<string> {
        return this.getUpdateUsernameField().getText()
    }

    public isDisplayedPublicProfileLayout(): Promise<boolean> {
        return this.getPublicProfileLayout().isDisplayed()
    }

    public isDisplayedUpdateBanner(): Promise<boolean> {
        return this.getUpdateBanner().isDisplayed()
    }

    public async addUsername(username: string): Promise<void> {
        await this.getUsernameField().waitForDisplayed({
            timeoutMsg: 'Username field was not displayed'
        })
        await this.getUsernameField().clearValue()
        await this.getUsernameField().setValue(username)
        await this.getUpdateProfileButton().waitForClickable({
        timeoutMsg: 'Update button was not clicable'
    })
    }

    public async updateProfile(): Promise<void> {
        await this.getUpdateProfileButton().waitForClickable({
            timeoutMsg: 'Update button was not clicable'
        })
        await this.getUpdateProfileButton().click()
    }

    private getUpdateUsernameField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//h1//*[contains(@class,"color-fg-default")]')
    }

    private getUpdateBanner(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//main//*[contains(@class,"flash-full")]') 
    }

    private getUsernameField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_name"]')
    }

    private getPublicProfileLayout(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="settings-frame"]')
    }

    private getUpdateProfileButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//waiting-form//*[contains(@class,"Button--primary")]')
    }

}

export {
    SettingsPage,
}