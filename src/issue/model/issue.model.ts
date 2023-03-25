import { IssueData } from "../data/issue.data"


type IssueModel = {
    title: string,
    body: string,
}

function createIssueModel(data: IssueData): IssueModel {
    return {
        title: data.title,
        body: data.body,
    }
}

export {
    createIssueModel,
    IssueModel,
}