import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Select from 'react-select'
import MatiereService from '../../../services/MatiereService.js'
import GroupService from '../../../services/GroupService.js'
import UserService from '../../../services/UserService.js'
import Auth from '../../auth/Auth.jsx'

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

    // -
    handleGroupValueChanged(value) {
        this.setState({selected_group: value});
    },

    onChangeExamen(value) {

        /*this.setState({
            examen_value: value
        });

        var that = this;
        UserService.getUserListWithEvaluationByGroupAndExamen(this.props.selected_group.id, value.id, function (result) {
            that.setState({
                data: result
            });
        });*/

        this.setState({
            examen_value: value
        });

        var that = this;
        if(this.props.isIntervenant) {
            UserService.getUserListWithEvaluationByGroupAndExamen(this.props.group.id, value.id, function (result) {
                that.setState({
                    data: result
                });
            });
        } else {
            var userID = parseInt(Auth.getUserInfo().user_id);
            UserService.getUserWithEvaluationByExamen(userID, value.id, function (result) {
                that.setState({
                    data: result
                });
            });
        }

    },

    //
    componentWillReceiveProps(nextProps) {

        /*var that = this;
        var groupID = nextProps.selected_group.id;

        this.setState({
            selected_group: groupID,
            is_examens_loading: true
        });

        this.getExamens(groupID, function (data) {
            that.setState({
                examens: data,
                is_examens_loading: false
            });
        });*/

        // -
        if(!nextProps.isIntervenant){
            this.getExamens(null);
            return;
        }

        // -
        if(nextProps.group){
            if(this.state.options == null || this.props.group.id != nextProps.group.id)
                this.getExamens(nextProps.group.id);
        }
    },

    //
    getExamens: function (groupID) {

        /*GroupService.getExamens(id, function (result) {
            callback(result);
        });*/

        var that = this;
        if(groupID == null) {
            var userID = Auth.getUserInfo().user_id;
            UserService.getExamens(userID, function (result) {
                that.setState({
                    examens: result,
                    is_matieres_loading: false
                });
            });
        } else {
            GroupService.getExamens(groupID, function (result) {
                that.setState({
                    examens: result,
                    is_matieres_loading: false
                });
            });
        }

    },

    //
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12 header-table-select">
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
                        <TableHeaderColumn
                            dataField="id"
                            isKey={true}
                            dataSort={true}
                            hidden={true}>ID</TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="user_name"
                            dataSort={true}>Etudiant</TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="competence_name"
                            dataSort={true}>Compétence</TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="type_note_value_auto"
                            dataSort={true}
                            filter={ {
                                type: 'NumberFilter',
                                delay: 500,
                                numberComparators: [ '=', '>', '<' ]
                             } }>Evaluation personnelle</TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="type_note_label_auto"
                            dataSort={true}>Libellé</TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="type_note_value"
                            dataSort={true}
                            filter={ {
                                type: 'NumberFilter',
                                delay: 500,
                                numberComparators: [ '=', '>', '<' ]
                             } }>Evaluation intervenant</TableHeaderColumn>
                        <TableHeaderColumn dataField="type_note_label" dataSort={true}>Libellé</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )
    }
});
export default ListBilansExamens
