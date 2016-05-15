import React from 'react'
import { Link } from 'react-router'
import activeComponent from 'react-router-active-component'
import auth from '../routes/auth/Auth.jsx'
var NavLink = activeComponent('li')

class Sidebar extends React.Component {
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
              <Link to="/logout"><span style={{fontSize: 11}}><i className="fa fa-sign-out" /> Déconnexion</span></Link>
            </div>
          </div>
          { localStorage.getItem('us_role') == 'ROLE_INTERVENANT'
              ?
              <ul className="sidebar-menu">
                <li className="header">MENU</li>
                <NavLink to="/" onlyActiveOnIndex><i className="fa fa-home" /> <span>Tableau de bord</span></NavLink>
                <NavLink to="/competences"><i className="fa fa-cog" /> <span>Compétences</span></NavLink>
                <NavLink to="/evaluations"><i className="fa fa-users" /> <span>Evaluations</span></NavLink>
                <NavLink to="/examens"><i className="fa fa-file-text-o" /> <span>Examens</span></NavLink>
                <NavLink to="/bilans"><i className="fa fa-pie-chart" /> <span>Bilans</span></NavLink>
                <NavLink to="/groupes"><i className="fa fa-connectdevelop" /> <span>Groupes</span></NavLink>
                <NavLink to="/matieres"><i className="fa fa-lightbulb-o" /> <span>Matières</span></NavLink>
              </ul>
              :
              <ul className="sidebar-menu">
                <li className="header">MENU</li>
                <NavLink to="/" onlyActiveOnIndex><i className="fa fa-home" /> <span>Tableau de bord</span></NavLink>
                <NavLink to="/evaluations"><i className="fa fa-users" /> <span>Evaluations</span></NavLink>
                <NavLink to="/bilans"><i className="fa fa-pie-chart" /> <span>Bilans</span></NavLink>
              </ul>
          }
        </section>
      </aside>)
    }
  }
  export default Sidebar
