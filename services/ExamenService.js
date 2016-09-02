import Config from '../configuration.js'
import Auth from '../routes/auth/Auth.jsx'
import { getUserToken } from '../services/AuthService'

/**
 * Builds the final URL to the resource
 * @param id
 * @returns {string}
 */
function getFinalURL(id, suffixe){
    var url = Config.server_base_url + "examen/";
    if(id)
        url = url + id;
    if(suffixe)
        url = url + "/" + suffixe;
    return url + "?access_token=" + getUserToken();
}

/**
 * Returns all examens from server
 * @param callback
 */
export function getAllExamenAPI(callback){
    return request
        .get(getFinalURL())
        .set('Accept', 'application/json')
        .end(function(err, res){
            callback(err, res);
        });

    /*$.get(
        getFinalURL(),
        function (result) {
            callback(result);
        }
    );*/
}

/**
 * Returns a specific examen by id
 * @param id
 */
export function getExamenAPI(id){
    $.get(
        getFinalURL(id),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all competences related to an examen
 * @param id
 * @param callback
 */
export function getExamenCompetencesAPI(id, callback){
    $.get(
        getFinalURL(id, "competences"),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Posts a new exeman to the server
 * @param data
 * @param callback
 */
export function postExamenAPI(data, callback){
    $.ajax({
        type: "POST",
        url: getFinalURL(),
        data: data,
        success: function(result){
            callback(result);
        },
        error: function(result){
            callback(false);
        },
        dataType: "json"
    });
}

/**
 * Modifies an existing examen on the server
 * @param id
 * @param data
 * @param callback
 */
export function putExamenAPI(id, data, callback){
    $.ajax({
        type: "POST",
        url: getFinalURL(id),
        data: data,
        success: function(result){
            callback(result);
        },
        error: function(result){
            callback(false);
        },
        dataType: "json"
    });
}

/**
 * Deletes an examen from the server
 * @param id
 */
export function deleteExamenAPI(id, callback){
    return $.ajax({
        type: "DELETE",
        url: getFinalURL(id),
        success: function(result){
            callback(result);
        },
        error: function(result){
            callback(false);
        },
        dataType: "json"
    });
}