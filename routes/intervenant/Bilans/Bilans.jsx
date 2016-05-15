import React from 'react'
import ListBilans from './ListBilans.jsx'
console.log(sessionStorage.getItem("us_role"));
class Bilans extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Bilans
              <small>En construction...</small>
              <small>Todo...</small>
              <div className="form-group col-md-2 col-xs-12 col-lg-2 pull-right">
                  <select className="form-control select2" style={{width: '100%'}}>
                      <option>3CSI</option>
                      <option>MS2I</option>
                      <option>SN</option>
                  </select>
              </div>
            </h1>
          </section>
          <section className="content" style={{ minHeight: 550 }}>
            {/* contenu */}
          <div className="row">
              <div className="col-xs-12">
                  {/* Left col */}
                  <section className="col-lg-7 connectedSortable">
                      {/* Liste Bilans */}
                      <div className="box box-primary">
                          <div className="box-header with-border">
                              <h3 className="box-title">Bilans des évaluations</h3>
                          </div>
                          {/* /.box-header */}
                          <div className="box-body">
                              <div className="row">
                                  <div className="col-md-12 col-xs-12 col-lg-12">
                                    <ListBilans />
                                  </div>
                              </div>
                              {/* /.row */}
                          </div>
                          {/* /.box-body */}
                      </div>
                      {/* /.box */}
                  </section>
                  {/* /.Left col */}
              </div>
              {/* /.row (main row) */}
          </div>
          </section>
      </div>
    )
  }
}

module.exports = Bilans
