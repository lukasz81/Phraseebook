import {
    FETCH_REQUEST,
    FETCH_FAIL,
    FETCH_SUCCESS
} from './actionTypes';

const initialState = {
    isLoggedIn: true,
    notifications: null
};

export function appReducer(state = initialState, action) {

    switch (action.type) {
        //Fetching Notifications
        case FETCH_REQUEST:
            return {
                ...state,
                isWaiting: action.isWaiting
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                isWaiting: action.isWaiting,
                notifications: action.notifications
            };
        case FETCH_FAIL:
            return {
                ...state,
                isWaiting: action.isWaiting,
                error: action.error
            };
        default:
            return state
    }
}