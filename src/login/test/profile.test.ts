import { LoginPage } from '../page-object/Login.page'
import { LOGIN, PASSWORD } from '../../../credentials'
import { MainPage } from '../page-object/Main.page'
import { SettingsPage } from '../page-object/Settings.page'
import { UserPage } from '../page-object/User.page'
import { OtherUserPage } from '../page-object/OtherUser.page'
import { EmailPage } from '../page-object/Email.page'

describe('Login form test', () => {
    let loginPage: LoginPage
    let mainPage: MainPage
    let settingsPage: SettingsPage
    let userPage: UserPage
    let otherUserPage: OtherUserPage
    let emailPage: EmailPage
    const filePath = 'src/files/kitty.jpg'
    const docxPath = 'src/files/test.docx'

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
        settingsPage = new SettingsPage(browser)
        userPage = new UserPage(browser)
        otherUserPage = new OtherUserPage(browser)
        emailPage = new EmailPage(browser)
    })

    beforeEach(async () => {

        await loginPage.open()
        await loginPage.login(LOGIN, PASSWORD)
        await mainPage.openUserMenu()
        await mainPage.openSettingsProfile()
        await settingsPage.openSettings()

        expect(await settingsPage.isDisplayedPublicProfileLayout()).toEqual(true)
    })

    it('username should be added', async () => {
        await settingsPage.addUsername('luba')
        await settingsPage.updateProfile()

        expect(await settingsPage.isDisplayedUpdateBanner()).toEqual(true)
        expect(await settingsPage.getUpdateUsernameText()).toEqual('luba')
    })

    it('@profile should be added to bio', async () => {
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

    it('Pronouns should be changed to `she/her`', async () => {
        await settingsPage.changePronouns()
        await settingsPage.updateProfile()

        expect(await settingsPage.isDisplayedUpdateBanner()).toEqual(true)
        await userPage.openUser()
        expect(await userPage.getPronounsText()).toEqual('she/her')
    })

    it('photo should be uploaded in profile', async () => {
        await settingsPage.uploadFile(filePath)
        await browser.pause(1000)
        await settingsPage.saveImage()
        expect(await settingsPage.isDisplayedAvatarBanner()).toEqual(true)
    })

    it('docx should not be uploaded in profile', async () => {
        await settingsPage.uploadDocxFile(docxPath)
        await browser.pause(1000)
        expect(await settingsPage.isDisplayedErrorBanner()).toEqual(true)
    })

    it('Public email should be active and changed', async () => {
        await emailPage.openEmail()
        await emailPage.turnEmailCheckbox()

        expect(await emailPage.isDisplayedUpdateBanner()).toEqual(true)

        await settingsPage.openSettings()
        await settingsPage.changePublicEmail()
        await settingsPage.updateProfile()
        expect(await settingsPage.isDisplayedUpdateBanner()).toEqual(true)
        await userPage.openUser()
        expect(await userPage.isEmailDisplayed()).toEqual(true)
    })


    afterEach(async () => {
        await browser.reloadSession()
    })

})