/**
 * Created by jonathan on 02/09/2016.
 */

import { getGroupUsersAPI } from '../services/GroupService'

export const USERS_REQUEST = "USERS_REQUEST";
export const USERS_SUCCESS = "USERS_SUCCESS";
export const USERS_FAILURE = "USERS_FAILURE";
export const USER_SELECTED = "USER_SELECTED";

//
export function getUsersByGroup(groupID) {
    console.log("getUsersBjdâozejd zpeo dj")
    return dispatch => {

        dispatch(usersRequest());
        let request = getGroupUsersAPI(groupID, (err, res) => {
            if(err){
                dispatch(usersFailure(err));
                return;
            }

            const {text} = res;
            const json = JSON.parse(text);
            dispatch(usersSuccess(json));
        });
    };
}

//
export function userSelected(user) {
    return {type: USER_SELECTED, user};
}

//
export function usersRequest(){
    return {type: USERS_REQUEST}
}

//
export function usersFailure(error){
    return {type: USERS_FAILURE, error}
}

//
export function usersSuccess(data){
    return {type: USERS_SUCCESS, data}
}