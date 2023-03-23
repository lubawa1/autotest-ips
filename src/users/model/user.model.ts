import { UserData } from "../data/user.data"

type UserModel = {
    login: string,
    password: string,
    email: string,
}

function createUserModel(data: UserData): UserModel {
    return {
        login: data.login,
        password: data.password,
        email: data.email,
    }
}

export {
    createUserModel,
    UserModel,
}