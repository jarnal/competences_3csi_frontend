import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, Route, withRouter  } from 'react-router'
import auth from './routes/auth/Auth.jsx'
import App from './components/App.jsx'
import Bilans from './routes/Bilans/Bilans.jsx'
import Competences from './routes/Competences/Competences.jsx'
import Evaluations from './routes/Evaluations/Evaluations.jsx'
import Examens from './routes/Examens/Examens.jsx'
import Groupes from './routes/Groupes/Groupes.jsx'
import Matieres from './routes/Matieres/Matieres.jsx'

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

const NoMatch = React.createClass({
  render(){
    return(
      <div>Cette page n'existe pas</div>
    )
  }});

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
          return this.setState({ error: true })

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
            <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
            <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
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
  })

  render(
    <Router history={browserHistory}>
      <Route path="/" component={App} onEnter={requireAuth}>
        <Route path="bilans" component={Bilans}/>
        <Route path="competences" component={Competences}/>
        <Route path="evaluations" component={Evaluations}/>
        <Route path="examens" component={Examens}/>
        <Route path="groupes" component={Groupes}/>
        <Route path="matieres" component={Matieres}/>
      </Route>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="*" component={NoMatch}/>
    </Router>,
    document.getElementById('container')
  )
