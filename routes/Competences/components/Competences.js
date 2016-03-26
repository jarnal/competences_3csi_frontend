import React from 'react'
import ListCompetences from './ListCompetences'
class Competences extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            Gestionnaire de compétences
            <small>Toutes les compétences par section</small>
          </h1>
        </section>
        <section className="content" style={{ minHeight: 550 }}>
          <div className="row">
            <div className="col-xs-12">
              <ListCompetences />
            </div>{/* /.row (main row) */}
          </div>
        </section>
      </div>
    )
  }
}

module.exports = Competences
