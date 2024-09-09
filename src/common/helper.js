import { USER_INFO_KEY } from "./const";


export const getUserInfo = () => {
    return JSON.parse(sessionStorage.getItem(USER_INFO_KEY));
}

export const setUserInfo = (obj) => {
    sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(obj || {}));
}
