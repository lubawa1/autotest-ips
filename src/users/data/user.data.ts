import { LOGIN, PASSWORD, EMAIL } from '../../../credentials'
import { getRandomString } from '../../random.data'

type UserData = {
    login: string,
    password: string,
    email?: string,
    name?: string,
    bio?: string,
    pronouns?: string,
    filePath?: string,
}

const user: UserData = {
    login: LOGIN,
    password: PASSWORD,
    email: EMAIL,
    name: `user-${getRandomString(6)}`,
    bio: `@KonstantinPrik`,
    pronouns: `she/her`,
    filePath: `src/files/kitty.jpg`,
}

export {
    UserData,
    user,
}