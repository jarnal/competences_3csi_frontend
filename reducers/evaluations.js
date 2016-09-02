/**
 * Created by jonathan on 30/08/2016.
 */

import {EVALUATION_ADD_USER, EVALUATION_REMOVE_USER, EVALUATION_ADD_ALL_USER, EVALUATION_REMOVE_ALL_USER } from '../actions/evaluations'
import {EVALUATION_ADD_COMPETENCE, EVALUATION_REMOVE_COMPETENCE, EVALUATION_ADD_ALL_COMPETENCE, EVALUATION_REMOVE_ALL_COMPETENCE} from '../actions/evaluations'

const initialState = {
    users: [],
    competences: []
};

function evaluations(state=initialState, action){
    switch(action.type){
        case EVALUATION_ADD_USER:
            return Object.assign({}, state, {
                users : [
                    ...state.users,
                    action.user
                ]
            });
        case EVALUATION_REMOVE_USER:

            let index = 0;
            for(var user of state.users){
                if(user.id = action.id){
                    break;
                }
                index++;
            }
            return Object.assign({}, state, {
                users : [
                    ...state.users.slice(0, index),
                    ...state.users.slice(index+1)
                ]
            });
        case EVALUATION_ADD_ALL_USER:
            return Object.assign({}, state, {
                users : action.users
            });
        case EVALUATION_REMOVE_ALL_USER:
            return Object.assign({}, state, {
               users : []
            });
        default:
            return state;
    }
}

export default evaluations