import Config from '../configuration.js';
import Auth from '../routes/auth/Auth.jsx';

/**
 *
 * @param id
 * @returns {string}
 */
function getFinalURL(id, suffixe){
    var url = Config.server_base_url + "user/";
    if(id)
        url = url + id;
    if(suffixe)
        url = url + "/" + suffixe;
    return url + "?access_token=" + Auth.getToken();
}

/**
 *
 * @param callback
 */
function getAllUsers(callback){
    $.get(
        getFinalURL(),
        function (result) {
            callback(result);
        }
    );
}

/**
 *
 * @param id
 * @param callback
 */
function getUserCompetences(id, callback){
    $.get(
        getFinalURL(id, "competences"),
        function (result) {
            callback(result);
        }
    );
}

/**
 *
 * @param id
 * @param callback
 */
function getUserMatieres(id, callback){
    $.get(
        getFinalURL(id, "matieres"),
        function (result) {
            callback(result);
        }
    );
}

/**
 *
 * @param id
 * @param callback
 */
function getUserExamens(id, callback){
    $.get(
        getFinalURL(id, "examens"),
        function (result) {
            callback(result);
        }
    );
}

/**
 *
 * @param $userList
 * @param $competenceList
 */
function getUserListCompetenceEvaluation(userList, competenceList, callback) {
    var url = Config.server_base_url + "user/evaluations/";
    url += "ulist/" + JSON.stringify(userList) + "/";
    url += "clist/" + JSON.stringify(competenceList);
    url += "?access_token=" + Auth.getToken();

    $.get(
        url,
        function (result) {
            callback(result);
        }
    );
}

/**
 *
 * @param $userList
 * @param $competenceList
 */
function getUserListCompetenceEvaluationByExamen(examenID, userList, competenceList, callback) {
    var url = Config.server_base_url + "user/evaluations/";
    url += "examen/" + JSON.stringify(examenID) + "/";
    url += "ulist/" + JSON.stringify(userList) + "/";
    url += "clist/" + JSON.stringify(competenceList);
    url += "?access_token=" + Auth.getToken();

    $.get(
        url,
        function (result) {
            callback(result);
        }
    );
}

function getUserListWithEvaluationByGroupAndExamen(groupID, examenID, callback) {
    var url = Config.server_base_url + "user/evaluations/";
    url += "group/" + JSON.stringify(groupID) + "/";
    url += "examen/" + JSON.stringify(examenID);
    url += "?access_token=" + Auth.getToken();

    $.get(
        url,
        function (result) {
            callback(result);
        }
    );
}

function getUserListWithEvaluationByGroupAndMatiere(groupID, matiereID, callback) {
    var url = Config.server_base_url + "user/evaluations/";
    url += "group/" + JSON.stringify(groupID) + "/";
    url += "matiere/" + JSON.stringify(matiereID);
    url += "?access_token=" + Auth.getToken();

    $.get(
        url,
        function (result) {
            callback(result);
        }
    );
}

function getUserWithEvaluationByExamen(userID, examenID, callback) {
    var url = Config.server_base_url + "user/evaluations/";
    url += "user/" + JSON.stringify(userID) + "/";
    url += "examen/" + JSON.stringify(examenID);
    url += "?access_token=" + Auth.getToken();

    $.get(
        url,
        function (result) {
            callback(result);
        }
    );
}

function getUserWithEvaluationByMatiere(userID, matiereID, callback) {
    var url = Config.server_base_url + "user/evaluations/";
    url += "user/" + JSON.stringify(userID) + "/";
    url += "matiere/" + JSON.stringify(matiereID);
    url += "?access_token=" + Auth.getToken();

    $.get(
        url,
        function (result) {
            callback(result);
        }
    );
}

/**
 *
 */
function getUser(id){

}

/**
 *
 */
function postUser(){

}

/**
 *
 * @param id
 */
function putUser(id){

}

/**
 *
 */
function deleteUser(){

}

module.exports = {
    getAll: getAllUsers,
    getUserListCompetenceEvaluation:getUserListCompetenceEvaluation,
    getUserListWithEvaluationByGroupAndExamen:getUserListWithEvaluationByGroupAndExamen,
    getUserListWithEvaluationByGroupAndMatiere:getUserListWithEvaluationByGroupAndMatiere,
    getUserListCompetenceEvaluationByExamen:getUserListCompetenceEvaluationByExamen,
    getUserWithEvaluationByExamen:getUserWithEvaluationByExamen,
    getUserWithEvaluationByMatiere:getUserWithEvaluationByMatiere,
    get: getUser,
    getMatieres: getUserMatieres,
    getExamens: getUserExamens,
    post: postUser,
    put: putUser,
    delete: deleteUser
};
