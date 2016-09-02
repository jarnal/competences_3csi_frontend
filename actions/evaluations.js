/**
 * Created by jonathan on 30/08/2016.
 */

export const EVALUATION_ADD_USER = "EVALUATION_ADD_USER";
export const EVALUATION_REMOVE_USER = "EVALUATION_REMOVE_USER";
export const EVALUATION_ADD_ALL_USER = "EVALUATION_ADD_ALL_USER";
export const EVALUATION_REMOVE_ALL_USER = "EVALUATION_REMOVE_ALL_USER";

export const EVALUATION_ADD_COMPETENCE = "EVALUATION_ADD_COMPETENCE";
export const EVALUATION_REMOVE_COMPETENCE = "EVALUATION_REMOVE_COMPETENCE";
export const EVALUATION_ADD_ALL_COMPETENCE = "EVALUATION_ADD_ALL_COMPETENCE";
export const EVALUATION_REMOVE_ALL_COMPETENCE = "EVALUATION_REMOVE_ALL_COMPETENCE";

export function addUser(user) {
    return {type: EVALUATION_ADD_USER, user};
}

export function removeUser(user) {
    return {type: EVALUATION_REMOVE_USER, user};
}

export function addAllUser() {
    return {type: EVALUATION_ADD_ALL_USER}
}

export function removeAllUser() {
    return {type: EVALUATION_REMOVE_ALL_USER}
}

export function addCompetence(competence) {
    return {type: EVALUATION_ADD_COMPETENCE, competence};
}

export function removeCompetence(competence) {
    return {type: EVALUATION_REMOVE_COMPETENCE, competence};
}

export function addAllCompetence() {
    return {type: EVALUATION_ADD_ALL_COMPETENCE}
}

export function removeAllCompetence() {
    return {type: EVALUATION_REMOVE_ALL_COMPETENCE}
}