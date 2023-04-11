import { PERSONAL_TOKEN } from '../../../credentials';
import axios, {AxiosRequestConfig, AxiosResponse, AxiosRequestHeaders, Method} from  'axios';

class GitAPIProvider {
    protected headers: AxiosRequestHeaders = {}
    protected personalToken = PERSONAL_TOKEN
    protected isSuccessful: boolean

    constructor(isSuccessful: boolean = true) {
        this.isSuccessful = isSuccessful
        this.headers = {
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'Authorization': `Bearer ${this.personalToken}`,
        }
    }

    protected static configureRequest(
        methodUrl: string,
        method: Method,
        requestHeaders: AxiosRequestHeaders,
        data?: string): AxiosRequestConfig {
        return {
            method: method,
            url: `https://api.github.com${methodUrl}`,
            headers: requestHeaders,
            data: data,
        }
    } 

    public sendRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        if (this.isSuccessful) {
            return axios(config)
    } 
          return axios(config)
        .then(response => response)
        .catch(error => error.response) }
}

export {
    GitAPIProvider
}