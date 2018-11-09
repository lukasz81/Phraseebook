import * as actionTypes from '../Redux/actionTypes';
const URL = 'http://www.mocky.io/v2/5b4315f12e00004c002230c3';
export const fetchTrackersAction = (dispatch) => {

    fetch(URL)
        .then(
            response => response.json().then(
                data => {
                    return dispatch({
                                type: actionTypes.FETCH_SUCCESS,
                                isWaiting: false,
                                notifications: data
                            })
                }
            )
        )
        .catch(
            error => {
                return dispatch({
                    type: actionTypes.FETCH_FAIL,
                    isWaiting: false,
                    error: error.message
                })}
        );

    return dispatch({
        type: actionTypes.FETCH_REQUEST,
        isWaiting: true
    })
};