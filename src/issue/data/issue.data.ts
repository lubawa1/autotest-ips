import { getRandomString } from '../../random.data'
import { Status } from './closeIssue.data'

type IssueData = {
    title: string,
    body?: string,
    filePath?: string,
    fileName?: string,
    comment?: string,
    status?: Status,
}

function createIssueData(mask: string): IssueData {
    return {
        title: `${mask}-Issue-${getRandomString(6)}`,
        body: `${mask}-Issue body-${getRandomString(7)}`,
        filePath: `src/files/test.docx`,
        fileName: `test.docx`,
        comment: `${mask}-Issue comment-${getRandomString(8)}`,
        status: Status.IS_OPEN,
    }
}

export {
    IssueData,
    createIssueData,
}