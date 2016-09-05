/**
 * Created by jonathan on 29/08/2016.
 */

import { combineReducers } from 'redux'
import login from './login'
import promises from './promises'
import matieres from './matieres'
import competences from './competences'
import groups from './groups'
import evaluations from './evaluations'
import users from './users'

export default combineReducers({
    login,
    promises,
    matieres,
    competences,
    groups,
    evaluations,
    users
})