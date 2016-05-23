import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Select from 'react-select'
import MatiereService from '../../../services/MatiereService.js'
import GroupService from '../../../services/GroupService.js'
import UserService from '../../../services/UserService.js'

const options_table = {
    noDataText: "Aucun bilan disponible"
};
function logChange(val) {
    console.log("Selected: " + val);
}
var ListBilansMatieres = React.createClass({
    //
    getInitialState () {
        return {
            multi: false,
            competences: [],
            is_competences_loading: false,
            matieres: [],
            is_matieres_loading: false,
            examens: [],
            is_examens_loading: false,
            data: []
        };
    },

    //
    onChangeMatiere (value) {

        this.setState({
            matiere_value: value,
            competence_value: null,
            is_competences_loading: true
        });

        var that = this;
        MatiereService.getCompetences(value.id, function (result) {
            that.setState({
                competences: result,
                is_competences_loading: false
            })
        });

    },

    onChangeCompetence(value) {
        this.setState({
            competence_value: value
        });

    },

    //
    componentWillReceiveProps(nextProps) {

        var that = this;
        var groupID = nextProps.selected_group;

        this.setState({
            selected_group: groupID,
            is_matieres_loading: true,
            is_examens_loading: true,
            matiere_value: null,
            competence_value: null
        });

        this.getMatieres(groupID, function (data) {
            that.setState({
                matieres: data,
                is_matieres_loading: false
            });
        });
    },

    //
    getMatieres: function (id, callback) {

        GroupService.getMatieres(id, function (result) {
            callback(result);
        });
    },

    //
    getCompetences: function (matiereID) {
        var that = this;
        MatiereService.getCompetences(matiereID, function (result) {
            that.setState({
                competences: result
            })
        });
    },

    //
    render: function () {
        return (
            <div>
                {/* Left col */}
                <section className="col-xs-12 connectedSortable">
                    {/* Listes Competences */}
                    {/* /.box-header */}
                    <div className="box-body">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="row">
                                    <div className="col-xs-6 form-group">
                                        <h4>Matière :</h4>
                                        <Select
                                            value={this.state.matiere_value}
                                            onChange={this.onChangeMatiere}
                                            valueKey="id"
                                            labelKey="name"
                                            isLoading={this.state.is_matieres_loading}
                                            options={this.state.matieres}
                                        />
                                    </div>
                                    <div className="col-xs-6 form-group">
                                        <h4>Compétence :</h4>
                                        <Select
                                            value={this.state.competence_value}
                                            onChange={this.onChangeCompetence}
                                            valueKey="id"
                                            labelKey="name"
                                            options={this.state.competences}
                                            isLoading={this.state.is_competences_loading}
                                        />
                                    </div>
                                </div>
                                {/* /.form-group */}
                            </div>
                            {/* /.col */}
                            <div className="col-xs-12">
                                <BootstrapTable
                                    data={this.state.data}
                                    height="250"
                                    striped={true}
                                    hover={true}
                                    searchPlaceholder="Rechercher"
                                    search={true}
                                    noDataText="test"
                                    options={options_table}>
                                    <TableHeaderColumn dataField="id" isKey={true} dataSort={true}
                                                       hidden={true}>ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField="user_name" dataSort={true}>Etudiant</TableHeaderColumn>
                                    <TableHeaderColumn dataField="competence_name" dataSort={true}>Compétence</TableHeaderColumn>
                                    <TableHeaderColumn
                                        dataField="type_note_value_auto"
                                        dataSort={true}
                                        filter={ { type: 'NumberFilter', delay: 1000, numberComparators: [ '=', '>', '<' ] } }
                                    >
                                        Evaluation personnelle
                                    </TableHeaderColumn>
                                    <TableHeaderColumn dataField="type_note_label_auto" dataSort={true}>Libellé</TableHeaderColumn>
                                    <TableHeaderColumn dataField="type_note_value" dataSort={true}>Evaluation intervenant</TableHeaderColumn>
                                    <TableHeaderColumn dataField="type_note_label" dataSort={true}>Libellé</TableHeaderColumn>
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
export default ListBilansMatieres
