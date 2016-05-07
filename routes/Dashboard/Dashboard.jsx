import React from 'react'
import { Link } from 'react-router'
class Dashboard extends React.Component {
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

module.exports = Dashboard
