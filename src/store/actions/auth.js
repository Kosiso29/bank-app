import * as actionTypes from "./actionTypes";

export const authVerifyEmail = (username, token) => {
    localStorage.setItem('username', username);
    localStorage.setItem('token', token);
    return {
        type: actionTypes.AUTH_VERIFY_EMAIL,
        username,
        token
    }
}

export const authCheckState = () => {
    const email = localStorage.getItem('email');
    const userId = localStorage.getItem('userId');
    const userType = localStorage.getItem('userType');
    return {
        type: actionTypes.AUTH_CHECK_STATE,
        email: email,
        userId: userId,
        userType: userType
    }
};

export const authInitiateLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};