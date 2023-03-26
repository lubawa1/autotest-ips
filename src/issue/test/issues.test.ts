import { LoginPage } from '../../login/page-object/Login.page'
import { createUserModel, UserModel } from '../../users/model/user.model'
import { user } from '../../users/data/user.data'
import { RepositoriesPage } from '../page-object/Repositories.page'
import { createIssueModel, IssueModel } from '../model/issue.model'
import { issue, issueComment } from '../data/issue.data'
import { IssuesPage } from '../page-object/Issues.page'
import { attach, attachName, issueAttach, issueClose, issueCommentLock, issueDelete, issueEdit, issueNewTitle } from '../data/attach.data'

describe('Issues test', () => {
    let loginPage: LoginPage
    let repositoriesPage: RepositoriesPage
    let issuesPage: IssuesPage
    const userModel: UserModel = createUserModel(user)
    const issueModel: IssueModel = createIssueModel(issue)

    before(async () => {
        loginPage = new LoginPage(browser)
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

        beforeEach(async () => {
            await issuesPage.open()
        })

        it('Issue title should be edit', async () => {
            await issuesPage.createNewIssue()
            await issuesPage.addIssueTitle(issueEdit)
            await issuesPage.createIssue()
            await issuesPage.editIssue()
            await issuesPage.addIssueTitle(issueNewTitle)
            await issuesPage.updateIssue()
            await issuesPage.waitIssueDisplayed()

            expect(await issuesPage.getIssueTitleText()).toEqual(issueNewTitle)
        })

        it('Attach file should be upload to issue', async () => {
            await issuesPage.createNewIssue()
            await issuesPage.addIssueTitle(issueAttach)
            await issuesPage.createIssue()
            await issuesPage.attachFile(attach)
            await browser.pause(5000)
            await issuesPage.submitComment()

            expect(await issuesPage.getAttachNameText()).toEqual(attachName)
        })

        it('Comment should be add to issue', async () => {
            await issuesPage.createNewIssue()
            await issuesPage.addIssueTitle(issueComment.title)
            await issuesPage.createIssue()
            await issuesPage.addIssueComment(issueComment.comment)
            await issuesPage.submitComment()

            expect(await issuesPage.getCommentText()).toEqual(issueComment.comment)
        })

        it('Comment should be locked', async () => {
            await issuesPage.createNewIssue()
            await issuesPage.addIssueTitle(issueCommentLock)
            await issuesPage.createIssue()
            await issuesPage.lockComment()

            expect(await issuesPage.isIconLockDisplayed()).toEqual(true)
        })

        it('Issue should be closed', async () => {
            await issuesPage.createNewIssue()
            await issuesPage.addIssueTitle(issueClose)
            await issuesPage.createIssue()
            await issuesPage.closeIssue()

            expect(await issuesPage.isDisplayedReopenButton()).toEqual(true)
        })

        it('Issue should be deleted', async() => {
            await issuesPage.createNewIssue()
            await issuesPage.addIssueTitle(issueDelete)
            await issuesPage.createIssue()
            await issuesPage.deleteIssue()
            await issuesPage.searchIssue(issueDelete)
            await browser.keys('Enter')
            await issuesPage.waitNoResultIconDesplayed()

            expect(await issuesPage.isNoResultIconDesplayed()).toEqual(true)
        })

        // it('Comment should be deleted', async() => {
        //     await issuesPage.createNewIssue()
        //     await issuesPage.addIssueTitle(issueComment.title)
        //     await issuesPage.createIssue()
        //     await issuesPage.addIssueComment(issueComment.comment)
        //     await issuesPage.submitComment()

        // })

        it('Issue should be pined', async() => {
            await issuesPage.createNewIssue()
            await issuesPage.addIssueTitle(issue.title)
            await issuesPage.createIssue()
            await issuesPage.PinIssue()
            await issuesPage.open()
            await issuesPage.waitPinIssuesList()

            expect(await issuesPage.getPinIssueText()).toEqual(issue.title)
        })
    })
})