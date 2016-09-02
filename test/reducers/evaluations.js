/**
 * Created by jonathan on 02/09/2016.
 */

import chai from 'chai'
import path from 'path'
import reducer from '../../reducers/evaluations'
import {EVALUATION_ADD_USER, EVALUATION_REMOVE_USER} from '../../actions/evaluations'
import {EVALUATION_ADD_ALL_USER, EVALUATION_REMOVE_ALL_USER} from '../../actions/evaluations'

chai.should();

describe('Evaluations reducer', () => {

    it('Should return the initial state', () => {
        let t = reducer(undefined, {});
        t.should.eql({
            users:[],
            competences:[]
        });
    });

    it('Should handle EVALUATION_ADD_USER', () => {

        let t = reducer(undefined, {
            type: EVALUATION_ADD_USER,
            user: {
                id:1,
                name: "Jonathan Arnal"
            }
        });

        t.should.eql({
            users: [
                {
                    id:1,
                    name: "Jonathan Arnal"
                }
            ],
            competences:[]
        });
    });

    it('Should handle EVALUATION_REMOVE_USER', () => {

        let t = reducer(undefined, {
            type: EVALUATION_ADD_USER,
            user: {
                id:1,
                name: "Jonathan Arnal"
            }
        });

        t.should.eql({
            users: [
                {
                    id:1,
                    name: "Jonathan Arnal"
                }
            ],
            competences:[]
        });

        t = reducer(t, {
            type: EVALUATION_REMOVE_USER,
            id: 1
        });

        t.should.eql({
            users:[],
            competences:[]
        })
    });

    it('Should handle EVALUATION_ADD_ALL_USER', () => {

        let t = reducer(undefined, {
            type: EVALUATION_ADD_ALL_USER,
            users: [
                {
                    id:1,
                    name: "Jonathan Arnal"
                },
                {
                    id:2,
                    name: "Michel Sardou"
                },
                {
                    id:3,
                    name: "Francis Huster"
                }
            ]
        });

        t.should.eql({
            users: [
                {
                    id:1,
                    name: "Jonathan Arnal"
                },
                {
                    id:2,
                    name: "Michel Sardou"
                },
                {
                    id:3,
                    name: "Francis Huster"
                }
            ],
            competences:[]
        });

        t = reducer(t, {
            type: EVALUATION_REMOVE_USER,
            id: 1
        });

        t.should.eql({
            users:[
                {
                    id:2,
                    name: "Michel Sardou"
                },
                {
                    id:3,
                    name: "Francis Huster"
                }],
            competences:[]
        });

        t = reducer(t, {
            type: EVALUATION_REMOVE_USER,
            id: 2
        });

        t.should.eql({
            users:[
                {
                    id:3,
                    name: "Francis Huster"
                }],
            competences:[]
        })
    });

    it('Should handle EVALUATION_REMOVE_ALL_USER', () => {

        let t = reducer(undefined, {
            type: EVALUATION_ADD_ALL_USER,
            users: [
                {
                    id:1,
                    name: "Jonathan Arnal"
                },
                {
                    id:2,
                    name: "Michel Sardou"
                },
                {
                    id:3,
                    name: "Francis Huster"
                }
            ]
        });

        t.should.eql({
            users: [
                {
                    id:1,
                    name: "Jonathan Arnal"
                },
                {
                    id:2,
                    name: "Michel Sardou"
                },
                {
                    id:3,
                    name: "Francis Huster"
                }
            ],
            competences:[]
        });

        t = reducer(t, {
           type: EVALUATION_REMOVE_ALL_USER
        });

        t.should.eql({
            users:[],
            competences:[]
        })
    });

});