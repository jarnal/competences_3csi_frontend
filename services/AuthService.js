import Config from '../configuration'
import request from 'superagent'

/**
 *
 */
export function loginAPI(email, password) {

    return new Promise((resolve, reject) => {
        request
            .post(`${Config.server_base_url}security`)
            .type('form')
            .send({ user_l: email, user_p: password })
            .set('Accept', 'application/json')
            .end(function(err, res){
                err ? reject(err) : resolve(res);
            });
    });
}

/**
 *
 */
export function logoutAPI() {
    delete localStorage.tok
}
/**
 *
 */
export function getTokenAPI() {

    return new Promise((resolve, reject) => {
        request
            .post(Config.server_oauth_url)
            .type('form')
            .send({
                client_id: "1_2lp2nq4n5acksksg8ks4w80gskg8kockggwg08w008so8gkw4s",
                client_secret: "22b4bent9e74ggggss8wgk0s0o88w408sgw8oksggw4c000cs",
                grant_type: "http://competences3csi.com/grants/api_key",
                api_key: localStorage.getItem('us_api_key')
            })
            .set('Accept', 'application/json')
            .end(function(err, res){
                err ? reject(err) : resolve(res);
            });
    });
}

/**
 *
 */
export function getUserInfo() {
    return {
        "user_id": localStorage.getItem('us_id'),
        "user_name": localStorage.getItem('us_name'),
        "user_role": localStorage.getItem('us_role')
    }
}

/**
 *
 */
export function getUserToken() {
    return localStorage.getItem("tok");
}

/**
 *
 */
export function loggedIn() {
    return !!getUserToken();
}
