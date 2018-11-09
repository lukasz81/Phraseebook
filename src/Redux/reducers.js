import {
    FETCH_REQUEST,
    FETCH_FAIL,
    FETCH_SUCCESS,
    IS_READ
} from './actionTypes';

const initialState = {
    isLoggedIn: true,
    notifications: null,
    isNotificationRead: null
};

export function appReducer(state = initialState, action) {

    switch (action.type) {
        //Mark as read
        case IS_READ:
            return {
                ...state,
                isNotificationRead: action.isNotificationRead
            };
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