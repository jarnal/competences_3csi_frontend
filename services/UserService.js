import Config from '../configuration.js';
import Auth from '../routes/auth/Auth.jsx';
import { getUserToken } from '../services/AuthService'

/**
 * Builds the final URL to the resource
 * @param id
 * @returns {string}
 */
function getFinalURL(id, suffixe){
    var url = Config.server_base_url + "user/";
    if(id)
        url = url + id;
    if(suffixe)
        url = url + "/" + suffixe;
    return url + "?access_token=" + getUserToken();
}

/**
 * Returns all users from server
 * @param callback
 */
export function getAllUsersAPI(callback){
    return $.get(
        getFinalURL(),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all matieres teached to a specific user
 * @param id
 * @param callback
 */
export function getUserMatieresAPI(id, callback){
    return $.get(
        getFinalURL(id, "matieres"),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all examens related to a specific user
 * @param id
 * @param callback
 */
export function getUserExamensAPI(id, callback){
    return $.get(
        getFinalURL(id, "examens"),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all examens related to a specific user in the full calendar format
 * @param id
 * @param callback
 */
export function getUserExamensForCalendarAPI(id, callback){
    return $.get(
        getFinalURL(id, "examens_calendar"),
        function (result) {
            callback(result);
        }
    );
}

/**
 *
 * @param id
 * @param callback
 * @returns {*}
 */
export function getUserDiplomesAPI(id, callback){
    return $.get(
        getFinalURL(id, "diplomes"),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all evaluations related to a group of users (userList) and a list of competences (competenceList)
 * @param userList
 * @param competenceList
 */
export function getUserListCompetenceEvaluationAPI(userList, competenceList, callback) {
    var url = Config.server_base_url + "user/evaluations/";
    url += "ulist/" + JSON.stringify(userList) + "/";
    url += "clist/" + JSON.stringify(competenceList);
    url += "?access_token=" + Auth.getToken();

    return $.get(
        url,
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all evaluations related to a group of users (userList) and a list of competences (competenceList)
 * @param userList
 * @param competenceList
 */
export function getUserListCompetenceEvaluationAutoAPI(userList, competenceList, callback) {
    var url = Config.server_base_url + "user/evaluations_auto/";
    url += "ulist/" + JSON.stringify(userList) + "/";
    url += "clist/" + JSON.stringify(competenceList);
    url += "?access_token=" + Auth.getToken();

    return $.get(
        url,
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all evaluation for a list of users for a specific examen
 * @param examenID
 * @param userList
 * @param competenceList
 * @param callback
 */
export function getUserListCompetenceEvaluationByExamenAPI(examenID, userList, competenceList, callback) {
    var url = Config.server_base_url + "user/evaluations/";
    url += "examen/" + JSON.stringify(examenID) + "/";
    url += "ulist/" + JSON.stringify(userList) + "/";
    url += "clist/" + JSON.stringify(competenceList);
    url += "?access_token=" + Auth.getToken();

    return $.get(
        url,
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all users related to a specific group with all their evaluations related to an examen
 * @param groupID
 * @param examenID
 * @param callback
 */
export function getUserListWithEvaluationByGroupAndExamenAPI(groupID, examenID, callback) {
    var url = Config.server_base_url + "user/evaluations/";
    url += "group/" + JSON.stringify(groupID) + "/";
    url += "examen/" + JSON.stringify(examenID);
    url += "?access_token=" + Auth.getToken();

    return $.get(
        url,
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all users related to a specific group with all their evaluations related to a matiere
 * @param groupID
 * @param matiereID
 * @param callback
 */
export function getUserListWithEvaluationByGroupAndMatiereAPI(groupID, matiereID, callback) {
    var url = Config.server_base_url + "user/evaluations/";
    url += "group/" + JSON.stringify(groupID) + "/";
    url += "matiere/" + JSON.stringify(matiereID);
    url += "?access_token=" + Auth.getToken();

    return $.get(
        url,
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all evaluations for a specific user and for a specific examen
 * @param userID
 * @param examenID
 * @param callback
 */
export function getUserWithEvaluationByExamenAPI(userID, examenID, callback) {
    var url = Config.server_base_url + "user/evaluations/";
    url += "user/" + JSON.stringify(userID) + "/";
    url += "examen/" + JSON.stringify(examenID);
    url += "?access_token=" + Auth.getToken();

    return $.get(
        url,
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all evaluations for a specific user for a specific matiere
 * @param userID
 * @param matiereID
 * @param callback
 */
export function getUserWithEvaluationByMatiereAPI(userID, matiereID, callback) {
    var url = Config.server_base_url + "user/evaluations/";
    url += "user/" + JSON.stringify(userID) + "/";
    url += "matiere/" + JSON.stringify(matiereID);
    url += "?access_token=" + Auth.getToken();

    return $.get(
        url,
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns number of evaluated competences for users in a specific matiere
 * @param groupID
 * @param matiereID
 * @param callback
 */
export function getUsersEvaluatedCompetencesStatistiquesForMatiereAPI(groupID, matiereID, callback) {
    var url = Config.server_base_url + "user/evaluation_statistics/";
    url += "group/" + JSON.stringify(groupID) + "/";
    url += "matiere/" + JSON.stringify(matiereID);
    url += "?access_token=" + Auth.getToken();

    return $.get(
        url,
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns a specific user by id
 * @param id
 */
export function getUserAPI(id){
    return $.get(
        getFinalURL(id),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Posts a new user to the server
 * @param data
 * @param callback
 */
export function postUserAPI(data, callback){

}

/**
 * Modifies an existing user on the server
 * @param id
 * @param data
 * @param callback
 */
export function putUserAPI(id, data, callback){

}

/**
 * Deletes an user from the server
 * @param id
 */
export function deleteUserAPI(id){

}
