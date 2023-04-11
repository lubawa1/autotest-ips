import { AxiosResponse } from "axios"
import { IssueAPIProvider } from "../../../../../common/api/api-provider/IssueAPIProvider"
import { LOGIN, REPO } from "../../../../../credentials"
import { createIssueData } from "../../../data/issue.data"
import { IssueModel, createIssueModel } from "../../../model/issue.model"
import { CreateIssueResponse, GetIssueResponse } from "../../../../../common/api/api-service/IssueAPIService"

const TEST_MASK = 'issue-test'

describe('Post /repos/{login}/{repo}/issues', () => {
    let issue: IssueModel

    beforeEach(() => {
        issue = createIssueModel(createIssueData(TEST_MASK))
    })

    it('Issue should be created', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(
            LOGIN,
            REPO,
            {
                title: issue.title
            }
        )

        expect(response.status).toEqual(201)
        const responseIssue: AxiosResponse<GetIssueResponse[]> = await issueAPIProvider.getIssues(
            LOGIN,
            REPO,
        )

        expect(responseIssue.data.find(issueItem => issueItem.title === issue.title)!.title).toEqual(issue.title)
    })

    it('Response should be 404, if repo not found', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(
            LOGIN,
            `${REPO}1`,
            {
                title: issue.title
            }
        )

        expect(response.status).toEqual(404)

        const responseIssue: AxiosResponse<GetIssueResponse[]> = await issueAPIProvider.getIssues(
            LOGIN,
            REPO,
        )

        expect(responseIssue.data.find(issueItem => issueItem.title === issue.title)).toBeUndefined()
    })

    it('Response should be 410, if not access to repo', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const newRepo = 'lubawa'
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(
            LOGIN,
            newRepo,
            {
                title: issue.title
            }
        )

        expect(response.status).toEqual(410)
    })

    it('Response should be 422, if title is empty', async () => {
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider(false)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.create(
            LOGIN,
            REPO,
            {
                title: '',
            }
        )

        expect(response.status).toEqual(422)
    })
})
