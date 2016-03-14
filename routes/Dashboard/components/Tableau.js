import React from 'react'
import Griddle from 'griddle-react'

var fakeData =  [
  {
    "id": 0,
    "name": "Mayer Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 7
  },
  {
    "id": 1,
    "name": "Mayer Leonard",
    "city": "Kapowsin",
    "state": "Hawaii",
    "country": "United Kingdom",
    "company": "Ovolo",
    "favoriteNumber": 7
  }
];

class Tableau extends React.Component {
  render() {
    return (
      <div>
        {/* Main row */}
        <div className="row">
          <div className="col-xs-12">
            {/* Left col */}
            <section className="col-lg-12 connectedSortable">
              {/* Listes Competences */}
              <div className="box box-primary">
                <div className="box-header with-border">
                  <h3 className="box-title">Choix d'un groupe de compétences</h3>
                  <div className="col-md-3 col-xs-3 col-lg-3 pull-right">
                  </div>
                </div>{/* /.box-header */}
                <div className="box-body">
                  <Griddle results={fakeData} />
                </div>{/* /.box-body */}
                <div className="box-footer clearfix no-border">
                  <button className="btn btn-default pull-right"><i className="fa fa-plus" /> Ajouter une compétence</button>
                </div>
              </div>{/* /.box */}
            </section>{/* /.Left col */}
          </div>{/* /.row (main row) */}
        </div>{/* /.content-wrapper */}
      </div>
    )
  }
}

export default Tableau
