type IssueData = {
    title: string,
    body: string,
}

const issue: IssueData = {
    title: 'Issue 1',
    body: '@KonstantinPrik',
}

const editIssue: IssueData = {
    title: 'New issue 1',
    body: 'Edit issue 1'
}

export {
    IssueData,
    issue,
    editIssue
}