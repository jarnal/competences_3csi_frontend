import React from 'react'
import { Link } from 'react-router'

class GlobalNav extends React.Component {

  render() {
    const { user } = this.props

    return (
      <header className="main-header">
        <Link to="/" className="logo">
          <span className="logo-mini"><b>A</b>S</span>
          <span className="logo-lg"><b>Admin</b> Skill</span>
        </Link>
        <nav className="navbar navbar-static-top" role="navigation">
          <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
            <span className="sr-only">Toggle navigation</span>
          </a>
        </nav>
      </header>
    )
  }
}

export default GlobalNav
