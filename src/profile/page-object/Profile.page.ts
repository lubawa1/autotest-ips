import { ChainablePromiseElement } from 'webdriverio'
import { LOGIN } from '../../../credentials'

class ProfilePage {//переимновать в ProfilePage
    private login = LOGIN
    protected browser: WebdriverIO.Browser
    protected url = `https://github.com/${this.login}`

    constructor(browser: WebdriverIO.Browser, login: string = LOGIN) {
        this.browser = browser
        this.login = login
    }

    public  isClicableUserInBio(): Promise<boolean> { //подумать над названием
        return this.getBioLink().isClickable()
    }

    public getPronounsText(): Promise<string> {
        return this.getUserPronouns().getText()
    }

    public async waitCropAvatar(): Promise<void> {
        await this.getCropAvatar().waitForDisplayed({
            timeoutMsg: 'Crop avatar was not displayed'
        })
    }

    public isEmailDisplayed(): Promise<boolean> {
        return this.getEmail().isDisplayed()
    }

    public async openUser(): Promise<void> {
        await this.browser.url(this.url)
    }

    private getUserProfileBio(): ChainablePromiseElement<WebdriverIO.Element> {//переименовать в getUserProfileBio
        return this.browser.$('//*[contains(@class,"js-profile-editable-area")]')
    }

    private getBioLink(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@href,"KonstantinPrik")]')
    }

    private getCropAvatar(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="avatar-crop-form"]')
    }

    private getEmail(): ChainablePromiseElement<WebdriverIO.Element> {//если не планируешь использовать, то нужно ето убрать
        return this.browser.$('//li//*[contains(@href,"mailto")]')
    }

    private getUserPronouns(): ChainablePromiseElement<WebdriverIO.Element> {///getUserPronouns
        return this.browser.$('//div//*[contains(@itemprop,"pronouns")]')
    }
}

export {
    ProfilePage,
}