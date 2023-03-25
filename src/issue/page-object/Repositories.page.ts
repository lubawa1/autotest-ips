import { ChainablePromiseElement } from 'webdriverio'

class RepositoriesPage {
    protected browser: WebdriverIO.Browser
    protected url = 'https://github.com/lubawa1?tab=repositories'

    constructor(browser: WebdriverIO.Browser) {
        this.browser = browser
    }

    public async open(): Promise<void> {
        await this.browser.url(this.url)
        await this.waitRepositoriesList()
    }

    public async waitRepositoriesList(): Promise<void> {
        await this.getRepositoriesList().waitForDisplayed({
            timeoutMsg: 'Repositories list was not displayed'
        })
    }

    public async openRepository(): Promise<void> {
        await this.getRepositoryName().waitForClickable({
            timeoutMsg: 'Repository was not clicable'
        })
        await this.getRepositoryName().click()
    }

    public async openIssuesTab(): Promise<void> {
        await this.getIssuesButton().waitForClickable({
            timeoutMsg: 'Issues button was not clicable'
        })
        await this.getIssuesButton().click()
    }

    // public async createNewIssue(): Promise<void> {
    //     await this.getCreateIssueButton().waitForClickable({
    //         timeoutMsg: 'New issue button was not clicable'
    //     })
    //     await this.getCreateIssueButton().click()
    // }

    // public async addIssueTitle(title: string): Promise<void> {
    //     await this.getIssueTitleField().waitForDisplayed({
    //         timeoutMsg: 'Issue title was not displayed'
    //     })
    //     await this.getIssueTitleField().clearValue()
    //     await this.getIssueTitleField().setValue(title)
    // }

    // public async addIssueBody(body: string): Promise<void> {
    //     await this.getIssueTitleField().waitForDisplayed({
    //         timeoutMsg: 'Issue title was not displayed'
    //     })
    //     await this.getIssueBodyField().clearValue()
    //     await this.getIssueBodyField().setValue(body)
    // }

    // public async createIssue(): Promise<void> {
    //     await this.getSubmitIssueButton().waitForClickable({
    //         timeoutMsg: 'Submit button was not clicable'
    //     })
    //     await this.getSubmitIssueButton().click()
    // }

    // public async waitIssueDisplayed(): Promise<void> {
    //     await this.getIssue().waitForDisplayed({
    //         timeoutMsg: 'Issue was not displayed'
    //     })
    // }

    // public getIssueTitleText(): Promise<string> {
    //     return this.getIssueTitle().getText()
    // }

    // public async editIssue(): Promise<void> {
    //     await this.getEditButton().waitForDisplayed({
    //         timeoutMsg: 'Edit button was not displayed'
    //     })
    //     await this.getEditButton().click()
    // }

    private getRepositoryName(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//div//*[contains(@href, "lubawa1/autotest-ips")]')
    }

    private getRepositoriesList(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="user-repositories-list"]')
    }

    private getIssuesButton(): ChainablePromiseElement<WebdriverIO.Element> {
        return this.browser.$('//*[@id="issues-tab"]')
    }

//     private getCreateIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
//         return this.browser.$('//turbo-frame//*[contains(@data-hotkey,"c")]')
//     }

//     private getIssueTitleField(): ChainablePromiseElement<WebdriverIO.Element> {
//         return this.browser.$('//*[@id="issue_title"]')
//     }

//     private getIssueBodyField(): ChainablePromiseElement<WebdriverIO.Element> {
//         return this.browser.$('//*[@id="issue_body"]')
//     }

//     private getSubmitIssueButton(): ChainablePromiseElement<WebdriverIO.Element> {
//         return this.browser.$('//div//*[contains(@class,"btn-primary btn ml-2")]')
//     }

//     private getIssue(): ChainablePromiseElement<WebdriverIO.Element> {
//         return this.browser.$('//*[@id="show_issue"]')
//     }

//     private getIssueTitle(): ChainablePromiseElement<WebdriverIO.Element> {
//         return this.browser.$('//div//*[contains(@class,"js-issue-title markdown-title")]')
//     }

//     private getEditButton(): ChainablePromiseElement<WebdriverIO.Element> {
//         return this.browser.$('//div//*[contains(@class,"js-title-edit-button")]')
//     }
}

export {
    RepositoriesPage
}