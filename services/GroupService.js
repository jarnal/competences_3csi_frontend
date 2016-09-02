import Config from '../configuration.js';
import Auth from '../routes/auth/Auth.jsx';
import { getUserToken } from '../services/AuthService'

import request from 'superagent'

/**
 * Builds the final URL to the resource
 * @param id
 * @returns {string}
 */
export function getFinalURL(id, suffixe){
    var url = Config.server_base_url + "group/";
    if(id)
        url = url + id;
    if(suffixe)
        url = url + "/" + suffixe;
    return url + "?access_token=" + getUserToken();
}

/**
 * Returns all groups from server
 * @param callback
 */
export function getAllGroupsAPI(callback){
    return request
        .get(getFinalURL())
        .set('Accept', 'application/json')
        .end(function(err, res){
            callback(err, res);
        });
}

/**
 * Returns all users related to a specific group
 * @param id
 * @param callback
 */
export function getGroupUsers(id, callback){
    return $.get(
        getFinalURL(id, "users"),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all matieres related to a specific group (the matieres teached to the group)
 * @param id
 * @param callback
 */
export function getGroupMatieres(id, callback){
    return $.get(
        getFinalURL(id, "matieres"),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns all examnens related to a specific group
 * @param id
 * @param callback
 */
export function getGroupExamens(id, callback){
   return $.get(
        getFinalURL(id, "examens"),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Returns a specific group by id
 * @param id
 * @param callback
 */
export function getGroup(id, callback){
    return $.get(
        getFinalURL(id),
        function (result) {
            callback(result);
        }
    );
}

/**
 * Posts a new group on the server
 * @param data
 * @param callback
 */
export function postGroup(data, callback){
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
 * Modifies a group on the server
 * @param id
 * @param data
 * @param callback
 */
export function putGroup(id, data, callback){
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
 * Removes a specific group from the server
 */
export function deleteGroup(){

}
