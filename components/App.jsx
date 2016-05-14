import React from 'react'
import Dashboard from '../routes/Dashboard/Dashboard.jsx'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'
import auth from '../routes/auth/Auth.jsx'

const token = auth.getToken();
class App extends React.Component {
  render() {
    return (
      <div id="app">
        <Header />
        <Sidebar />
        {this.props.children || <Dashboard />}
      </div>
    )
  }
}

module.exports = App
