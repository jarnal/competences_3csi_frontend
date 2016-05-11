import React from 'react'
import SkyLight from 'react-skylight'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import ListCompetences from '../Competences/ListCompetences.jsx'
import 'react-datepicker/dist/react-datepicker.css'

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

var selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true,
    onSelect: onRowSelect,
    onSelectAll: onSelectAll
};

var CompetencesSelected = [];
function onRowSelect(row, isSelected){
      if(isSelected){
        CompetencesSelected.push(row.id);
        console.log(CompetencesSelected);
      }
      else{
        var unselected = CompetencesSelected.indexOf(row.id);
        if(unselected != -1) {
          CompetencesSelected.splice(unselected, 1);
        }
        console.log(CompetencesSelected);
      }
}

function onSelectAll(isSelected, currentDisplayAndSelectedData){
    if(isSelected){
        for (let i = 0; i < currentDisplayAndSelectedData.length; i++) {
            CompetencesSelected.push(currentDisplayAndSelectedData[i].id);
          console.log(CompetencesSelected);
        }
    }
    else {
        CompetencesSelected = [];
        console.log(CompetencesSelected);
    }
}


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
    if(formData.competences.length == 0)
    {
      return alert("Veuillez saisir une competences")
    }
    else{
      console.log(JSON.stringify(formData));
      $.ajax({
        type: "POST",
        url: "http://localhost/test/test.php",
        data: JSON.stringify(formData),
        jsonp: "callback",
        dataType: "jsonp",
        cache: false,
        success(data) {
          console.log(data);
          this.props.simpleDialog.hide()
          alert(data);
        },

        error(resultat, statut, erreur){
          alert("Erreur veuillez ressayer")
          this.props.simpleDialog.hide()
        }
      });
    }
  }

  render() {
    var style = {
      width: '80%',
      top: 'initial',
      marginLeft: '-40%',
      zIndex: '2000',
      height: 'auto',
      overflow: 'auto'
    };
    return (
      <div>
        <button className="btn btn-block btn-primary" onClick={() => this.refs.simpleDialog.show()}>Nouveau examen</button>

        <SkyLight dialogStyles={style} hideOnOverlayClicked ref="simpleDialog" onChange={this.handleChange} title="Nouvelle examen">
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
                    <ListCompetences addCompetence={false} selectRowProp={selectRowProp}/>
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
