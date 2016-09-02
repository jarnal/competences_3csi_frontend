/**
 * Created by jonathan on 30/08/2016.
 */

import { getAllMatieresAPI } from '../services/MatiereService'

export const MATIERES_REQUEST = "MATIERES_REQUEST";
export const MATIERES_SUCCESS = "MATIERES_SUCCESS";
export const MATIERES_FAILURE = "MATIERES_FAILURE";
export const MATIERE_SELECTED = "MATIERE_SELECTED";

//
export function getAllMatieres() {

    return (dispatch, getState) => {

        dispatch(matieresRequest());
        let request = getAllMatieresAPI((err, res) => {
            if(err){
                dispatch(matieresFailure(error));
                return;
            }

            const {text} = res;
            const json = JSON.parse(text);
            const {matieres} = json;
            dispatch(matieresSuccess(matieres))
        });
    };
}

//
export function matiereSelected(matiere) {
    return {type: MATIERE_SELECTED, matiere};
}

//
export function matieresRequest(){
    return {type: MATIERES_REQUEST}
}

//
export function matieresFailure(error){
    return {type: MATIERES_FAILURE, error}
}

//
export function matieresSuccess(data){
    return {type: MATIERES_SUCCESS, data}
}