import * as actionTypes from "../actions/actionTypes";

const initialState = {
    email: "",
    userId: "",
    userType: "",
    loggedIn: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_VERIFY_EMAIL:
            return {
                ...state,
                email: action.email,
                userId: action.userId,
                userType: action.userType
            }
        case actionTypes.AUTH_CHECK_STATE:
            return {
                ...state,
                email: action.email,
                userId: action.userId,
                userType: action.userType
            }
        case actionTypes.AUTH_INITIATE_LOGOUT:
            return {
                ...state,
                email: "",
                userId: "",
                userType: ""
            }
        default:
            return state;
    }
}

export default authReducer;