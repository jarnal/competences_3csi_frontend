import Config from '../configuration.js';
import Auth from '../routes/auth/Auth.jsx';

/**
 * Builds the final URL to the resource
 *
 * @param id
 * @returns {string}
 */
function getFinalURL(id, suffixe){
    var url = Config.server_base_url + "evaluation_examen/";
    if(id)
        url = url + id;
    if(suffixe)
        url = url + "/" + suffixe;
    return url + "?access_token=" + Auth.getToken();
}

/**
 * Returns all examen evaluations
 * @param callback
 */
function getAllEvaluation(callback){
    $.get(
        getFinalURL(),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns a specific examen evaluation depending on his id
 * @param id
 * @param callback
 */
function getEvaluation(id, callback){
    $.get(
        getFinalURL(id),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Posts a new auto evaluation to the server
 * @param data
 * @param callback
 */
function postEvaluation(data, callback){
    $.ajax({
        type: "POST",
        url: getFinalURL(),
        data: data,
        success: function(result){
            callback(result);
        },
        dataType: "json"
    });
}

/**
 * Modifies an existing examen evaluation on the server
 * @param id
 * @param data
 * @param callback
 */
function putEvaluation(id, data, callback){
    $.ajax({
        type: "PUT",
        url: getFinalURL(id),
        data: data,
        success: function(result){
            callback(result);
        },
        dataType: "json"
    });
}

/**
 * Deletes an evaluation from the server
 * @param id
 */
function deleteEvaluation(id){

}

module.exports = {
    getAll: getAllEvaluation,
    get: getEvaluation,
    post: postEvaluation,
    put: putEvaluation,
    delete: deleteEvaluation
};
