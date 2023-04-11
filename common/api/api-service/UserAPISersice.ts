import { UserModel } from "../../../src/users/model/user.model";
import { UserAPIProvider } from "../api-provider/UserAPIProvider";
import { UpdateUserRequest, UserAPIDataProvider } from "../api-data-provider/UserAPIDataProvider";
import { AxiosResponse } from 'axios'

type GetUserResponse = {
    blog: string,
    name: string,
}

class UserAPIService {
    public static async updateAuthentificatedUser(user: UserModel): Promise<AxiosResponse<GetUserResponse>> {
        try {
            const data: UpdateUserRequest = UserAPIDataProvider.getUpdatedUserData(user)
            const userAPIProvider: UserAPIProvider = new UserAPIProvider()
            const response: AxiosResponse<GetUserResponse> = await userAPIProvider.updateAuthentificatedUser(data)
            return response
        } catch (error) {
            throw new Error(`Update user by model failed ${error}`)
        }
    }
}

export {
    UserAPIService
}