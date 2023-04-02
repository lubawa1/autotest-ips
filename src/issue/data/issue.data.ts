import { getRandomString } from '../../random.data'

type IssueData = {
    title: string,
    body?: string,
    filePath?: string,
    fileName?: string,
    comment?: string,
    status?: string,
}

const issue: IssueData = {
    title: `Issue-${getRandomString(6)}`,
    body: `Issue body-${getRandomString(7)}`,
    filePath: `src/files/test.docx`,
    fileName: `test.docx`,
    comment: `Issue comment-${getRandomString(8)}`,
    status: `is:open`,
}

export {
    IssueData,
    issue,
}