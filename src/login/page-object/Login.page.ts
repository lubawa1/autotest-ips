import { ChainablePromiseElement } from 'webdriverio'

class LoginPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public isDisplayedErrorBanner(): Promise<boolean> {
        return this.getErrorBanner().isDisplayed()
    }

    public async login(login: string, password: string): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await this.getLoginField().setValue(login)
        await this.getPasswordField().setValue(password)
        await this.getLoginButton().waitForClickable({
            timeoutMsg: 'Login button was not clicable'
        })
        await this.getLoginButton().click()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    private getErrorBanner(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-flash-container"]')
    }

    private getLoginButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@type="submit"]')
    }

    private getLoginField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="login_field"]')
    }

    private getPasswordField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="password"]')
    }
}

export {
    LoginPage,
}