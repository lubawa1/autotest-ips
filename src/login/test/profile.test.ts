import { LoginPage } from '../page-object/Login.page'
import { LOGIN, PASSWORD } from '../../../credentials'
import { MainPage } from '../page-object/Main.page'
import { SettingsPage } from '../page-object/Settings.page'
import { UserPage } from '../page-object/User.page'
import { OtherUserPage } from '../page-object/OtherUser.page'

describe('Login form test', () => {
    let loginPage: LoginPage
    let mainPage: MainPage
    let settingsPage: SettingsPage
    let userPage: UserPage
    let otherUserPage: OtherUserPage

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
        settingsPage = new SettingsPage(browser)
        userPage = new UserPage(browser)
        otherUserPage = new OtherUserPage(browser)
    })

    beforeEach(async () => {

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

    it('@profile should be add to bio', async () => {
        await settingsPage.addOtherProfile('@KonstantinPrik')
        await settingsPage.updateProfile()

        expect(await settingsPage.isDisplayedUpdateBanner()).toEqual(true)

        await userPage.openUser()

        expect(await userPage.getBioText()).toEqual('@KonstantinPrik')

        await userPage.clickableBioLink()
        await otherUserPage.openOtherUserPage()
        await otherUserPage.isDisplayedOtherUserName()

        expect(await otherUserPage.getNameText()).toEqual('KonstantinPrik')
    })

    it('Pronouns should be change to `she/her`', async () => {
        await settingsPage.changePronouns()
        await settingsPage.updateProfile()

        expect(await settingsPage.isDisplayedUpdateBanner()).toEqual(true)
        await userPage.openUser()
        expect(await userPage.getPronounsText()).toEqual('she/her')
    })

    afterEach(async () => {
        await browser.reloadSession()
    })

})