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
var ListBilansMatieres = React.createClass({

    //
    getInitialState () {
        return {
            multi: false,
            competences: [],
            is_matieres_loading: false,
            data: []
        };
    },

    //
    onChangeMatiere (value) {

        this.setState({
            matiere_value: value
        });

        var that = this;
        if(this.props.isIntervenant) {
            UserService.getUserListWithEvaluationByGroupAndMatiere(this.props.group.id, value.id, function (result) {
                that.setState({
                    data: result
                });
            });
        } else {
            var userID = parseInt(Auth.getUserInfo().user_id);
            UserService.getUserWithEvaluationByMatiere(userID, value.id, function (result) {
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
            is_matieres_loading: true,
            matiere_value: null
        });

        this.getMatieres(groupID);*/

        console.log("componentWillReceiveProps");
        console.log(nextProps.isIntervenant);
        console.log(nextProps.group);

        // -
        if(!nextProps.isIntervenant){
            this.getMatieres(null);
            return;
        }

        // -
        if(nextProps.group){
            if(this.state.options == null || this.props.group.id != nextProps.group.id)
                this.getMatieres(nextProps.group.id);
        }
    },

    //
    getMatieres: function (groupID) {

        var that = this;
        if(groupID == null) {
            var userID = Auth.getUserInfo().user_id;
            UserService.getMatieres(userID, function (result) {
                that.setState({
                    matieres:result,
                    is_matieres_loading: false
                });
            });
        } else {
            GroupService.getMatieres(groupID, function (result) {
                that.setState({
                    matieres:result,
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
                <div className="col-xs-12">
                    <BootstrapTable
                        data={this.state.data}
                        height="250"
                        striped={true}
                        exportCSV
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
                                delay: 1000,
                                numberComparators: [ '=', '>', '<' ]
                             } }>Evaluation intervenant</TableHeaderColumn>
                        <TableHeaderColumn dataField="type_note_label" dataSort={true}>Libellé</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )
    }
});

export default ListBilansMatieres
