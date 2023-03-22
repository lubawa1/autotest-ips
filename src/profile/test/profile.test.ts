import { LoginPage } from '../../login/page-object/Login.page'
import { LOGIN, PASSWORD } from '../../../credentials'
import { MainPage } from '../../login/page-object/Main.page'
import { SettingsPage } from '../page-object/Settings.page'
import { ProfilePage } from '../page-object/Profile.page'
import { EmailPage } from '../page-object/Email.page'

describe('Login form test', () => {
    let loginPage: LoginPage
    let mainPage: MainPage
    let settingsPage: SettingsPage
    let profilePage: ProfilePage
    let emailPage: EmailPage
    const filePath = 'src/files/kitty.jpg'
    const docxPath = 'src/files/test.docx'

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
        settingsPage = new SettingsPage(browser)
        profilePage = new ProfilePage(browser)
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

        expect(await settingsPage.getUpdateUsernameText()).toEqual('luba')
    })

    it('@profile should be added to bio', async () => {
        await settingsPage.addOtherProfile('@KonstantinPrik')
        await settingsPage.updateProfile()
        await profilePage.openUser()

        expect(await profilePage.isClicableUserInBio()).toEqual(true)
    })

    it('Pronouns should be changed to `she/her`', async () => {
        await settingsPage.changePronouns()
        await settingsPage.updateProfile()
        await profilePage.openUser()

        expect(await profilePage.getPronounsText()).toEqual('she/her')
    })

    it('photo should be uploaded in profile', async () => {
        await settingsPage.uploadFile(filePath)
        await profilePage.waitCropAvatar()
        await settingsPage.saveImage()

        expect(await settingsPage.isDisplayedAvatarBanner()).toEqual(true)
    })

    it('docx should not be uploaded in profile', async () => {
        await settingsPage.uploadFile(docxPath)
        await settingsPage.waitDisplayedErrorBanner()
    })

    it('Public email should be active and changed', async () => {
        await emailPage.openEmail()
        await emailPage.turnOffEmailCheckbox()
        await settingsPage.openSettings()
        await settingsPage.changePublicEmail()
        await settingsPage.updateProfile()
        await profilePage.openUser()

        expect(await profilePage.isEmailDisplayed()).toEqual(true)
    })


    afterEach(async () => {
        await browser.reloadSession()
    })

})