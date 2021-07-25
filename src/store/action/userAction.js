import "./actionTypes"
import {UPDATE_USER_AVATAR, UPDATE_USER_NICKNAME} from "./actionTypes";

export const updateUserAvatar = (avatarPath) => {
    return {
        type: UPDATE_USER_AVATAR,
        imagePath: avatarPath
    }
}


export const updateUserNickName = (nickname) => {
    return {
        type: UPDATE_USER_NICKNAME,
        nickname
    }
}

