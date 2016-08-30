import Config from '../configuration.js'
import request from 'superagent'
import {getUserToken} from '../services/AuthService'

/**
 * Builds the final URL to the resource
 * @param id
 * @returns {string}
 */
function getFinalURL(id, suffixe) {
    var url = Config.server_base_url + "matiere/";
    if(id)
        url = url + id;
    if(suffixe)
        url = url + "/" + suffixe;
    return url + "?access_token=" + getUserToken();
}

/**
 * Returns all matieres from server
 * @param callback
 */
export function getAllMatieresAPI(callback){
    return $.get(
        getFinalURL(),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all competences related to a specific matiere
 * @param id
 * @param callback
 */
export function getMatiereCompetencesAPI(id, callback){

    /*return request
        .get(getFinalURL(id, "competences"))
        .set('Accept', 'application/json')
        .end(function(err, res){
            callback(err, res);
        });*/
}

/**
 * Returns a specific matiere by id
 * @param id
 * @param callback
 */
export function getMatiereAPI(id, callback){
    return $.get(
        getFinalURL(id),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Posts a new matiere on server
 * @param data
 * @param callback
 */
export function postMatiereAPI(data, callback){
    return $.ajax({
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
 * Modifies an existing matiere on the server
 * @param id
 * @param data
 * @param callback
 */
export function putMatiereAPI(id, data, callback){
    return $.ajax({
        type: "PUT",
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
 * Deletes a matiere from the server
 * @param id
 */
export function deleteMatiereAPI(id){

}