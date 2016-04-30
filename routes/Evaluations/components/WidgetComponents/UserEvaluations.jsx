import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

/***************           Load fake Users           ***************/
const Utilisateurs = [];

function addUtilisateurs(quantity) {
  const startId = Utilisateurs.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    Utilisateurs.push({
      id: id,
      name: 'Thomas ' + id
    });
  }
}

addUtilisateurs(50);
/********************************************************************/
const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true  // enable click to select
};

const options = {
  noDataText: "Aucun utilisateur trouvée"
};

class UserEvaluations extends React.Component {
  render() {
    return (
      <div className="box-body col-xs-5">
        <BootstrapTable
          data={Utilisateurs}
          height="250"
          striped={true}
          hover={true}
          selectRow={selectRowProp}
          searchPlaceholder="Rechercher"
          search={true}
          noDataText="test"
          options={options}>
          <TableHeaderColumn dataField="id" isKey={true} dataSort={true} hidden={true}>Utilisateur ID</TableHeaderColumn>
          <TableHeaderColumn dataField="name" dataSort={true}>Nom de l'utilisateur</TableHeaderColumn>
        </BootstrapTable>
      </div>
    )
  }
}

export default UserEvaluations
