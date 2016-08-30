/**
 * Created by jonathan on 29/08/2016.
 */

import {ADD_ASYNC_CALL, REMOVE_ASYNC_CALL, REMOVE_ALL_ASYNC_CALL} from '../actions/actions'

const initialState = {
    promises: {
        groups:[],
        users:[]
    }
};

function promises(state = initialState, action) {
    switch (action.type) {
        case ADD_ASYNC_CALL:
            return Object.assign({}, state, {
                promises : Object.assign({}, state.promises, {
                    [`${action.category}`] : [
                        ...state.promises[`${action.category}`],
                        action.promise
                    ]
                })
            });
        case REMOVE_ASYNC_CALL:
            return Object.assign({}, state, {
                promises : Object.assign({}, state.promises, {
                    [`${action.category}`] : []
                })
            });
        case REMOVE_ALL_ASYNC_CALL:
            return Object.assign({}, state, {
                promises : {
                    groups : [],
                    users : []
                }
            });
        default:
            return state
    }
}

export default promises