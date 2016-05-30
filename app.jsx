import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, Route, withRouter , IndexRedirect } from 'react-router'
import auth from './routes/auth/Auth.jsx'
import App from './components/App.jsx'

import intervenant_Dashboard from './routes/intervenant/Dashboard/Dashboard.jsx'
import intervenant_Bilans from './routes/intervenant/Bilans/Bilans.jsx'
import intervenant_Competences from './routes/intervenant/Competences/Competences.jsx'
import intervenant_Examens from './routes/intervenant/Examens/Examens.jsx'
import intervenant_Groupes from './routes/intervenant/Groupes/Groupes.jsx'
import intervenant_Matieres from './routes/intervenant/Matieres/Matieres.jsx'
import intervenant_EvaluationsLibres from './routes/intervenant/Evaluations/EvaluationsLibres.jsx'
import intervenant_EvaluationsExamens from './routes/intervenant/Evaluations/EvaluationsExamens.jsx'

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
                loggedIn: auth.loggedIn(),
                error: false
            }
        },

        handleSubmit(event) {
            event.preventDefault();

            const email = this.refs.email.value;
            const pass = this.refs.pass.value;

            auth.login(email, pass, (loggedIn) => {
                if (!loggedIn){
                  return this.setState({ error: true} )
                }

                const { location } = this.props;

                if (location.state && location.state.nextPathname) {
                    this.props.router.replace(location.state.nextPathname)
                } else {
                    this.props.router.replace('/')
                }
            })
        },

        render() {

          var style = {color: 'white'};
          var errLogin = {color: 'red'};

            return (
              <div className="login-box">
                <div className="login-logo" style={style}>
                  <b>Admin</b>Skill
                </div>
                <div className ="login-box-body">
                <p className="login-box-msg">Sign in to start your session</p>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group has-feedback">
                      <input className="form-control" placeholder="Email" ref="email"/>
                      <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                    </div>

                    <div className="form-group has-feedback">
                      <input className="form-control" type="password" placeholder="Password" ref="pass"/>
                      <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                    </div>
                    <br/>
                    <div>
                      <button className="btn btn-primary btn-block btn-flat" type="submit">Login</button>
                    </div>
                    <br/>
                    {this.state.error && (
                      <p className="login-box-msg" style={errLogin}>Bad login information</p>
                    )}
                  </form>
                </div>
              </div>
            )
        }
    })
);

const Logout = React.createClass({
    componentDidMount() {
        auth.logout();
        setTimeout(function(){
            browserHistory.push('/');
        }, 3000);
    },

    render() {
        return(
          <div className="login-box">
            <div className="login-logo" style={{color: 'white'}}>
              <b>Admin</b>Skill
            </div>
            <div className ="login-box-body">
              <p className="login-box-msg">You are now logged out</p>
            </div>
          </div>
        )
    }
});
render(
    <div>
        {
            <Router history={browserHistory}>
                <Route path="/" component={App} onEnter={requireAuth}>
                    <IndexRedirect to="dashboard" />
                    <Route path="dashboard" component={intervenant_Dashboard}/>
                    <Route path="bilans" component={intervenant_Bilans}/>
                    <Route path="competences" component={intervenant_Competences}/>
                    <Route path="examens" component={intervenant_Examens}/>
                    <Route path="groupes" component={intervenant_Groupes}/>
                    <Route path="matieres" component={intervenant_Matieres}/>
                    <Route path="evaluations_libres" component={intervenant_EvaluationsLibres}/>
                    <Route path="evaluations_examens" component={intervenant_EvaluationsExamens}/>
                </Route>
                <Route path="login" component={Login}/>
                <Route path="logout" component={Logout}/>
                <Route path="*" component={NoMatch}/>
            </Router>
        }
    </div>,
    document.getElementById('container')
);
