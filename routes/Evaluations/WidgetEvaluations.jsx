import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import CompetenceEvaluations from './WidgetComponents/CompetenceEvaluations.jsx'
import UserEvaluations from './WidgetComponents/UserEvaluations.jsx'

class WidgetEvaluations extends React.Component {
  render() {
    return (
      <div>
        {/* Left col */}
        <section className="col-lg-12 connectedSortable">
          <div className="nav-tabs-custom">
            <ul className="nav nav-tabs">
              <li className="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Selection des utilisateurs</a></li>
              <li className><a href="#tab_2" data-toggle="tab" aria-expanded="false">Selection des compétences</a></li>
              <li><a href="#tab_3" data-toggle="tab">Attribution des compétences</a></li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane active" id="tab_1">
                <UserEvaluations />
                <div className="box-footer">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" className="collapsed btn btn-primary pull-right" aria-expanded="false">Suivant</a>
                </div>
              </div>
              {/* /.tab-pane */}
              <div className="tab-pane" id="tab_2">
                <div className="box-footer">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" className="collapsed btn btn-default pull-left" aria-expanded="false">Précédent</a>
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree" className="collapsed btn btn-primary pull-right" aria-expanded="false">Suivant</a>
                </div>
              </div>
              {/* /.tab-pane */}
              <div className="tab-pane" id="tab_3">
                {/*                <div className="box-body">
                  <BootstrapTable
                  data={Competences}
                  height="250"
                  striped={true}
                  hover={true}
                  selectRow={selectRowProp}
                  searchPlaceholder="Rechercher"
                  search={false}
                  noDataText="test"
                  options={options}>
                  <TableHeaderColumn dataField="id" isKey={true} dataSort={true} hidden={true}>Competence ID</TableHeaderColumn>
                  <TableHeaderColumn dataField="name" dataSort={true}>Nom de la compétence</TableHeaderColumn>
                  </BootstrapTable>
                  </div>*/}
                </div>
                {/* /.tab-pane */}
              </div>
              {/* /.tab-content */}
            </div>
            {/*          <div className="box-group" id="accordion">
              <div className="panel box box-primary">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" className>
              <div className="box-header with-border">
              <h4 className="box-title">
              Selection des utilisateurs
              </h4>
              </div>
              </a>
              <div id="collapseOne" className="panel-collapse collapse in" aria-expanded="true">
              <div className="box-body">
              <BootstrapTable
              data={Competences}
              height="250"
              striped={true}
              hover={true}
              selectRow={selectRowProp}
              searchPlaceholder="Rechercher"
              search={true}
              noDataText="test"
              options={options}>
              <TableHeaderColumn dataField="id" isKey={true} dataSort={true} hidden={true}>Competence ID</TableHeaderColumn>
              <TableHeaderColumn dataField="name" dataSort={true}>Nom de la compétence</TableHeaderColumn>
              </BootstrapTable>
              </div>
              <div className="box-footer">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" className="collapsed btn btn-primary pull-right" aria-expanded="false">Suivant</a>
              </div>
              </div>
              </div>
              <div className="panel box box-primary">
              <div className="box-header with-border">
              <h4 className="box-title">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" className="collapsed" aria-expanded="false">
              Selection des competences
              </a>
              </h4>
              </div>
              <div id="collapseTwo" className="panel-collapse collapse" aria-expanded="false" style={{height: 0}}>
              <div className="box-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
              wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
              eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
              assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
              farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
              labore sustainable VHS.
              </div>
              <div className="box-footer">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" className="collapsed btn btn-default pull-left" aria-expanded="false">Précédent</a>
              <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree" className="collapsed btn btn-primary pull-right" aria-expanded="false">Suivant</a>
              </div>
              </div>
              </div>
              <div className="panel box box-primary">
              <div className="box-header with-border">
              <h4 className="box-title">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree" className="collapsed" aria-expanded="false">
              Attribution des competences
              </a>
              </h4>
              </div>
              <div id="collapseThree" className="panel-collapse collapse" aria-expanded="false" style={{height: 0}}>
              <div className="box-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3
              wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
              eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla
              assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred
              nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer
              farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
              labore sustainable VHS.
              </div>
              <div className="box-footer">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" className="collapsed btn btn-default pull-left" aria-expanded="false">Précédent</a>
              <button type="submit" className="btn btn-success pull-right">Sauvegarder</button>
              </div>
              </div>
              </div>
              </div>*/}
            </section>{/* /.Left col */}
          </div>
        )
      }
    }

    export default WidgetEvaluations
