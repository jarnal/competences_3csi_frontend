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

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true  // enable click to select
};

const options = {
  noDataText: "Aucune competence trouvée"
};

var UserGist = React.createClass({
  getInitialState: function() {
    return {
      username: 'Chargement...',
      lastGistUrl: ''
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, function (result) {
      var lastGist = result[0];
      this.setState({
        username: lastGist.owner.login,
        lastGistUrl: lastGist.html_url
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        {this.state.username}s last gist is
        <a href={this.state.lastGistUrl}>here</a>.
      </div>
    );
  }
});

class ListCompetences extends React.Component {

  render() {
    return (
      <div>
        <UserGist source="https://api.github.com/users/octocat/gists" />
        {/* Left col */}
        <section className="col-lg-7 connectedSortable">
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

export default ListCompetences
