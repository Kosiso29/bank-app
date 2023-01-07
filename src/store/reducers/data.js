import * as actionTypes from "../actions/actionTypes";

const initialState = {
    userData: {
        sickLeave: 0,
        remainingSickLeave: 0,
        totalSickLeaveTaken: 0,
        annualLeave: 0,
        remainingAnnualLeave: 0,
        totalAnnualLeaveTaken: 0,
        employeeId: "",
        firstName: "",
        lastName: "",
        jobRole: "",
        microsoftAuthString: "",
        userType: ""
    }
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_DASHBOARD_DATA:
            return {
                ...state,
                userData: action.userData
            }
        default:
            return state;
    }
}

export default dataReducer;