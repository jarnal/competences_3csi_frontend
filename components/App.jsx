import React from 'react'
import Dashboard from '../routes/Dashboard/components/Dashboard.jsx'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        {this.props.children || <Dashboard />} {/*Affichage par defaut du tableau de bord*/}
      </div>
    )
  }
}

module.exports = App
