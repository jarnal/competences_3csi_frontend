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
var ListBilansExamens = React.createClass({
    //
    getInitialState () {
        return {
            multi: false,
            examens: [],
            is_examens_loading: false,
            data: []
        };
    },

    onChangeExamen(value) {

        this.setState({
            examen_value: value
        });

        var that = this;
        UserService.getUserListWithEvaluationByGroupAndExamen(this.props.selected_group, value.id , function(result){
            that.setState({
                data: result
            });
        });

    },

    //
    componentWillReceiveProps(nextProps) {

        var that = this;
        var groupID = nextProps.selected_group;

        this.setState({
            selected_group: groupID,
            is_examens_loading: true
        });

        this.getExamens(groupID, function (data) {
            that.setState({
                examens: data,
                is_examens_loading: false
            });
        });
    },

    //
    getExamens: function(id, callback) {

        GroupService.getExamens(id, function (result) {
            callback(result);
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
                                    <div className="col-xs-12 form-group">
                                        <h4>Examens :</h4>
                                        <Select
                                            value={this.state.examen_value}
                                            onChange={this.onChangeExamen}
                                            valueKey="id"
                                            labelKey="name"
                                            isLoading={this.state.is_examens_loading}
                                            options={this.state.examens}
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
export default ListBilansExamens
