import { LoginPage } from '../page-object/Login.page'
import { LOGIN, PASSWORD } from '../../../credentials'
import { MainPage } from '../page-object/Main.page'
import { SettingsPage} from '../page-object/Settings.page'

describe('Login form test', () => {
    let loginPage: LoginPage
    let mainPage: MainPage
    let settingsPage : SettingsPage

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
        settingsPage = new SettingsPage(browser)

        await loginPage.open()
        await loginPage.login(LOGIN, PASSWORD)
        await mainPage.openUserMenu()
        await mainPage.openSettingsProfile()
        await settingsPage.openSettings()

        expect(await settingsPage.isDisplayedPublicProfileLayout()).toEqual(true)
    })

    it('username should be add', async () => {
        await settingsPage.addUsername('luba')
        await settingsPage.updateProfile()

        expect(await settingsPage.isDisplayedUpdateBanner()).toEqual(true)
        expect(await settingsPage.getUpdateUsernameText()).toEqual('luba')
    })
})