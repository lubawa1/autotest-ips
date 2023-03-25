import { ChainablePromiseElement } from 'webdriverio'

class SettingsPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/settings/profile'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async addOtherProfile(otherProfile: string): Promise<void> {
        await this.getBioField().waitForDisplayed({
            timeoutMsg: 'Bio field was not displayed'
        })
        await this.getBioField().clearValue()
        await this.getBioField().setValue(otherProfile)
    }

    public async addUsername(username: string): Promise<void> {
        await this.getUsernameField().waitForDisplayed({
            timeoutMsg: 'Username field was not displayed'
        })
        await this.getUsernameField().clearValue()
        await this.getUsernameField().setValue(username)
    }

    public async changePronouns(): Promise<void> {
        await this.getPronounsField().waitForDisplayed({
            timeoutMsg: 'Pronouns field was not displayed'
        })
        await this.getPronounsField().waitForClickable({
            timeoutMsg: 'Pronouns was not clicable'
        })
        await this.getPronounsField().click()
        await this.getPronounsValueShe().waitForDisplayed({
            timeoutMsg: 'Pronouns `she` field was not displayed'
        })
        await this.getPronounsValueShe().click()
    }

    public async changePublicEmail(): Promise<void> {
        await this.getPublicEmailField().waitForDisplayed({
            timeoutMsg: 'Email field was not displayed'
        })
        await this.getPublicEmailField().waitForClickable({
            timeoutMsg: 'Email was not clickable'
        })
        await this.getPublicEmailField().click()
        await this.getEmailValueEmail().waitForDisplayed({
            timeoutMsg: 'Email field was not displayed'
        })
        await this.getEmailValueEmail().click()
    }

    public getUpdateUsernameText(): Promise<string> {
        return this.getUpdateUsernameField().getText()
    }

    public isDisplayedAvatarBanner(): Promise<boolean> {
        return this.getUpdateAvatarBanner().isDisplayed()
    }

    public isDisplayedErrorBanner(): Promise<boolean> {
        return this.getErrorBanner().isDisplayed()
    }

    public async waitErrorBanner(): Promise<void> {
        await this.getErrorBanner().waitForDisplayed()
    }

    public isDisplayedPublicProfileLayout(): Promise<boolean> {
        return this.getPublicProfileLayout().isDisplayed()
    }

    public isDisplayedUpdateBanner(): Promise<boolean> {
        return this.getUpdateBanner().isDisplayed()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async saveImage(): Promise<void> {
        await this.getSaveButtonImage().waitForClickable({
            timeoutMsg: 'Save image button was not clicable'
        })
        await this.getSaveButtonImage().click()
    }

    public async showHiddenFileInput(): Promise<void> {
        await this.browser.execute(() => {
            const htmlElement = document.querySelector('[type="file"]') as HTMLElement
            htmlElement.style.cssText = 'display:block !important; opacity: 1; position: inherit;'
        })
    }

    public async uploadFile(filePath: string): Promise<void> {
        await this.getInputFile().waitForExist({
            timeoutMsg: 'File input field was not exist',
        })
        await this.showHiddenFileInput()
        const file: string = await this.browser.uploadFile(filePath)
        await this.getInputFile().setValue(file)
    }

    public async updateProfile(): Promise<void> {
        await this.getUpdateProfileButton().waitForClickable({
            timeoutMsg: 'Update button was not clicable'
        })
        await this.getUpdateProfileButton().click()
    }

    private getBioField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_bio"]')
    }

    private getEmailValueEmail(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//select//*[contains(@value,"@")]')
    }

    private getErrorBanner(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//file-attachment//*[contains(@class,"bad-file")]')
    }

    private getInputFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('[type="file"]')
    }

    private getPronounsField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_pronouns_select"]')
    }

    private getPronounsValueShe(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//select//*[contains(@value,"she/her")]')
    }

    private getPublicEmailField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_email"]')
    }

    private getPublicProfileLayout(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="settings-frame"]')
    }

    private getSaveButtonImage(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//details-dialog//*[contains(@value,"save")]')
    }

    private getUpdateAvatarBanner(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"flash-full")]')
    }

    private getUpdateBanner(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//main//*[contains(@class,"flash-full")]')
    }

    private getUpdateProfileButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//waiting-form//*[contains(@class,"Button--primary")]')
    }

    private getUpdateUsernameField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//h1//*[contains(@class,"color-fg-default")]')
    }

    private getUsernameField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user_profile_name"]')
    }
}

export {
    SettingsPage,
}