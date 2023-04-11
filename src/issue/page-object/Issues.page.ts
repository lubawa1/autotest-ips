import { ChainablePromiseElement } from 'webdriverio'

class IssuesPage {
    protected browser: WebdriverIO.Browser
    protected url = `https://github.com/lubawa1/autotest-ips/issues`

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async addIssueComment(body: string): Promise<void> {
        await this.getIssueCommentField().waitForDisplayed({
            timeoutMsg: 'Issue title was not displayed'
        })
        await this.getIssueCommentField().clearValue()
        await this.getIssueCommentField().setValue(body)
    }

    public async addIssueTitle(title: string): Promise<void> {
        await this.getIssueTitleField().waitForDisplayed({
            timeoutMsg: 'Issue title was not displayed'
        })
        await this.getIssueTitleField().clearValue()
        await this.getIssueTitleField().setValue(title)
    }

    public async attachFile(attachFile: string): Promise<void> {
        await this.getAttachFile().waitForExist({
            timeoutMsg: 'File input field was not displayed',
        })
        const attach: string = await this.browser.uploadFile(attachFile)
        await this.getAttachFile().setValue(attach)
        await browser.pause(3000)
    }

    public async closeIssue(): Promise<void> {
        await this.getCloseButton().waitForClickable()
        await this.getCloseButton().click()
        await this.getOpenButton().waitForDisplayed({
            timeoutMsg: 'Reopen button was not displayed'
        })
    }

    public async closeIssueStatus(): Promise<void> {
        await this.getReaconCloseButtonList().waitForClickable()
        await this.getReaconCloseButtonList().click()
        await this.getReasonAsNotPlanned().waitForDisplayed({
            timeoutMsg: 'Reason `as not planned` was not displayed'
        })
        await this.getReasonAsNotPlanned().click()
        await this.getCloseButton().click()
        await this.getCloseIssue().waitForDisplayed()
    }

    public async createIssue(): Promise<void> {
        await this.getSubmitIssueButton().waitForClickable({
            timeoutMsg: 'Submit button was not clicable'
        })
        await this.getSubmitIssueButton().click()
    }

    public async createNewIssue(): Promise<void> {
        await this.getCreateIssueButton().waitForClickable({
            timeoutMsg: 'New issue button was not clicable'
        })
        await this.getCreateIssueButton().click()
    }

    public async deleteIssue(): Promise<void> {
        await this.getIconDelete().click()
        await this.getDeleteForm().waitForDisplayed({
            timeoutMsg: 'Delete form was not displayed'
        })
        await this.getDeleteButton().click()
    }

    public async editIssue(): Promise<void> {
        await this.getEditButton().waitForDisplayed({
            timeoutMsg: 'Edit button was not displayed'
        })
        await this.getEditButton().click()
    }

    public getAttachNameText(): Promise<string> {
        return this.getAttachName().getText()
    }

    public getCommentText(): Promise<string> {
        return this.getComment().getText()
    }

    public getFoundIssueName(): Promise<string> {
        return this.getFoundIssue().getText()
    }

    public getIssueTitleText(): Promise<string> {
        return this.getIssueTitle().getText()
    }

    public getPinIssueText(): Promise<string> {
        return this.getPinIssue().getText()
    }

    public isDisplayedCloseStatusIssue(): Promise<boolean> {
        return this.getCloseIssue().isDisplayed()
    }

    public isDisplayedReopenButton(): Promise<boolean> {
        return this.getOpenButton().isDisplayed()
    }

    public isIconLockDisplayed(): Promise<boolean> {
        return this.getIconLock().isDisplayed()
    }

    public isNoResultIconDesplayed(): Promise<boolean> {
        return this.getNoResultIcon().isDisplayed()
    }

    public async lockComment(): Promise<void> {
        await this.getLockComment().click()
        await this.getLockForm().waitForDisplayed({
            timeoutMsg: 'Lock form was not displayed'
        })
        await this.getLockReason().click()
        await this.getValueResolved().waitForDisplayed({
            timeoutMsg: 'Resolve value was not displayed'
        })
        await this.getValueResolved().click()
        await this.getButtonBlock().click()
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async openCreatedIssue(title: string): Promise<void> {
        await this.open()
        await this.searchIssue(title)
        await browser.keys('Enter')
        await this.openIssue()
        await browser.pause(2000)
    }

    public async openIssue(): Promise<void> {
        await this.getFoundIssue().waitForClickable()
        await this.getFoundIssue().click()
    }

    public async pinIssue(): Promise<void> {
        await this.getPinIcon().click()
    }

    public async searchIssue(title: string): Promise<void> {
        await this.getSearch().waitForDisplayed()
        await this.getSearch().clearValue()
        await this.getSearch().setValue(title)
        await browser.keys('Enter')
    }

    public async submitComment(): Promise<void> {
        await this.getSumbitButton().waitForClickable({
            timeoutMsg: 'Submit button is not clicable'
        })
        await this.getSumbitButton().click()
    }

    public async updateIssue(): Promise<void> {
        await this.getUpdateButton().waitForClickable({
            timeoutMsg: 'Submit button was not clicable'
        })
        await this.getUpdateButton().click()
    }

    public async waitFoundIssue(): Promise<void> {
        await this.getFoundIssue().waitForDisplayed({
            timeoutMsg: 'Issue was not displayed'
        })
    }

    public async waitIssueDisplayed(): Promise<void> {
        await this.getIssueTitle().waitForDisplayed({
            timeoutMsg: 'Issue was not displayed'
        })
    }

    public async waitNoResultIconDesplayed(): Promise<void> {
        await this.getNoResultIcon().waitForDisplayed({
            timeoutMsg: 'No result icon was not displayed'
        })
    }

    public async waitPinIssuesList(): Promise<void> {
        await this.getPinIssuesList().waitForDisplayed({
            timeoutMsg: 'Pinned issue was not displayed'
        })
    }

    private getAttachFile(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="fc-new_comment_field"]')
    }

    private getAttachName(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//table//*[contains(@href,"files")]')
    }

    private getButtonBlock(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"btn-block")]')
    }

    private getCloseButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@name="comment_and_close"]')
    }

    private getCloseIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"octicon-skip color-fg-inherit")]')
    }

    private getComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//td//*[contains(@dir,"auto")]')
    }

    private getCreateIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//turbo-frame//*[contains(@data-hotkey,"c")]')
    }

    private getDeleteButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@name="verify_delete"]')
    }

    private getDeleteForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@aria-labelledby="delete-issue-dialog-title"]')
    }

    private getEditButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"js-title-edit-button")]')
    }

    private getFoundIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@data-hovercard-type,"issue")]')
    }

    private getIconDelete(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@class="octicon octicon-trash"]')
    }

    private getIconLock(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"octicon-lock color-fg-inherit")]')
    }

    private getIssueTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"js-issue-title markdown-title")]')
    }

    private getIssueTitleField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getIssueCommentField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="new_comment_field"]')
    }

    private getLockComment(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//summary//*[contains(@class,"octicon-lock")]')
    }

    private getLockForm(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@aria-labelledby="lock-dialog-title"]')
    }

    private getLockReason(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="unlock-reason"]')
    }

    private getNoResultIcon(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"blankslate-spacious")]')
    }

    private getOpenButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@name="comment_and_open"]')
    }

    private getPinIcon(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@aria-label,"Maximum 3 pinned issues")]')
    }

    private getPinIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//span//*[contains(@class,"h4 markdown-title")]')
    }

    private getPinIssuesList(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[contains(@class,"pinned-issue-item")]')
    }

    private getReasonAsNotPlanned(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"octicon-skip color-fg-muted")]')
    }

    private getReaconCloseButtonList(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@aria-label,"Select close issue reason")]')
    }

    private getSearch(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-issues-search"]')
    }

    private getSumbitButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"color-bg-subtle ml-1")]')
    }

    private getSubmitIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"btn-primary btn ml-2")]')
    }

    private getUpdateButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@data-disable-with,"Updating")]')
    }

    private getValueResolved(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//select//*[contains(@value,"Resolved")]')
    }
}

export {
    IssuesPage
}


