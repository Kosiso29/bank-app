import * as actionTypes from "./actionTypes";

export const updateUserDashboard = (userData) => {
    return {
        type: actionTypes.SET_USER_DASHBOARD_DATA,
        userData: userData
    }
}