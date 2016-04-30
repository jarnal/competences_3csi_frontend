import React from 'react'
import ListCompetences from './ListCompetences.jsx'

class Competences extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            Gestionnaire de compétences
            <small>Toutes les compétences par section</small>
            <div className="form-group col-md-2 col-xs-12 col-lg-2 pull-right">
              <select className="form-control select2" style={{width: '100%'}}>
                <option>3CSI</option>
                <option>MS2I</option>
                <option>SN</option>
              </select>
            </div>{/* /.form-group */}
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
