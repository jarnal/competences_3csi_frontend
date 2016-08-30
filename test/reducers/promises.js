/**
 * Created by jonathan on 29/08/2016.
 */

import chai from 'chai'
import path from 'path'
import reducer from '../../reducers/promises'
import {ADD_ASYNC_CALL, REMOVE_ASYNC_CALL, REMOVE_ALL_ASYNC_CALL} from '../../actions/actions'

chai.should();

describe('Promises reducer', () => {

    it('Should return the initial state', () => {
        let t = reducer(undefined, {});
        t.should.eql({
            promises:{
                groups:[],
                users:[]
            }
        });
    });

    it('Should handle ADD_ASYNC_CALL', () => {

        let t = reducer(undefined, {
            type: ADD_ASYNC_CALL,
            category: 'groups',
            promise: {
                test:"test"
            }
        });
        t.should.eql({
           promises: {
               groups: [{test:"test"}],
               users:[]
           }
        });
    });

    it('Should handle REMOVE_ASYNC_CALL', () => {
        let state = reducer(undefined, {
            type: ADD_ASYNC_CALL,
            category: 'groups',
            promise: {
                test:"test"
            }
        });
        state.should.eql({
            promises: {
                groups: [{test:"test"}],
                users:[]
            }
        });

        let t = reducer(state, {
            type: REMOVE_ASYNC_CALL,
            "category": 'groups'
        });

        t.should.eql({
            promises:{
                groups:[],
                users:[]
            }
        })
    });
});