import React from 'react'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import auth from '../routes/auth/Auth.jsx'

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Sidebar />
        {this.props.children} {/*Affichage par defaut du tableau de bord*/}
      </div>
    )
  }
}

module.exports = App;
