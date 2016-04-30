import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
const rootRoute = {
  component: 'div',
  childRoutes: [ {
    path: '/',
    component: require('./components/App.jsx'),
    childRoutes: [
      require('./routes/Bilans/index.jsx'),
      require('./routes/Competences/index.jsx'),
      require('./routes/Evaluations/index.jsx'),
      require('./routes/Examens/index.jsx'),
      require('./routes/Groupes/index.jsx'),
      require('./routes/Matieres/index.jsx')
    ]
  } ]
}

render(
  <Router history={browserHistory} routes={rootRoute} />,
  document.getElementById('container')
)
