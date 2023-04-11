import { AxiosResponse } from "axios"
import { IssueModel } from "../../../src/issue/model/issue.model"
import { GetIssueRequest, IssueAPIDataProvider } from "../api-data-provider/IssueAPIDataProvider"
import { IssueAPIProvider } from "../api-provider/IssueAPIProvider"

type CreateIssueResponse = {
    id: number,
    title: string,
    state: string,
    html_url: string,
}

type GetIssueResponse = {
    title: string,
}

class IssueAPIService {
    public static async createdIssue(
        login: string,
        repo: string,
        issue: IssueModel,
    ): Promise<AxiosResponse<GetIssueResponse>> {
        try {
            const data: GetIssueRequest = IssueAPIDataProvider.getCreatedIssueData(issue)
            const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider()
            const response: AxiosResponse<GetIssueResponse> = await issueAPIProvider.create(login, repo, data)
            return response
        } catch (error) {
            throw new Error(`Create issue by model failed ${error}`)
        }
    }
}

export {
    CreateIssueResponse,
    GetIssueResponse,
    IssueAPIService
}