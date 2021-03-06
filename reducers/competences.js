/**
 * Created by jonathan on 30/08/2016.
 */

import {COMPETENCES_REQUEST, COMPETENCES_SUCCESS, COMPETENCES_FAILURE, COMPETENCE_SELECTED} from '../actions/competences'

const initialState = {
    data : [],
    request : null,
    inProgress : false,
    error : null,
    selected : null
};

function competences(state = initialState, action) {
    switch (action.type) {
        case COMPETENCES_REQUEST:
            return Object.assign({}, state, {
                inProgress: true
            });
            return state;
        case COMPETENCES_SUCCESS:
            return Object.assign({}, state, {
                data : action.data,
                inProgress: false
            });
        case COMPETENCES_FAILURE:
            return Object.assign({}, state, {
                inProgress: false,
                error: action.error
            });
        case COMPETENCE_SELECTED:
            return Object.assign({}, state, {
                selected: action.matiere
            });
        default:
            return state
    }
}

export default competences