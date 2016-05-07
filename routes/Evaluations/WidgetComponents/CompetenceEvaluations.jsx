import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'


/***************        Load fake Competences        ***************/
const Competences = [];

function addCompetences(quantity) {
  const startId = Competences.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    Competences.push({
      id: id,
      name: 'Nom de la Competence ' + id
    });
  }
}

addCompetences(50);
/********************************************************************/

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true  // enable click to select
};

const options = {
  noDataText: "Aucune competence trouvée"
};

class CompetencesEvaluations extends React.Component {
  render() {
    return (
      <div className="box-body col-xs-7">
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
            </div>
          </div>
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
        </div>
      </div>
    )
  }
}

export default CompetencesEvaluations
