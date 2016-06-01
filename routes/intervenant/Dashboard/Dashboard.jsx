import React from 'react'
import { Link } from 'react-router'

class Dashboard extends React.Component {

    // - Called when the component has been mounted
    componentDidMount() {
        $(window).trigger('resize');
        /*var button = $("a[data-toggle='offcanvas']");
        console.log($);
        $.AdminLTE.pushMenu.activate(button);*/
    }

    // - Render the component view
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Tableau de bord
                        <small>Toutes les dernières statistiques</small>
                    </h1>
                </section>
                <section className="content" style={{ minHeight: 550 }}>
                    {/* Contenu */}
                </section>
            </div>
        )
    }
}

module.exports = Dashboard;
