import { PerModuleNameCache, removeEmitHelper } from 'typescript'
import { ChainablePromiseElement } from 'webdriverio'

class IssuesPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/lubawa1/autotest-ips/issues'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
    }

    public async createNewIssue(): Promise<void> {
        await this.getCreateIssueButton().waitForClickable({
            timeoutMsg: 'New issue button was not clicable'
        })
        await this.getCreateIssueButton().click()
    }

    public async addIssueTitle(title: string): Promise<void> {
        await this.getIssueTitleField().waitForDisplayed({
            timeoutMsg: 'Issue title was not displayed'
        })
        await this.getIssueTitleField().clearValue()
        await this.getIssueTitleField().setValue(title)
    }

    public async addIssueBody(body: string): Promise<void> {
        await this.getIssueTitleField().waitForDisplayed({
            timeoutMsg: 'Issue title was not displayed'
        })
        await this.getIssueBodyField().clearValue()
        await this.getIssueBodyField().setValue(body)
    }

    public async createIssue(): Promise<void> {
        await this.getSubmitIssueButton().waitForClickable({
            timeoutMsg: 'Submit button was not clicable'
        })
        await this.getSubmitIssueButton().click()
    }

    public async waitIssueDisplayed(): Promise<void> {
        await this.getIssueTitle().waitForDisplayed({
            timeoutMsg: 'Issue was not displayed'
        })
    }

    public getIssueTitleText(): Promise<string> {
        return this.getIssueTitle().getText()
    }

    public async editIssue(): Promise<void> {
        await this.getEditButton().waitForDisplayed({
            timeoutMsg: 'Edit button was not displayed'
        })
        await this.getEditButton().click()
    }
    
    public async updateIssue(): Promise<void> {
        await this.getUpdateButton().waitForClickable({
            timeoutMsg: 'Submit button was not clicable'
        })
        await this.getUpdateButton().click()
    }

    public async searchIssue(title: string): Promise<void> {
        await this.getSearch().waitForDisplayed()
        await  this.getSearch().clearValue
        await this.getSearch().setValue(title)
    }

    public async openIssue(): Promise<void> {
        await this.getFoundIssue().waitForDisplayed({
            timeoutMsg: 'Issue was not displayed'
        })
        await this.getFoundIssue().click()
    }

    private getCreateIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//turbo-frame//*[contains(@data-hotkey,"c")]')
    }

    private getIssueTitleField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_title"]')
    }

    private getIssueBodyField(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issue_body"]')
    }

    private getSubmitIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"btn-primary btn ml-2")]')
    }

    private getIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="show_issue"]')
    }

    private getIssueTitle(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"js-issue-title markdown-title")]')
    }

    private getEditButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@class,"js-title-edit-button")]')
    }

    private getUpdateButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@data-disable-with,"Updating")]')
    }

    private getSearch(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="js-issues-search"]')
    }

    private getFoundIssue(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@data-hovercard-type,"issue")]')
    }
}

export {
    IssuesPage
}
