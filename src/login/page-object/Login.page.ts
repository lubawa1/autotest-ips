import { ChainablePromiseElement } from 'webdriverio'
import { UserModel } from '../../users/model/user.model'

class LoginPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public isDisplayedErrorBanner(): Promise<boolean> {
        return this.getErrorBanner().isDisplayed()
    }

    public async login(userModel: UserModel): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await this.getLoginField().setValue(userModel.login)
        await this.getPasswordField().setValue(userModel.password)
        await this.getLoginButton().waitForClickable({
            timeoutMsg: 'Login button was not clicable'
        })
        await this.getLoginButton().click()
    }

    public async setLogin(login: string): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        await this.getLoginField().setValue(login)
    }
    
    public async submitForm(): Promise<void> {
    await this.getLoginButton().waitForClickable({
        timeoutMsg: 'Login button was not clicable'
    })
    await this.getLoginButton().click()
}

    public async setPassword(password: string): Promise<void> {
        await this.getPasswordField().waitForDisplayed({
            timeoutMsg: 'Passwordfield was not displayed'
        })
        await this.getPasswordField().setValue(password)
    }

    public async setEmail(email: string): Promise<void> {
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Email field was not displayed'
        })
        await this.getLoginField().setValue(email)
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