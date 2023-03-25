import { ProfileData } from "../data/profile.data"

type ProfileModel = {
    name: string,
    bio: string,
    pronouns: string,
    filePath: string,
}

function createUserProfile(data: ProfileData): ProfileModel {
    return {
        name: data.name,
        bio: data.bio,
        pronouns: data.pronouns,
        filePath: data.filePath
    }
}

export {
    createUserProfile,
    ProfileModel,
}