import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory, Route , IndexRedirect } from 'react-router'
import { loggedIn } from './services/AuthService'
import App from './components/App.jsx'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'

import Login from './containers/login/LoginContainer'
import Logout from './containers/logout/LogoutContainer'
import Competences from './containers/competences/CompetencesContainer'
import EvaluationLibres from './containers/evaluations/EvaluationsLibresContainer'

import intervenant_Dashboard from './routes/intervenant/Dashboard/Dashboard.jsx'
import intervenant_Bilans from './routes/intervenant/Bilans/Bilans.jsx'
//import intervenant_Competences from './routes/intervenant/Competences/Competences.jsx'
import intervenant_Examens from './routes/intervenant/Examens/Examens.jsx'
//import intervenant_EvaluationsLibres from './routes/intervenant/Evaluations/EvaluationsLibres.jsx'
import intervenant_EvaluationsExamens from './routes/intervenant/Evaluations/EvaluationsExamens.jsx'
import intervenant_Statistics from './routes/intervenant/Statistiques/Statistiques.jsx'
import intervenant_Diplomes from './routes/intervenant/Diplomes/Diplomes.jsx'
import intervenant_Calendar from './routes/intervenant/Calendar/ExamenCalendar.jsx'

const store = configureStore();

// - render routes, with react router
ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App} onEnter={requireAuth}>
                <IndexRedirect to="dashboard" />
                <Route path="dashboard" component={intervenant_Dashboard}/>
                <Route path="bilans" component={intervenant_Bilans}/>
                <Route path="competences" component={Competences}/>
                <Route path="examens" component={intervenant_Examens}/>
                <Route path="evaluations_libres" component={EvaluationLibres}/>
                <Route path="evaluations_examens" component={intervenant_EvaluationsExamens}/>
                <Route path="statistiques" component={intervenant_Statistics}/>
                <Route path="diplomes" component={intervenant_Diplomes}/>
                <Route path="calendar" component={intervenant_Calendar}/>
            </Route>
            <Route path="login" component={Login}/>
            <Route path="logout" component={Logout}/>
            <Route path="*" component={NoMatch}/>
        </Router>
    </Provider>,
    document.getElementById('container')
);

// - Check if user is logged, else redirect to login view
function requireAuth(nextState, replace) {
    if ( !loggedIn() ) {
        replace({
            pathname: '/login',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}
// - Render compoent when no route matched
const NoMatch = (props) => (
    <div>Cette page n'existe pas</div>
);