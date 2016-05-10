import Config from '../configuration.js';
import Auth from '../routes/auth/Auth.jsx';

/**
 *
 * @param id
 * @returns {string}
 */
function getFinalURL(id, suffixe){
    var url = Config.server_base_url + "matiere/";
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
function getAllMatieres(callback){
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
function getMatiereCompetences(id, callback){
    $.get(
        getFinalURL(id, "competences"),
        function (result) {
            callback(result);
        }
    );
}

/**
 *
 */
function getMatiere(id){

}

/**
 *
 */
function postMatiere(){

}

/**
 *
 * @param id
 */
function putMatiere(id){

}

/**
 *
 */
function deleteMatiere(){

}

module.exports = {
    getAll: getAllMatieres,
    getCompetences: getMatiereCompetences,
    get: getMatiere,
    post: postMatiere,
    put: putMatiere,
    delete: deleteMatiere
};
