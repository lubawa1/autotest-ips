import { IssueData } from "../data/issue.data"


type IssueModel = {
    title: number,
    body: string,
}

function createIssueModel(data: IssueData): IssueModel {
    return {
        title: data.title,
        body: data.comment,
    }
}


export {
    createIssueModel,
    IssueModel,
}