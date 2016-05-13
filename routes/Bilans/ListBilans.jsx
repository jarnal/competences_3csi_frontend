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
    getInitialState () {
        return {multi: false, competences: []};
    },
    //
    onChange (value) {
        this.setState({
            value: value
        });
        this.getCompetences(value.id);
    },
    //
    getCompetences: function (matiereID) {
        var that = this;
        MatiereService.getCompetences(matiereID, function (result) {
            console.log(result);
            that.setState({
                competences: result
            })
        });
    },
    //
    getMatieres: function (input, callback) {
        MatiereService.getAll(function (result) {
            var data = {
                options: result["matieres"],
                complete: false
            };
            callback(null, data);
        });
    },
    //
    render: function () {
        return (
            <div>
                {/* Left col */}
                <section className="col-lg-7 connectedSortable">
                    {/* Listes Competences */}
                    {/* /.box-header */}
                    <div className="box-body">
                        <div className="row">
                            <div className="col-md-11 col-xs-12 col-lg-11">
                                <div className="form-group">
                                    <h4>Matière :</h4>
                                    <Select.Async value={this.state.value} onChange={this.onChange} valueKey="id"
                                        labelKey="name" loadOptions={this.getMatieres}/>
                                </div>
                                <div className="form-group">
                                    <h4>Compétence :</h4>
                                    <Select.Async value={this.state.value} onChange={this.onChange} valueKey="id"
                                        labelKey="name" loadOptions={this.getCompetences}/>
                                </div>
                                {/* /.form-group */}
                            </div>
                            {/* /.col */}
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
                        {/* /.row */}
                    </div>
                    {/* /.box-body */}
                    {/* /.box */}
                </section>
                {/* /.Left col */}
            </div>
        )
    }
});
export default ListBilans
