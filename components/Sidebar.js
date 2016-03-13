import React from 'react'
import { Link } from 'react-router'
const activeColor = '#3c8dbc';
const styles = {}
styles.link = {
}

styles.activeLink = {
  ...styles.link,
  color: 'dark'
}

class GlobalNav extends React.Component {

  render() {

    return (
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img src={require('../content/dist/img/avatar5.png')} className="img-circle" alt="User Image" />
            </div>
            <div className="pull-left info">
              <p>Thomas Sebbane</p>
              <span style={{fontSize: 11}}><a href="#"><i className="fa fa-sign-out" /> Déconnexion</a></span>
            </div>
          </div>
          <ul className="sidebar-menu">
            <li className="header">MENU</li>
            <li><Link to="/"><i className="fa fa-home" /> <span>Tableau de bord</span></Link></li>
            <li><Link to="/competences"><i className="fa fa-cog" /> <span>Compétences</span></Link></li>
            <li><Link to="/evaluer"><i className="fa fa-users" /> <span>Evaluer</span></Link></li>
            <li><Link to="/examens"><i className="fa fa-file-text-o" /> <span>Examens</span></Link></li>
            <li><Link to="/bilans"><i className="fa fa-pie-chart" /> <span>Bilans</span></Link></li>
            <li><Link to="/groupes"><i className="fa fa-connectdevelop" /> <span>Groupes</span></Link></li>
            <li><Link to="/matieres"><i className="fa fa-lightbulb-o" /> <span>Matières</span></Link></li>
          </ul>
        </section>
      </aside>)
    }
  }
  export default GlobalNav
