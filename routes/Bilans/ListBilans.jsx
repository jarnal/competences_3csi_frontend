import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Select from 'react-select'
import MatiereService from '../../services/MatiereService.js'
const options_table = {
    noDataText: "Aucun bilan disponible"
};
function logChange(val) {
    console.log("Selected: " + val);
}

var ListBilans = React.createClass({
    //
    competences : null,
    currentCompetence : null,
    getInitialState () {
        return {multi: false, competences: []};
    },
    //
    onMatiereChange (value) {
        this.setState({
            value: value
        });
        var that = this;
        MatiereService.getCompetences(value.id, function (result) {
            console.log(result);
            that.competences = result;
            if(result.length > 0){
              document.getElementById('divCompetence').hidden = false;
            }
            else{
              document.getElementById('divCompetence').hidden = true;
            }
        });
    },
    onCompetenceChange (value) {
        this.currentCompetence = value;
    },


    //
    getCompetences: function (input, callback) {
        var data = {
            options: this.competences,
            complete: false
        };
        callback(null, data);
    },
    //
    getMatieres: function (input, callback) {
        MatiereService.getAll(function (result) {
            var data = {
                options: result["matieres"],
                complete: false
            };
            console.log(result["matieres"]);
            callback(null, data);
        });


    },
    //
    render: function () {
        return (
            <div>
                <section className="col-lg-12 connectedSortable">
                    {/* Listes Bilans */}
                    <div className="box-body">
                        <div className="row">
                            <div className="col-md-11 col-xs-12 col-lg-11">
                                <div className="form-group">
                                    <h4>Matière :</h4>
                                    <Select.Async id="selectMatiere" value={this.state.value} onChange={this.onMatiereChange} valueKey="id"
                                        labelKey="name" loadOptions={this.getMatieres}/>
                                </div>
                                <div className="form-group" hidden id="divCompetence">
                                    <h4>Compétence :</h4>
                                    <Select.Async id="selectCompetence" value={this.currentCompetence} onChange={this.onCompetenceChange} valueKey="id"
                                        labelKey="name" loadOptions={this.getCompetences}/>
                                </div>
                            </div>
                            <div className="col-md-12 col-xs-12 col-lg-12">
                                <BootstrapTable
                                    data={this.state.competences}
                                    height="250"
                                    striped={true}
                                    hover={true}
                                    searchPlaceholder="Rechercher"
                                    search={true}
                                    noDataText="test"
                                    options={options_table}>
                                    <TableHeaderColumn dataField="id" isKey={true} dataSort={true} hidden={true}>ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField="student" dataSort={true}>Etudiant</TableHeaderColumn>
                                    <TableHeaderColumn dataField="skill" dataSort={true}>Compétence</TableHeaderColumn>
                                    <TableHeaderColumn dataField="grade" dataSort={true}>Note</TableHeaderColumn>
                                </BootstrapTable>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
});
export default ListBilans
