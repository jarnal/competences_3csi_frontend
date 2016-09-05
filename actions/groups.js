/**
 * Created by jonathan on 30/08/2016.
 */

import { getAllGroupsAPI } from '../services/GroupService'

export const GROUPS_REQUEST = "GROUPS_REQUEST";
export const GROUPS_SUCCESS = "GROUPS_SUCCESS";
export const GROUPS_FAILURE = "GROUPS_FAILURE";
export const GROUP_SELECTED = "GROUP_SELECTED";
export const GROUP_ADD_ACTION_CALLBACK = "GROUP_ADD_CALLBACK";

export function getAllGroups(){
    return dispatch => {
        dispatch(groupsRequest());

        getAllGroupsAPI((err, res) => {
            if(err){
                dispatch(groupsFailure(err));
                return;
            }

            const {text} = res;
            const json = JSON.parse(text);
            const {groups} = json;

            dispatch(groupsSuccess(groups));
        });
    }
}

export function groupSelected(group){
    return {type: GROUP_SELECTED, group};
}

export function addGroupSelectedActionCallback(actionCallback){
    return {type: GROUP_ADD_ACTION_CALLBACK, actionCallback}
}

//
export function groupsRequest(){
    return {type: GROUPS_REQUEST}
}

//
export function groupsFailure(error){
    return {type: GROUPS_FAILURE, error}
}

//
export function groupsSuccess(data){
    return {type: GROUPS_SUCCESS, data}
}

