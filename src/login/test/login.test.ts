import { LoginPage } from '../page-object/Login.page'
import { LOGIN, PASSWORD, EMAIL } from '../../../credentials'
import { MainPage } from '../page-object/Main.page'

describe('Login form test', () => {
    let loginPage: LoginPage
    let mainPage: MainPage

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
    })

    beforeEach(async () => {
        await loginPage.open()
    })

    it('user should be log in with correct login', async () => {
        await loginPage.login(LOGIN, PASSWORD)
        await mainPage.openUserMenu()

        expect(await mainPage.getUserLoginText()).toEqual(LOGIN)
    })

    it('user should be log in with correct email', async () => {
        await loginPage.login(EMAIL, PASSWORD)
        await mainPage.openUserMenu()

        expect(await mainPage.getUserLoginText()).toEqual(LOGIN)
    })

    it('user should not be log in with incorrect login', async () => {
        await loginPage.login(`${LOGIN}1`, PASSWORD)

        expect(await loginPage.isDisplayedErrorBanner()).toEqual(true)
    })

    it('user should not be log in with incorrect password', async () => {
        await loginPage.login(LOGIN, `${PASSWORD}1`)

        expect(await loginPage.isDisplayedErrorBanner()).toEqual(true)
    })

    afterEach(async () => {
        await browser.reloadSession()
    })
})