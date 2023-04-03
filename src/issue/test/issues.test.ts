import { LoginPage } from '../../login/page-object/Login.page'
import { createUserModel, UserModel } from '../../users/model/user.model'
import { createIssueModel, IssueModel } from '../model/issue.model'
import { IssuesPage } from '../page-object/Issues.page'
import { Status } from '../data/closeIssue.data'
import { createIssueData } from '../data/issue.data'
import { createUserData } from '../../users/data/user.data'

const TEST_MASK = 'issue-test'

describe('Issues test', () => {
    let loginPage: LoginPage
    let issuesPage: IssuesPage
    const userModel: UserModel = createUserModel(createUserData(TEST_MASK))
    let issueModel: IssueModel

    before(async () => {
        loginPage = new LoginPage(browser)
        issuesPage = new IssuesPage(browser)

        await loginPage.open()
        await loginPage.login(userModel)
        await issuesPage.open()
    })

    beforeEach(async () => {
        issueModel = createIssueModel(createIssueData(TEST_MASK))
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
            await issuesPage.createNewIssue()
            await issuesPage.addIssueTitle(issueModel.title)
            await issuesPage.createIssue()
        })

        it('Issue should be deleted', async () => {
            await issuesPage.deleteIssue()
            await issuesPage.searchIssue(issueModel.title)
            await browser.keys('Enter')
            await issuesPage.waitNoResultIconDesplayed()

            expect(await issuesPage.isNoResultIconDesplayed()).toEqual(true)
        })

        describe('Issues test', () => {
            it('Issue title should be edit', async () => {
                await issuesPage.editIssue()
                await issuesPage.addIssueTitle(issueModel.title)
                await issuesPage.updateIssue()
                await issuesPage.waitIssueDisplayed()

                expect(await issuesPage.getIssueTitleText()).toEqual(issueModel.title)
            })

            it('Attach file should be upload to issue', async () => {
                await issuesPage.attachFile(issueModel.filePath!)
                await browser.pause(5000)
                await issuesPage.submitComment()

                expect(await issuesPage.getAttachNameText()).toEqual(issueModel.fileName!)
            })

            it('Comment should be add to issue', async () => {
                await issuesPage.addIssueComment(issueModel.comment!)
                await issuesPage.submitComment()

                expect(await issuesPage.getCommentText()).toEqual(issueModel.comment!)
            })

            it('Comment should be locked', async () => {
                await issuesPage.lockComment()

                expect(await issuesPage.isIconLockDisplayed()).toEqual(true)
            })

            it('Issue should be closed', async () => {
                await issuesPage.closeIssue()

                expect(await issuesPage.isDisplayedReopenButton()).toEqual(true)
            })

            it('Issue should be pined', async () => {
                await issuesPage.pinIssue()
                await issuesPage.open()
                await issuesPage.waitPinIssuesList()

                expect(await issuesPage.getPinIssueText()).toEqual(issueModel.title)
            })

            it('Search. Issue should be found at list', async () => {
                await issuesPage.open()
                await issuesPage.searchIssue(`${issueModel.title} ${Status.IS_CLOSED}`)
                await browser.keys('Enter')
                await issuesPage.waitNoResultIconDesplayed()
                await issuesPage.searchIssue(`${issueModel.title} ${issueModel.status}`)
                await browser.keys('Enter')
                await issuesPage.waitFoundIssue()

                expect(await issuesPage.getFoundIssueName()).toEqual(issueModel.title)
            })

            it('Issue should be closed this status `as not planned`', async () => {
                await issuesPage.closeIssueStatus()

                expect(await issuesPage.isDisplayedCloseStatusIssue()).toEqual(true)
            })

            afterEach(async () => {
                await issuesPage.open()
                await issuesPage.searchIssue(issueModel.title)
                await browser.keys('Enter')
                await issuesPage.openIssue()
                await issuesPage.deleteIssue()
            })
        })
    })
})