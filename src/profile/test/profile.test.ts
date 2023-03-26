import { LoginPage } from '../../login/page-object/Login.page'
import { MainPage } from '../../login/page-object/Main.page'
import { SettingsPage } from '../page-object/Settings.page'
import { ProfilePage } from '../page-object/Profile.page'
import { EmailPage } from '../page-object/Email.page'
import { createUserModel, UserModel } from '../../users/model/user.model'
import { user } from '../../users/data/user.data'
import { createUserProfile, ProfileModel } from '../model/profile.model'
import { profile } from '../data/profile.data'
import { docxPath } from '../data/invalidProfile.data'

describe('Login form test', () => {
    let loginPage: LoginPage
    let mainPage: MainPage
    let settingsPage: SettingsPage
    let profilePage: ProfilePage
    let emailPage: EmailPage
    const userModel: UserModel = createUserModel(user)
    const profileModel: ProfileModel = createUserProfile(profile)

    before(async () => {
        loginPage = new LoginPage(browser)
        mainPage = new MainPage(browser)
        settingsPage = new SettingsPage(browser)
        profilePage = new ProfilePage(browser)
        emailPage = new EmailPage(browser)

        await loginPage.open()
        await loginPage.login(userModel)
        await mainPage.openUserMenu()
        await mainPage.openSettingsProfile()
    })

    beforeEach(async () => {
        await settingsPage.open()
    })

    it('username should be added', async () => {
        await settingsPage.addUsername(profileModel.name)
        await settingsPage.updateProfile()

        expect(await settingsPage.getUpdateUsernameText()).toEqual(profileModel.name)
    })

    it('@profile should be added to bio', async () => {
        await settingsPage.addOtherProfile(profileModel.bio)
        await settingsPage.updateProfile()
        await profilePage.open()

        expect(await profilePage.isClicableUserInBio()).toEqual(true)
    })

    it('Pronouns should be changed to `she/her`', async () => {
        await settingsPage.changePronouns()
        await settingsPage.updateProfile()
        await profilePage.open()

        expect(await profilePage.getPronounsText()).toEqual(profileModel.pronouns)
    })

    it('photo should be uploaded to profile', async () => {
        await settingsPage.uploadFile(profileModel.filePath)
        await profilePage.waitCropAvatar()
        await settingsPage.saveImage()

        expect(await settingsPage.isDisplayedAvatarBanner()).toEqual(true)
    })

    it('docx should not be uploaded to profile', async () => {
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