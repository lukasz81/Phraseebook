import {appReducer} from './reducers';
import * as actions from './actionTypes';
import {FETCH_REQUEST} from "./actionTypes";

describe('App reducer', () => {

    it('should return the initial state', () => {
        const defaultState = {
            notifications: []
        };
        expect(appReducer(undefined, {})).toEqual(defaultState);
    });

    it('should handle IS_READ action', () => {
        const isreadAction = {
            type: actions.IS_READ
        };
        const output = {notifications:[{isRead: true},{isRead: true}]};
        expect(appReducer({notifications:[{},{}]}, isreadAction)).toEqual(output);
    });

    it('should handle FETCH_REQUEST action', () => {
        const fetchRequest = {
            type: actions.FETCH_REQUEST,
            isWaiting: true
        };
        const output = {isWaiting: true};
        expect(appReducer({}, fetchRequest)).toEqual(output);
    });

    it('should handle FETCH_FAIL action', () => {
        const fetchRequest = {
            type: actions.FETCH_FAIL,
            isWaiting: false,
            error:  'This is error'
        };
        const output = {isWaiting: false, error: 'This is error'};
        expect(appReducer({}, fetchRequest)).toEqual(output);
    });

    it('should handle FETCH_SUCCESS action', () => {
        const fetchRequest = {
            type: actions.FETCH_SUCCESS,
            isWaiting: false,
            notifications: []
        };
        const output = {isWaiting: false, notifications: []};
        expect(appReducer({}, fetchRequest)).toEqual(output);
    });
});