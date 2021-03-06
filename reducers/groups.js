/**
 * Created by jonathan on 30/08/2016.
 */

import {GROUPS_REQUEST, GROUPS_SUCCESS, GROUPS_FAILURE, GROUP_SELECTED, GROUP_ADD_ACTION_CALLBACK} from '../actions/groups'

const initialState = {
    data : [],
    request : null,
    inProgress : false,
    error : null,
    selected : null,
    actionCallback: null
};

function groups(state = initialState, action) {
    switch (action.type) {
        case GROUPS_REQUEST:
            return Object.assign({}, state, {
                inProgress: true
            });
            return state;
        case GROUPS_SUCCESS:
            return Object.assign({}, state, {
                data : action.data,
                inProgress: false
            });
        case GROUPS_FAILURE:
            return Object.assign({}, state, {
                inProgress: false,
                error: action.error
            });
        case GROUP_SELECTED:
            return Object.assign({}, state, {
                selected: action.group
            });
        case GROUP_ADD_ACTION_CALLBACK:
            return Object.assign({}, state, {
                actionCallback: action.actionCallback
            });
        default:
            return state
    }
}

export default groups