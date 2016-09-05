/**
 * Created by jonathan on 02/09/2016.
 */

import { USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE, USER_SELECTED } from '../actions/users'
import { GROUP_SELECTED } from '../actions/groups'

const initialState = {
    data : [],
    request : null,
    inProgress : false,
    error : null,
    selected : null,
    needsFetching: false
};

function users(state = initialState, action) {
    switch (action.type) {
        case GROUP_SELECTED:
            console.log();
            return Object.assign({}, state, {
                needsFetching: true
            });
        case USERS_REQUEST:
            return Object.assign({}, state, {
                inProgress: true,
                needsFetching: false
            });
            return state;
        case USERS_SUCCESS:
            return Object.assign({}, state, {
                data : action.data,
                inProgress: false
            });
        case USERS_FAILURE:
            return Object.assign({}, state, {
                inProgress: false,
                error: action.error
            });
        case USER_SELECTED:
            return Object.assign({}, state, {
                selected: action.user
            });
        default:
            return state
    }
}

export default users