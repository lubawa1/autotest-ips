import { ChainablePromiseElement } from 'webdriverio'

class UserPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/lubawa1'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async openUser(): Promise<void> {
        await this.browser.url(this.url)
    }

    public isDisplayedBio(): Promise<boolean> {
        return this.getBio().isDisplayed()
    }

    public getBioText(): Promise<string> {
        return this.getBio().getText()
    }

    // public async clickBio(): Promise<void> {
    //     await this.getBio().waitForClickable({
    //         timeoutMsg: 'Bio button was not clicable'
    //     })
    //     await this.getBio().click()
    // }
    

    public async clickableBioLink(): Promise<void> {
        await this.getBioLink().waitForClickable({
            timeoutMsg: 'User button in bio was not clicable'
        })
             await this.getBioLink().click()
    }

    private getBio(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"p-note")]')
    }

    private getBioLink(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@href,"KonstantinPrik")]')
    }

}

export {
    UserPage,
}