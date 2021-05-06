import "./actionTypes"
import {UPDATE_USER_AVATAR} from "./actionTypes";

export const updateUserAvatar = (avatarPath) => {
    return {
        type: UPDATE_USER_AVATAR,
        imagePath: avatarPath
    }
}