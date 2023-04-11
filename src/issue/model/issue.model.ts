import { EmptyIssueData, IssueData } from "../data/issue.data"

type IssueModel = {
    title: string,
    body?: string,
    filePath?: string,
    fileName?: string,
    comment?: string,
    status?: string,
}

type EmptyIssueModel = {
    title: null,
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

function createEmptyModel(data: EmptyIssueData): EmptyIssueModel {
    return {
        title: data.title,
    }
}

export {
    createIssueModel,
    IssueModel,
}