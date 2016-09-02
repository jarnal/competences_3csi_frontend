/**
 * Created by jonathan on 30/08/2016.
 */

import { getMatieres, getExamens } from '../services/GroupService'
import { getMatiereCompetencesAPI } from '../services/MatiereService'

export const COMPETENCES_REQUEST = "COMPETENCES_REQUEST";
export const COMPETENCES_SUCCESS = "COMPETENCES_SUCCESS";
export const COMPETENCES_FAILURE = "COMPETENCES_FAILURE";
export const COMPETENCE_SELECTED = "COMPETENCE_SELECTED";

export function getCompetences(idRelation, relationType){
    return dispatch => {
        dispatch(competencesRequest());

        if (relationType) {
            getMatiereCompetencesAPI(idRelation, (err, res) => {
                console.log("dzpedl zêpld");
            })
        }
    }
}

export function getCompetencesByMatiere(matiereID) {
    return dispatch => {
        dispatch(competencesRequest());

        let request = getMatiereCompetencesAPI(matiereID, (err, res) => {
            if(err){
                dispatch(competencesFailure(error));
                return;
            }

            const {text} = res;
            const comptences = JSON.parse(text);
            dispatch(competencesSuccess(comptences));
        })
    }
}

export function getCompetencesByExamens(competenceID) {
    return dispatch => {
        dispatch(competencesRequest());


    }
}

//
export function competencesRequest(){
    return {type: COMPETENCES_REQUEST}
}

//
export function competencesFailure(error){
    return {type: COMPETENCES_FAILURE, error}
}

//
export function competencesSuccess(data){
    return {type: COMPETENCES_SUCCESS, data}
}