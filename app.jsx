import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, Route } from 'react-router'
import App from './components/App.jsx'
import Bilans from './routes/Bilans/Bilans.jsx'
import Competences from './routes/Competences/Competences.jsx'
import Evaluations from './routes/Evaluations/Evaluations.jsx'
import Examens from './routes/Examens/Examens.jsx'
import Groupes from './routes/Groupes/Groupes.jsx'
import Matieres from './routes/Matieres/Matieres.jsx'

const NoMatch = React.createClass({
  render(){
    return(
      <div>Cette page n'existe pas</div>
    )
  }});

  render(
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/bilans" component={Bilans}/>
        <Route path="/competences" component={Competences}/>
        <Route path="/evaluations" component={Evaluations}/>
        <Route path="/examens" component={Examens}/>
        <Route path="/groupes" component={Groupes}/>
        <Route path="/matieres" component={Matieres}/>
      </Route>
      <Route path="*" component={NoMatch}/>
    </Router>,
    document.getElementById('container')
  )
