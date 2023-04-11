import { AxiosRequestConfig, AxiosResponse } from "axios";
import { GitAPIProvider } from "./GitApiProvider";
import { CreateIssueRequest } from "../api-data-provider/IssueAPIDataProvider";
import { UserAPIProvider } from "./UserAPIProvider";

class IssueAPIProvider extends GitAPIProvider {
    public create<T>(login: string, repo: string, data: CreateIssueRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = GitAPIProvider.configureRequest(
            `/repos/${login}/${repo}/issues`,
            'POST',
            this.headers,
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }

    public getIssues<T>(login: string, repo: string): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = UserAPIProvider.configureRequest(
            `/repos/${login}/${repo}/issues`,
            'GET',
            this.headers,
        )
        return this.sendRequest(config)
    }
}

export {
    IssueAPIProvider,
}