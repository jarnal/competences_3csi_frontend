import React from 'react'
import { Link } from 'react-router'
import activeComponent from 'react-router-active-component'
import auth from '../routes/auth/Auth.jsx'
var NavLink = activeComponent('li')

class Sidebar extends React.Component {
    // - Render sidebar
    render() {

        return (
            <aside className="main-sidebar">
                <section className="sidebar">
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src={require('../content/dist/img/avatar5.png')} className="img-circle"
                                 alt="User Image"/>
                        </div>
                        <div className="pull-left info">
                            <p>{localStorage.getItem('us_name')}</p>
                            <Link to="/logout"><span style={{fontSize: 11}}><i className="fa fa-sign-out"/> Déconnexion</span></Link>
                        </div>
                    </div>
                    { localStorage.getItem('us_role') == 'ROLE_INTERVENANT'
                        ?
                        <ul className="sidebar-menu">
                            <li className="header">MENU</li>
                            <NavLink to="/" onlyActiveOnIndex><i className="fa fa-home"/>
                                <span>Tableau de bord</span></NavLink>
                            <NavLink to="/competences"><i className="fa fa-cog"/> <span>Compétences</span></NavLink>
                            <li className="treeview">
                                <a href="#">
                                    <i className="fa fa-users"/> <span>Evaluations</span>
                                    <i className="fa fa-angle-left pull-right"/>
                                </a>
                                <ul className="treeview-menu" style={{display: "none"}}>
                                    <NavLink to="/evaluations_examens"><i className="fa fa-users"/> <span>Evaluations examen</span></NavLink>
                                    <NavLink to="/evaluations_libres"><i className="fa fa-users"/> <span>Evaluations libres</span></NavLink>
                                </ul>
                            </li>
                            <NavLink to="/examens"><i className="fa fa-file-text-o"/> <span>Examens</span></NavLink>
                            <NavLink to="/bilans"><i className="fa fa-pie-chart"/> <span>Bilans</span></NavLink>
                            <NavLink to="/statistiques"><i className="fa fa-area-chart"/> <span>Statistiques</span></NavLink>
                        </ul>
                        :
                        <ul className="sidebar-menu">
                            <li className="header">MENU</li>
                            <NavLink to="/" onlyActiveOnIndex><i className="fa fa-home"/>
                                <span>Tableau de bord</span></NavLink>
                            <NavLink to="/evaluations_libres"><i className="fa fa-users"/> <span>Mes Evaluations</span></NavLink>
                            <NavLink to="/bilans"><i className="fa fa-pie-chart"/> <span>Mes Bilans</span></NavLink>
                            <NavLink to="/diplomes"><i className="fa fa-graduation-cap"/> <span>Mes Diplomes</span></NavLink>
                            <NavLink to="/calendar"><i className="fa fa-calendar"/> <span>Mon Calendrier</span></NavLink>
                        </ul>
                    }
                </section>
            </aside>)
    }
}
export default Sidebar;
