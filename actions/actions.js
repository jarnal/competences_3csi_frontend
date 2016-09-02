/**
 * Created by jonathan on 24/08/2016.
 */

import { push } from 'react-router-redux'

import Config from '../configuration'
import request from 'superagent'
import {loginAPI, logoutAPI, getTokenAPI} from '../services/AuthService'
import { getMatiereCompetencesAPI } from '../services/MatiereService'

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

export const GROUP_SELECTED = "GROUP_SELECTED";

export const GROUPS_REQUEST = "GROUPS_REQUEST";
export const GROUPS_SUCCESS = "GROUPS_SUCCESS";
export const GROUPS_FAILURE = "GROUPS_FAILURE";

export const ADD_ASYNC_CALL = "ADD_ASYNC_CALL";
export const REMOVE_ASYNC_CALL = "REMOVE_ASYNC_CALL";
export const REMOVE_ALL_ASYNC_CALL = "REMOVE_ALL_ASYNC_CALL";

//
export function login(email, password) {
    return dispatch => {

        dispatch(loginRequest());

        loginAPI(email, password).then((result) => {
            const {text} = result;
            const json = JSON.parse(text);
            if(json.success) {
                localStorage.setItem('us_id', json.user_id);
                localStorage.setItem('us_api_key', json.api_key);
                localStorage.setItem('us_name', json.user_name);
                localStorage.setItem('us_role', json.user_role);

                getTokenAPI().then((result)=>{
                    console.log("fzzefff");

                    const {text} = result;
                    const json = JSON.parse(text);
                    localStorage.setItem('tok', json.access_token);
                    localStorage.setItem('ref_tok', json.refresh_token);

                    dispatch(push('/'));
                }, (error) => {
                    dispatch(loginFailure(error));
                });
            } else {
                dispatch(loginFailure("Identifiants incorrects"))
            }
        }, (error) => {
            console.log(error);
        });
    }
}

//
export function logout(){

    return dispatch => {
        delete localStorage.tok;
        setTimeout(() => { dispatch(push('/')) }, 3000);
    }
}

//
export function loginRequest(){
    return {type: LOGIN_REQUEST}
}

//
export function loginFailure(error){
    return {type: LOGIN_FAILURE, error}
}

//
export function loginSuccess(response){
    return {type: LOGIN_SUCCESS, response}
}

//
export function selectGroup(group) {
    return {type: GROUP_SELECTED, group}
}

// Adds async call contained in a promise into state allowing to abort the async call later
export function addAsyncCall(promise, category) {
    return {type: ADD_ASYNC_CALL, promise, category}
}

// Removes promise from state
export function removeAsyncCall(category) {
    return {type: REMOVE_ASYNC_CALL, category}
}

// Removes all promises from state
export function removeAllAsyncCall() {
    return {type: REMOVE_ALL_ASYNC_CALL}
}