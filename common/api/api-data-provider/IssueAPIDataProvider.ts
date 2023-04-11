import { IssueModel } from "../../../src/issue/model/issue.model";
import { IssueAPIProvider } from "../api-provider/IssueAPIProvider";

type CreateIssueRequest = {
    title: string | number,
    body?: string,
    labels?: string[],
}

type GetIssueRequest = {
    title: string | number,
}

class IssueAPIDataProvider extends IssueAPIProvider {
    public static getCreatedIssueData(issues: IssueModel): GetIssueRequest {
        return {
            title: issues.title,
        }
    }
    }

export {
    CreateIssueRequest,
    IssueAPIDataProvider,
    GetIssueRequest
}