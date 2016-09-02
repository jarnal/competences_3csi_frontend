/**
 * Created by jonathan on 30/08/2016.
 */

import { getAllExamenAPI } from '../services/ExamenService'

export const EXAMENS_REQUEST = "EXAMENS_REQUEST";
export const EXAMENS_SUCCESS = "EXAMENS_SUCCESS";
export const EXAMENS_FAILURE = "EXAMENS_FAILURE";
export const EXAMEN_SELECTED = "EXAMEN_SELECTED";

//
export function getAllExamens() {

    return (dispatch, getState) => {

        dispatch(examensRequest());
        let request = getAllExamenAPI((err, res) => {
            if(err){
                dispatch(examensFailure(error));
                return;
            }

            const {text} = res;
            const json = JSON.parse(text);
            const {examens} = json;
            dispatch(examensSuccess(examens))
        });
    };
}

//
export function examenSelected(examen) {
    return {type: EXAMEN_SELECTED, examen};
}

//
export function examensRequest(){
    return {type: EXAMENS_REQUEST}
}

//
export function examensFailure(error){
    return {type: EXAMENS_FAILURE, error}
}

//
export function examensSuccess(data){
    return {type: EXAMENS_SUCCESS, data}
}