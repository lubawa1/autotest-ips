import { IssueData } from "../data/issue.data"

type IssueModel = {
    title: string,
    body?: string,
    filePath?: string,
    fileName?: string,
    comment?: string,
    status?: string,
}

function createIssueModel(data: IssueData): IssueModel {
    return {
        title: data.title,
        body: data.body,
        filePath: data.filePath,
        fileName: data.fileName,
        comment: data.comment,
        status: data.status,
    }
}

export {
    createIssueModel,
    IssueModel,
}