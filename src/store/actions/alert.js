import * as actionTypes from "./actionTypes";

export const alertUpdate = (alertState) => {
    return {
        type: actionTypes.SET_ALERT_STATE,
        alertState: alertState
    }
}