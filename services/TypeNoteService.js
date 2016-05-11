import Config from '../configuration.js';
import Auth from '../routes/auth/Auth.jsx';

/**
 *
 * @param id
 * @returns {string}
 */
function getFinalURL(id, suffixe){
    var url = Config.server_base_url + "type_note/";
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
function getAllTypeNotes(callback){
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
function getTypeNote(id){

}

/**
 *
 */
function postTypeNote(){

}

/**
 *
 * @param id
 */
function putTypeNote(id){

}

/**
 *
 */
function deleteTypeNote(){

}

module.exports = {
    getAll: getAllTypeNotes,
    get: getTypeNote,
    post: postTypeNote,
    put: putTypeNote,
    delete: deleteTypeNote
};
