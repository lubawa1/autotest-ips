import { LoginPage } from '../../login/page-object/Login.page'
// import { MainPage } from '../../login/page-object/Main.page'
import { createUserModel, UserModel } from '../../users/model/user.model'
import { user } from '../../users/data/user.data'
import { RepositoriesPage } from '../page-object/Repositories.page'
import { createIssueModel, IssueModel } from '../model/issue.model'
import { issue, editIssue } from '../data/issue.data'
import { IssuesPage } from '../page-object/Issues.page'

describe('Issues test', () => {
    let loginPage: LoginPage
    // let mainPage: MainPage
    let repositoriesPage: RepositoriesPage
    let issuesPage: IssuesPage
    const userModel: UserModel = createUserModel(user)
    const issueModel: IssueModel = createIssueModel(issue)

    before(async () => {
        loginPage = new LoginPage(browser)
        // mainPage = new MainPage(browser)
        repositoriesPage = new RepositoriesPage(browser)
        issuesPage = new IssuesPage(browser)

        await loginPage.open()
        await loginPage.login(userModel)
        await repositoriesPage.open()
        await repositoriesPage.openRepository()
        await repositoriesPage.openIssuesTab()
    })

    it('Create new issue', async () => {
        await issuesPage.createNewIssue()
        await issuesPage.addIssueTitle(issueModel.title)
        await issuesPage.createIssue()

        expect(await issuesPage.getIssueTitleText()).toEqual(issueModel.title)
    })

    describe('Issues test', () => {

        // let loginPage: LoginPage
        // let mainPage: MainPage
        // let repositoriesPage: RepositoriesPage
        // let issuesPage: IssuesPage
        // // const userModel: UserModel = createUserModel(user)
        // const issueModel: IssueModel = createIssueModel(issue)
        
        // before(async () => {
        //     await issuesPage.open()
        //     await issuesPage.createNewIssue()
        //     await issuesPage.addIssueTitle(issueModel.title)
        //     await issuesPage.createIssue()
        // })

        beforeEach(async () => {
            // loginPage = new LoginPage(browser)
            // mainPage = new MainPage(browser)
            // repositoriesPage = new RepositoriesPage(browser)
            // issuesPage = new IssuesPage(browser)

            await issuesPage.open()
            // await loginPage.login(userModel)
            // await repositoriesPage.open()
            // await repositoriesPage.openRepository()
            // await repositoriesPage.openIssuesTab()
            // await issuesPage.createNewIssue()
            // await issuesPage.addIssueTitle(issueModel.title)
            // await issuesPage.createIssue()
        })

        it('Issue title should be edit', async () => {
            await issuesPage.searchIssue(issueModel.title)
            browser.keys('Enter')
            await issuesPage.openIssue()
            await issuesPage.editIssue()
            await issuesPage.addIssueTitle(editIssue.title)
            await issuesPage.updateIssue()
            await issuesPage.waitIssueDisplayed()

            expect(await issuesPage.getIssueTitleText()).toEqual(editIssue.title)
        })
    })
})