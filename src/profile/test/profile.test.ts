import { LoginPage } from '../../login/page-object/Login.page'
import { MainPage } from '../../login/page-object/Main.page'
import { SettingsPage } from '../page-object/Settings.page'
import { ProfilePage } from '../page-object/Profile.page'
import { EmailPage } from '../page-object/Email.page'
// import { createUserModel, UserModel } from '../../users/model/user.model'
import { user } from '../../users/data/user.data'
import { invalidPath } from '../../users/data/invalidUser.data'

describe('Login form test', () => {
    let loginPage: LoginPage
    let mainPage: MainPage
    let settingsPage: SettingsPage
    let profilePage: ProfilePage
    let emailPage: EmailPage
    // const userModel: UserModel = createUserModel(user)

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
        settingsPage = new SettingsPage(browser)
        profilePage = new ProfilePage(browser)
        emailPage = new EmailPage(browser)

        await loginPage.open()
        await loginPage.login(user)
        await mainPage.openUserMenu()
        await mainPage.openSettingsProfile()
    })

    beforeEach(async () => {
        await settingsPage.open()
    })

    it('username should be added', async () => {
        await settingsPage.addUsername(user.name!)
        await settingsPage.updateProfile()

        expect(await settingsPage.getUpdateUsernameText()).toEqual(user.name!)
    })

    it('@profile should be added to bio', async () => {
        await settingsPage.addOtherProfile(user.bio!)
        await settingsPage.updateProfile()
        await profilePage.open()

        expect(await profilePage.isClicableUserInBio()).toEqual(true)
    })

    it('Pronouns should be changed to `she/her`', async () => {
        await settingsPage.changePronouns()
        await settingsPage.updateProfile()
        await profilePage.open()

        expect(await profilePage.getPronounsText()).toEqual(user.pronouns!)
    })

    it('photo should be uploaded to profile', async () => {
        await settingsPage.uploadFile(user.filePath!)
        await profilePage.waitCropAvatar()
        await settingsPage.saveImage()

        expect(await settingsPage.isDisplayedAvatarBanner()).toEqual(true)
    })

    it('docx should not be uploaded to profile', async () => {
        await settingsPage.uploadFile(invalidPath)
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