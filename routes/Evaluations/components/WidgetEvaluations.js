import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

const Competences = [];

function addCompetences(quantity) {
  const startId = Competences.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    Competences.push({
      id: id,
      name: 'Nom de la Competence ' + id,
      price: 2100 + i
    });
  }
}

addCompetences(50);

const Utilisateurs = [];

function addUtilisateurs(quantity) {
  const startId = Utilisateurs.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    Utilisateurs.push({
      id: id,
      name: 'Nom utilisateur ' + id,
      price: 2100 + i
    });
  }
}

addUtilisateurs(50);

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true  // enable click to select
};

const options = {
  noDataText: "Aucune competence trouvée"
};

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
                <div className="box-body">
                  <BootstrapTable
                    data={Utilisateurs}
                    height="250"
                    striped={true}
                    hover={true}
                    selectRow={selectRowProp}
                    searchPlaceholder="Rechercher"
                    search={false}
                    noDataText="test"
                    options={options}>
                    <TableHeaderColumn dataField="id" isKey={true} dataSort={true} hidden={true}>Utilisateur ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort={true}>Nom de l'utilisateur</TableHeaderColumn>
                  </BootstrapTable>
                </div>
                <div className="box-footer">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" className="collapsed btn btn-primary pull-right" aria-expanded="false">Suivant</a>
                </div>
              </div>
              {/* /.tab-pane */}
              <div className="tab-pane" id="tab_2">
                <div className="box-body">
                  <div className="row">
                    <div className="col-md-12 col-xs-12 col-lg-12">
                      <div className="form-group">
                        <select className="form-control select2" style={{width: '100%'}}>
                          <option>PHP Initiation</option>
                          <option>PHP Avancé</option>
                          <option>C++ Programation</option>
                          <option>Réseau</option>
                          <option>Java</option>
                          <option>Module Développeur</option>
                          <option>Module Réseau</option>
                        </select>
                      </div>{/* /.form-group */}
                    </div>{/* /.col */}
                    <div className="col-md-12 col-xs-12 col-lg-12">
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
                  </div>{/* /.row */}
                </div>{/* /.box-body */}

                <div className="box-footer">
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" className="collapsed btn btn-default pull-left" aria-expanded="false">Précédent</a>
                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree" className="collapsed btn btn-primary pull-right" aria-expanded="false">Suivant</a>
                </div>
              </div>
              {/* /.tab-pane */}
              <div className="tab-pane" id="tab_3">
                <div className="box-body">
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
                </div>
              </div>
              {/* /.tab-pane */}
            </div>
            {/* /.tab-content */}
          </div>
          <div className="box-group" id="accordion">
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
          </div>
          {/* Listes Competences */}
          <div className="box box-primary">
            <div className="box-header with-border">
              <h3 className="box-title">Choix dun groupe de compétences</h3>
              <div className="col-md-3 col-xs-3 col-lg-3 pull-right">
              </div>
            </div>{/* /.box-header */}
            <div className="box-body">
              <div className="row">
                <div className="col-md-11 col-xs-12 col-lg-11">
                  <div className="form-group">
                    <select className="form-control select2" style={{width: '100%'}}>
                      <option>PHP Initiation</option>
                      <option>PHP Avancé</option>
                      <option>C++ Programation</option>
                      <option>Réseau</option>
                      <option>Java</option>
                      <option>Module Développeur</option>
                      <option>Module Réseau</option>
                    </select>
                  </div>{/* /.form-group */}
                </div>{/* /.col */}
                <div className="col-md-1 col-xs-12 col-lg-1">
                  <div className="form-group">
                    <button className="btn btn-default pull-right"><i className="fa fa-plus" /> </button>
                  </div>{/* /.form-group */}
                </div>{/* /.col */}
                <div className="col-md-12 col-xs-12 col-lg-12">
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
              </div>{/* /.row */}
            </div>{/* /.box-body */}
            <div className="box-footer clearfix no-border">
              <button className="btn btn-default col-md-12 col-xs-12">Ajouter une compétence</button>
            </div>
          </div>{/* /.box */}
        </section>{/* /.Left col */}
      </div>
    )
  }
}

export default WidgetEvaluations
