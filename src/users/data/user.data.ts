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

function createUserData(mask: string): UserData {
    return {
        login: LOGIN,
        password: PASSWORD,
        email: EMAIL,
        name: `${mask}-user-${getRandomString(6)}`,
        bio: `@KonstantinPrik`,
        pronouns: `she/her`,
        filePath: `src/files/kitty.jpg`,
    }
}

export {
    UserData,
    createUserData,
}