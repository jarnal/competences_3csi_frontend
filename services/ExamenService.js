import Config from '../configuration.js';
import Auth from '../routes/auth/Auth.jsx';

/**
 *
 * @param id
 * @returns {string}
 */
function getFinalURL(id, suffixe){
    var url = Config.server_base_url + "examen/";
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
function getAllExamen(callback){
    $.get(
        getFinalURL(),
        function (result) {
            callback(result);
        }
    );
}

/**
 *
 */
function getExamen(id){

}

/**
 *
 */
function postExamen(){

}

/**
 *
 * @param id
 */
function putExamen(id){

}

/**
 *
 */
function deleteExamen(){

}

module.exports = {
    getAll: getAllExamen,
    get: getExamen,
    post: postExamen,
    put: putExamen,
    delete: deleteExamen
};
