import { ChainablePromiseElement } from 'webdriverio'

class UserPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/lubawa1'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async clickableBioLink(): Promise<void> {
        await this.getBioLink().waitForClickable({
            timeoutMsg: 'User button in bio was not clicable'
        })
        await this.getBioLink().click()
    }

    public getBioText(): Promise<string> {
        return this.getBio().getText()
    }

    public getPronounsText(): Promise<string> {
        return this.getPronouns().getText()
    }

    public isDisplayedBio(): Promise<boolean> {
        return this.getBio().isDisplayed()
    }

    public isEmailDisplayed(): Promise<boolean> {
        return this.getBio().isDisplayed()
    }

    public async openUser(): Promise<void> {
        await this.browser.url(this.url)
    }

    private getBio(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"p-note")]')
    }

    private getBioLink(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@href,"KonstantinPrik")]')
    }

    private getEmail(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//li//*[contains(@href,"mailto")]')
    }

    private getPronouns(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@itemprop,"pronouns")]')
    }

}

export {
    UserPage,
}