/**
 * Created by jonathan on 29/08/2016.
 */

import { combineReducers } from 'redux'
import login from './login'
import promises from './promises'

export default combineReducers({
    login,
    promises
})