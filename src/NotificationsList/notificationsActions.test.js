import * as actions from './notificationsActions';
import * as types from '../Redux/actionTypes';

describe('actions', () => {

    it('should create an action to mark as read', () => {
        const expectedAction = {
            type: types.IS_READ,
        };
        expect(actions.markAsReadActions( () => {return {type: "IS_READ"}} )).toEqual(expectedAction)
    });

    it('should create an action to fetch notifications', () => {
        const expectedAction = {
            type: types.FETCH_SUCCESS,
            isWaiting: false,
            notifications: []
        };
        expect(actions.fetchNotificationsAction( () => {return expectedAction} )).toEqual(expectedAction)
    })

});
