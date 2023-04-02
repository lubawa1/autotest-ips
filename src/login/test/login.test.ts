import { LoginPage } from '../page-object/Login.page'
import { MainPage } from '../page-object/Main.page'
import { createUserModel, UserModel } from '../../users/model/user.model'
import { user } from '../../users/data/user.data'
import { invalidLogin, invalidPassword } from '../../users/data/invalidUser.data'

describe('Login form test', () => {
    let loginPage: LoginPage
    let mainPage: MainPage
    const userModel: UserModel = createUserModel(user)

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
    })

    it('user should be log in with correct login', async () => {
        await loginPage.login(user)
        await mainPage.openUserMenu()
        expect(await mainPage.getUserLoginText()).toEqual(userModel.login)
    })

    it('user should be log in with correct email', async () => {
        await loginPage.setEmail(userModel.email!)
        await loginPage.setPassword(userModel.password)
        await loginPage.submitForm()
        await mainPage.openUserMenu()

        expect(await mainPage.getUserLoginText()).toEqual(userModel.login)
    })

    it('user should not be log in with incorrect login', async () => {
        await loginPage.setLogin(invalidLogin)
        await loginPage.setPassword(userModel.password)
        await loginPage.submitForm()

        expect(await loginPage.isDisplayedErrorBanner()).toEqual(true)
    })

    it('user should not be log in with incorrect password', async () => {
        await loginPage.setLogin(userModel.login)
        await loginPage.setPassword(invalidPassword)
        await loginPage.submitForm()

        expect(await loginPage.isDisplayedErrorBanner()).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})