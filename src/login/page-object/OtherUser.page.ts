import { ChainablePromiseElement } from 'webdriverio'

class OtherUserPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/KonstantinPrik'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async openOtherUserPage(): Promise<void> {
        await this.browser.url(this.url)
    }

   // public isDisplayedOtherUserName(): Promise<boolean>

    public async isDisplayedOtherUserName(): Promise<void> {
        await this.getName().waitForDisplayed({
            timeoutMsg: 'User name was not displayed'
        })
    }
    // await this.getName().waitForDisplayed({
    //     timeoutMsg: 'Username field was not displayed'
    // })
    // public isDisplayedName(): Promise<boolean> {
    //     return this.getName().isDisplayed()
    // }

    public getNameText(): Promise<string> {
        return this.getName().getText()
    }

    private getName(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"p-nickname")]')
    }
}

export {
    OtherUserPage,
}