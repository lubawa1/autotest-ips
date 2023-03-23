import { LoginPage } from '../../login/page-object/Login.page'
import { LOGIN, PASSWORD } from '../../../credentials'
import { MainPage } from '../../login/page-object/Main.page'
import { SettingsPage } from '../page-object/Settings.page'
import { ProfilePage } from '../page-object/Profile.page'
import { EmailPage } from '../page-object/Email.page'
import { createUserModel, UserModel } from '../../users/model/user.model'
import { user } from '../../users/data/user.data'


describe('Login form test', () => {
    let loginPage: LoginPage
    let mainPage: MainPage
    let settingsPage: SettingsPage
    let profilePage: ProfilePage
    let emailPage: EmailPage
    const filePath = 'src/files/kitty.jpg'
    const docxPath = 'src/files/test.docx'
    let userModel: UserModel

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
        settingsPage = new SettingsPage(browser)
        profilePage = new ProfilePage(browser)
        emailPage = new EmailPage(browser)
        userModel = createUserModel(user)

        await loginPage.open()
        await loginPage.login(userModel)
        await mainPage.openUserMenu()
    })

    beforeEach(async () => {
        await settingsPage.open()
    })

    it('username should be added', async () => {
        await settingsPage.addUsername('luba')
        await settingsPage.updateProfile()

        expect(await settingsPage.getUpdateUsernameText()).toEqual('luba')
    })

    it('@profile should be added to bio', async () => {
        await settingsPage.addOtherProfile('@KonstantinPrik')
        await settingsPage.updateProfile()
        await profilePage.open()

        expect(await profilePage.isClicableUserInBio()).toEqual(true)
    })

    it('Pronouns should be changed to `she/her`', async () => {
        await settingsPage.changePronouns()
        await settingsPage.updateProfile()
        await profilePage.open()

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
        await settingsPage.waitErrorBanner()

        expect(await settingsPage.isDisplayedErrorBanner()).toEqual(true)
    })

    it('Public email should be active and changed', async () => {
        await emailPage.openEmail()
        await emailPage.turnOffEmailCheckbox()
        await settingsPage.open()
        await settingsPage.changePublicEmail()
        await settingsPage.updateProfile()
        await profilePage.open()

        expect(await profilePage.isEmailDisplayed()).toEqual(true)
    })
})