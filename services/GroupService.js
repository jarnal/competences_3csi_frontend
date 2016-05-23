import Config from '../configuration.js';
import Auth from '../routes/auth/Auth.jsx';

/**
 *
 * @param id
 * @returns {string}
 */
function getFinalURL(id, suffixe){
    var url = Config.server_base_url + "group/";
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
function getAllGroups(callback){
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
function getGroupUsers(id, callback){
    $.get(
        getFinalURL(id, "users"),
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
function getGroupMatieres(id, callback){
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
function getGroupExamens(id, callback){
    $.get(
        getFinalURL(id, "examens"),
        function (result) {
            callback(result);
        }
    );
}

/**
 *
 */
function getGroup(id){

}

/**
 *
 */
function postGroup(){

}

/**
 *
 * @param id
 */
function putGroup(id){

}

/**
 *
 */
function deleteGroup(){

}

module.exports = {
    getAll: getAllGroups,
    getUsers: getGroupUsers,
    getMatieres: getGroupMatieres,
    getExamens: getGroupExamens,
    get: getGroup,
    post: postGroup,
    put: putGroup,
    delete: deleteGroup
};
