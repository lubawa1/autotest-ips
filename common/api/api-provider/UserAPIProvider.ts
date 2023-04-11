import { UpdateUserRequest } from "../api-data-provider/UserAPIDataProvider"
import { GitAPIProvider } from "./GitApiProvider"
import axios, {AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders, Method} from  'axios'

class UserAPIProvider extends GitAPIProvider {
    public getUser<T>(): Promise<AxiosResponse<T>> {
        const apiRequest: AxiosRequestConfig = UserAPIProvider.configureRequest(
            '/user',
            'GET',
            this.headers,
        )
        return this.sendRequest(apiRequest)
    }

    public update<T>(login: string, repo: string, data: UpdateUserRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = GitAPIProvider.configureRequest(
            `/repos/${login}/${repo}/user`,
            'POST',
            this.headers,
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }

    public updateAuthentificatedUser<T>(data: UpdateUserRequest): Promise<AxiosResponse<T>> {
        const apiRequest: AxiosRequestConfig = UserAPIProvider.configureRequest(
            '/user',
            'PATCH',
            this.headers,
            JSON.stringify(data),
        )
        return this.sendRequest(apiRequest)
    }
}

export {
    UserAPIProvider,
}
