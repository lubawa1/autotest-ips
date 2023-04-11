import { UserModel } from '../../../src/users/model/user.model';

type UpdateUserRequest = {
    bio: string,
    name: string,
}

class UserAPIDataProvider {
    public static getUpdatedUserData(user: UserModel): UpdateUserRequest {
        return {
            bio: user.bio!,
            name: user.name!,
        }
    }
}

export {
    UserAPIDataProvider,
    UpdateUserRequest
}