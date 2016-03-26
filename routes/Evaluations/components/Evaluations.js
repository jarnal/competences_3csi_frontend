import React from 'react'
import WidgetEvaluations from './WidgetEvaluations'
class Evaluations extends React.Component {
  render() {
    return (
      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            Evaluations
            <small>En Construction...</small>
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
              <WidgetEvaluations />
            </div>{/* /.row (main row) */}
          </div>
        </section>
      </div>
    )
  }
}

module.exports = Evaluations
