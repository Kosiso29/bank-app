import * as actionTypes from "../actions/actionTypes";

const initialState = {
    alertState: {
        show: false,
        variant: "",
        message: ""
    }
}

const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ALERT_STATE:
            return {
                ...state,
                alertState: action.alertState
            }
        default:
            return state;
    }
}

export default alertReducer;