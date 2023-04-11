import { ChainablePromiseElement } from 'webdriverio'
import { UserModel } from '../../users/model/user.model'
import { Reporter } from '../../common/reporter/Reporter'


class LoginPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/login'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public isDisplayedErrorBanner(): Promise<boolean> {
        Reporter.addStep('Проверить отображение error banner')
        return this.getErrorBanner().isDisplayed()
    }

    public async login(userModel: UserModel): Promise<void> {
        Reporter.addStep('Подождать отображение поля Login')
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        Reporter.addStep(`Ввести логин ${userModel.login}`)
        await this.getLoginField().setValue(userModel.login)
        Reporter.addStep(`Ввести пароль ${userModel.password}`)
        await this.getPasswordField().setValue(userModel.password)
        Reporter.addStep('Подождать отображение кнопки Sing in')
        await this.getLoginButton().waitForClickable({
            timeoutMsg: 'Login button was not clicable'
        })
        Reporter.addStep('Залогиниться')
        await this.getLoginButton().click()
    }

    public async setLogin(login: string): Promise<void> {
        Reporter.addStep('Подождать отображение поля Login')
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Login field was not displayed'
        })
        Reporter.addStep(`Ввести логин ${login}`)
        await this.getLoginField().setValue(login)
    }
    
    public async submitForm(): Promise<void> {
        Reporter.addStep('Подождать отображение кнопки Sing in')
    await this.getLoginButton().waitForClickable({
        timeoutMsg: 'Login button was not clicable'
    })
    Reporter.addStep('Залогиниться')
    await this.getLoginButton().click()
}

    public async setPassword(password: string): Promise<void> {
        Reporter.addStep('Подождать отображение поля Password')
        await this.getPasswordField().waitForDisplayed({
            timeoutMsg: 'Passwordfield was not displayed'
        })
        Reporter.addStep(`Ввести пароль ${password}`)
        await this.getPasswordField().setValue(password)
    }

    public async setEmail(email: string): Promise<void> {
        Reporter.addStep('Подождать отображение поля Email')
        await this.getLoginField().waitForDisplayed({
            timeoutMsg: 'Email field was not displayed'
        })
        Reporter.addStep(`Ввести email ${email}`)
        await this.getLoginField().setValue(email)
    }

    public async open(): Promise<void> {
        Reporter.addStep(`Открыть страницу логинации ${this.url}`)
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