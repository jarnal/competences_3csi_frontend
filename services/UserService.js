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
 * @param $userList
 * @param $competenceList
 */
function getUserListCompetenceEvaluation($userList, $competenceList, callback) {
    var url = Config.server_base_url + "user/";
    url += "ulist/" + JSON.stringify($userList) + "/";
    url += "clist/" + JSON.stringify($competenceList);
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
    get: getUser,
    post: postUser,
    put: putUser,
    delete: deleteUser
};
