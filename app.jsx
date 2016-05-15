import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, Route, withRouter , IndexRoute } from 'react-router'
import auth from './routes/auth/Auth.jsx'
import App from './components/App.jsx'

import intervenant_Dashboard from './routes/intervenant/Dashboard/Dashboard.jsx'
import intervenant_Bilans from './routes/intervenant/Bilans/Bilans.jsx'
import intervenant_Competences from './routes/intervenant/Competences/Competences.jsx'
import intervenant_Evaluations from './routes/intervenant/Evaluations/Evaluations.jsx'
import intervenant_Examens from './routes/intervenant/Examens/Examens.jsx'
import intervenant_Groupes from './routes/intervenant/Groupes/Groupes.jsx'
import intervenant_Matieres from './routes/intervenant/Matieres/Matieres.jsx'

import etudiant_Dashboard from './routes/etudiant/Dashboard/Dashboard.jsx'
import etudiant_Bilans from './routes/etudiant/Bilans/Bilans.jsx'
import etudiant_Evaluations from './routes/etudiant/Evaluations/Evaluations.jsx'

function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
        replace({
            pathname: '/login',
            state: {nextPathname: nextState.location.pathname}
        })
    }
}

const NoMatch = React.createClass({
    render(){
        return (
            <div>Cette page n'existe pas</div>
        )
    }
});

const Login = withRouter(
    React.createClass({

        getInitialState() {
            return {
                error: false
            }
        },

        handleSubmit(event) {
            event.preventDefault()

            const email = this.refs.email.value
            const pass = this.refs.pass.value

            auth.login(email, pass, (loggedIn) => {
                if (!loggedIn)
                return this.setState({error: true})

                const { location } = this.props

                if (location.state && location.state.nextPathname) {
                    this.props.router.replace(location.state.nextPathname)
                } else {
                    this.props.router.replace('/')
                }
            })
        },

        render() {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label><input ref="email" placeholder="email" defaultValue="joe@example.com"/></label>
                    <label><input ref="pass" placeholder="password"/></label> (hint: password1)<br />
                    <button type="submit">login</button>
                    {this.state.error && (
                        <p>Bad login information</p>
                    )}
                </form>
            )
        }
    })
);

const Logout = React.createClass({
    componentDidMount() {
        auth.logout()
    },

    render() {
        return <p>You are now logged out</p>
    }
});
render(
    <div>
        { localStorage.getItem('us_role') == 'ROLE_INTERVENANT'
            ?
            <Router history={browserHistory}>
                <Route path="/" component={App} onEnter={requireAuth}>
                    <IndexRoute to="dashboard" />
                    <Route path="dashboard" component={intervenant_Dashboard}/>
                    <Route path="bilans" component={intervenant_Bilans}/>
                    <Route path="competences" component={intervenant_Competences}/>
                    <Route path="evaluations" component={intervenant_Evaluations}/>
                    <Route path="examens" component={intervenant_Examens}/>
                    <Route path="groupes" component={intervenant_Groupes}/>
                    <Route path="matieres" component={intervenant_Matieres}/>
                </Route>
                <Route path="login" component={Login}/>
                <Route path="logout" component={Logout}/>
                <Route path="*" component={NoMatch}/>
            </Router>
            :
            <Router history={browserHistory}>
                <Route path="/" component={App} onEnter={requireAuth}>
                    <IndexRoute to="dashboard" />
                    <Route path="dashboard" component={etudiant_Dashboard}/>
                    <Route path="bilans" component={etudiant_Bilans}/>
                    <Route path="evaluations" component={etudiant_Evaluations}/>
                </Route>
                <Route path="login" component={Login}/>
                <Route path="logout" component={Logout}/>
                <Route path="*" component={NoMatch}/>
            </Router>
        }
    </div>,
    document.getElementById('container')
);
