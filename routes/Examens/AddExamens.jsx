import React from 'react'
import SkyLight from 'react-skylight'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import 'react-datepicker/dist/react-datepicker.css'

const Competences = [];

function addCompetences(quantity) {
  const startId = Competences.length;
  for (let i = 0; i < quantity; i++) {
    const id = startId + i;
    Competences.push({
      id: id+5,
      name: 'Nom de la Competence ' + id+5
    });
  }
}

addCompetences(50);

var DateSelect = React.createClass({

  getInitialState: function() {
    return {
      startDate: moment()
    };
  },

  handleChange: function(date) {
    this.setState({
      startDate: date
    });
  },

  render: function() {
    return <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
        className="form-control"
        dateFormat="DD/MM/YYYY"
        id="date"
        required />;
  }
});

var CompetencesSelected = [];
function onRowSelect(row, isSelected){
  if(isSelected){
    CompetencesSelected.push(row.id);
  }
  else{
    var unselected = CompetencesSelected.indexOf(row.id);
    if(unselected != -1) {
      CompetencesSelected.splice(unselected, 1);
    }
  }
}

function onSelectAll(isSelected){
  if(isSelected){
    for (var competence in Competences) {
      CompetencesSelected.push(Competences[competence].id);
    }
  }
  else{
    CompetencesSelected = [];
  }
}

const selectRowProp = {
  mode: 'checkbox',
  clickToSelect: true,  // enable click to select
  onSelect: onRowSelect,
  onSelectAll: onSelectAll
};

const options_table = {
  noDataText: "Aucune competence trouvée"
};

class AddExamens extends React.Component {
  constructor(props){
    super(props);
  }

  handleSubmit(event){
    event.preventDefault();
    // Fetch form values.
    var formData = {
      nom: document.getElementById('nom_examen').value,
      description: document.getElementById('description').value,
      competences: CompetencesSelected,
      date : document.getElementById('date').value
    };
    console.log(JSON.stringify(formData));
    $.ajax({
      type: "POST",
      url: "http://localhost/test/test.php",
      data: formData,
      jsonp: "callback",
      dataType: "jsonp",
      cache: false,
      success: function(data) {
        console.log(data);
        this.refs.simpleDialog.hide()
        alert(data);
      },

      complete : function(data, statut){

      }
    });
  }

  render() {
    var style = {
      width: '80%',
      top: 'initial',
      marginLeft: '-40%',
      zIndex: '2000',
      height: '75%',
      overflow: 'auto'
    };
    return (
      <div>
        <button className="btn btn-block btn-primary" onClick={() => this.refs.simpleDialog.show()}>Nouveau examen</button>

        <SkyLight dialogStyles={style} hideOnOverlayClicked ref="simpleDialog" onChange={this.handleChange} title="Nouveau examen">
          <form action="" onSubmit={this.handleSubmit}>
            <div style={{overflow:'auto', height:'inherit'}}>
              <div className="box-body" style={{overflow: 'auto'}}>
                <div className="col-xs-12 col-md-6 col-lg-6">
                  <div className="form-group">
                    <label >Nom de l'examen</label>
                    <input type="examen" className="form-control" id="nom_examen" placeholder="Nom de l'examen" required/>
                  </div>
                  <div className="form-group">
                    <label>Date de l'examen</label>
                    {" "}
                    <br />
                    <DateSelect />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea className="form-control" id="description" rows={3} placeholder="Veuillez saisir une description ..." style={{maxWidth:'100%', height: '110px'}} defaultValue={""} required/>
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
              <button className="btn btn-lg btn-default" onClick={() => this.refs.simpleDialog.hide()}>Annuler</button>
              <button type="submit" className="btn btn-lg btn-success pull-right">Sauvegarder</button>
            </div>
          </form>
        </SkyLight>
      </div>
    )
  }
}

AddExamens.displayName = 'Example';

module.exports = AddExamens
