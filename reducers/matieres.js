/**
 * Created by jonathan on 30/08/2016.
 */

import {MATIERES_REQUEST, MATIERES_SUCCESS, MATIERES_FAILURE, MATIERE_SELECTED} from '../actions/matieres'

const initialState = {
    data : [],
    request : null,
    inProgress : false,
    error : null,
    selected : null
};

function matieres(state = initialState, action) {
    switch (action.type) {
        case MATIERES_REQUEST:
            return Object.assign({}, state, {
                inProgress: true
            });
            return state;
        case MATIERES_SUCCESS:
            return Object.assign({}, state, {
                data : action.data,
                inProgress: false
            });
        case MATIERES_FAILURE:
            return Object.assign({}, state, {
                inProgress: false,
                error: action.error
            });
        case MATIERE_SELECTED:
            return Object.assign({}, state, {
                selected: action.matiere
            });
        default:
            return state
    }
}

export default matieres