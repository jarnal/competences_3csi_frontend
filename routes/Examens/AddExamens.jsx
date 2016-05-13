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

class AddExamens extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        competences_selected: []
    };
    this.onCompetenceSelect = this.onCompetenceSelect.bind(this);
    this.onCompetenceSelectAll = this.onCompetenceSelectAll.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    var competences_selected = this.state.competences_selected;
    console.log(competences_selected);
    // Fetch form values.
    var formData = {
      nom: document.getElementById('nom_examen').value,
      description: document.getElementById('description').value,
      competences: competences_selected,
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

  //
  getCompetenceSelectRowProp() {
      return {
          mode: 'checkbox',
          clickToSelect: true,
          onSelect: this.onCompetenceSelect,
          onSelectAll: this.onCompetenceSelectAll
      };
  }

  //
  onCompetenceSelect(row, isSelected) {
      var competences_selected = this.state.competences_selected;
      if (isSelected) {
          competences_selected.push(row);
      }
      else {
          var unselected = competences_selected.indexOf(row);
          if (unselected != -1) {
              competences_selected.splice(unselected, 1);
          }
      }

      this.setState({
          competences_selected: competences_selected
      });
      console.log(this.state.competences_selected);
  }

  //
  onCompetenceSelectAll(isSelected, currentDisplayAndSelectedData) {
      var competences_selected = this.state.competences_selected;
      if (isSelected) {
          for (let i = 0; i < currentDisplayAndSelectedData.length; i++) {
              competences_selected.push(currentDisplayAndSelectedData[i]);
          }
      }
      else {
          competences_selected = [];
      }

      this.setState({
          competences_selected: competences_selected
      });
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
                    <ListCompetences selectRowProp={this.getCompetenceSelectRowProp()}/>
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
