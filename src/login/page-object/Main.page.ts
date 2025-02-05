import { ChainablePromiseElement } from 'webdriverio'
import { Reporter } from '../../common/reporter/Reporter'

class MainPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public getUserLoginText(): Promise<string> {
        Reporter.addStep('Получить login')
        return this.getUserLogin().getText()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async openRepositories(): Promise<void> {
        await this.getRepositoriesButton().waitForClickable({
            timeoutMsg: 'Repositories button was not clicable'
        })
        await this.getRepositoriesButton().click()
    }

    public async openSettingsProfile(): Promise<void> {
        await this.getSettingsButton().waitForClickable({
            timeoutMsg: 'Settings button was not clicable'
        })
        await this.getSettingsButton().click()
    }

    public async openUserMenu(): Promise<void> {
        await this.getUserAvatar().waitForClickable({
            timeoutMsg: 'Avatar was not clicable'
        })
        await this.getUserAvatar().click()
    }

    private getRepositoriesButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//details-menu//*[contains(@href,"repositories")]')
    }

    private getSettingsButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//details-menu//*[contains(@href,"settings/profile")]')
    }

    private getUserAvatar(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//summary//*[contains(@class, "avatar")]')
    }

    private getUserLogin(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="css-truncate-target"]')
    }
}

export {
    MainPage,
}