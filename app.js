import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'

const rootRoute = {
  component: 'div',
  childRoutes: [ {
    path: '/',
    component: require('./components/App'),
    childRoutes: [
      require('./routes/Bilans'),
      require('./routes/Competences'),
      require('./routes/Evaluations'),
      require('./routes/Examens'),
      require('./routes/Groupes'),
      require('./routes/Matieres')
    ]
  } ]
}
/*te565st*/

render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('container')
)
