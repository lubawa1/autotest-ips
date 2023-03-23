import { LOGIN, PASSWORD, EMAIL } from '../../../credentials'

type UserData = {
    login: string,
    password: string,
    email: string
}

const user: UserData = {
    login: LOGIN,
    password: PASSWORD,
    email: EMAIL,
}

export {
    UserData,
    user
}