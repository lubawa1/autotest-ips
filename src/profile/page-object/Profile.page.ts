import { ChainablePromiseElement } from 'webdriverio'
import { LOGIN } from '../../../credentials'

class ProfilePage {
    private login = LOGIN
    protected browser: WebdriverIO.Browser
    protected url = `https://github.com/${this.login}`

    constructor(browser: WebdriverIO.Browser, login: string = LOGIN) {
        this.browser = browser
        this.login = login
    }

    public getPronounsText(): Promise<string> {
        return this.getUserPronouns().getText()
    }

    public isEmailDisplayed(): Promise<boolean> {
        return this.getEmail().isDisplayed()
    }

    public isClicableUserInBio(): Promise<boolean> {
        return this.getBioLink().isClickable()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async waitCropAvatar(): Promise<void> {
        await this.getCropAvatar().waitForDisplayed({
            timeoutMsg: 'Crop avatar was not displayed'
        })
    }

    private getBioLink(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@href,"KonstantinPrik")]')
    }

    private getCropAvatar(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="avatar-crop-form"]')
    }

    private getEmail(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//li//*[contains(@href,"mailto")]')
    }

    private getUserPronouns(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@itemprop,"pronouns")]')
    }}

export {
    ProfilePage,
}