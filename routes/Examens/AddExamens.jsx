import React from 'react'
import SkyLight from 'react-skylight'
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

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true  // enable click to select
};

const options_table = {
  noDataText: "Aucune competence trouvée"
};

class AddExamens extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    var style = {
      width: '80%',
      top: 'initial',
      marginLeft: '-40%',
      zIndex: '2000',
      height: '75%'
    };
    return (
      <div>
        <button className="btn btn-block btn-primary" onClick={() => this.refs.simpleDialog.show()}>Nouveau examen</button>

        <SkyLight dialogStyles={style} hideOnOverlayClicked ref="simpleDialog" onChange={this.handleChange} title="Nouveau examen">
          <div style={{overflow:'auto', height:'inherit'}}>
            <div className="box-body" style={{overflow: 'auto'}}>
              <div className="col-xs-12 col-md-6 col-lg-6">
                <div className="form-group">
                  <label >Nom de l'examen</label>
                  <input type="examen" className="form-control" id="examen" placeholder="Nom de l'examen" />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea className="form-control" rows={3} placeholder="Veuillez saisir une description ..." style={{maxWidth:'100%', height: '200px'}} defaultValue={""} />
                </div>
              </div>
              <div className="col-xs-12 col-md-6 col-lg-6">
                <BootstrapTable
                  data={Competences}
                  height="250"
                  striped={true}
                  hover={true}
                  selectRow={selectRowProp}
                  searchPlaceholder="Rechercher"
                  search={true}
                  noDataText="test"
                  options={options_table}>
                  <TableHeaderColumn dataField="id" isKey={true} dataSort={true} hidden={true}>Competence ID</TableHeaderColumn>
                  <TableHeaderColumn dataField="name" dataSort={true}>Nom de la compétence</TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>

          </div>
          <div className="box-footer">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </SkyLight>
      </div>
    )
  }
}

AddExamens.displayName = 'Example';

module.exports = AddExamens
