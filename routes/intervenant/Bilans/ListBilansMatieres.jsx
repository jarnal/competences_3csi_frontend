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

    // Initialize
    getInitialState () {
        return {
            multi: false,
            competences: [],
            is_matieres_loading: false,
            data: [],
            currentRequest: null
        };
    },

    // -
    componentWillUnmount() {
        if(this.state.currentRequest != null) {
            this.state.currentRequest.abort();
        }
    },

    // - On selected matiere change :
    onChangeMatiere (value) {

        var that = this;
        var req;
        if(this.props.isIntervenant) {
            req = UserService.getUserListWithEvaluationByGroupAndMatiere(this.props.group.id, value.id, function (result) {
                that.setState({
                    data: result
                });
            });
        } else {
            var userID = parseInt(Auth.getUserInfo().user_id);
            req = UserService.getUserWithEvaluationByMatiere(userID, value.id, function (result) {
                that.setState({
                    data: result
                });
            });
        }
        this.setState({currentRequest:req, matiere_value: value});
    },

    // - Called when the component will receive props
    componentWillReceiveProps(nextProps) {

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

    // - Retrieves all matieres by group ID
    getMatieres: function (groupID) {

        var that = this;
        var req;
        if(groupID == null) {
            var userID = Auth.getUserInfo().user_id;
            req = UserService.getMatieres(userID, function (result) {
                that.setState({
                    matieres:result,
                    is_matieres_loading: false
                });
            });
        } else {
            req = GroupService.getMatieres(groupID, function (result) {
                that.setState({
                    matieres:result,
                    is_matieres_loading: false
                });
            });
        }
        this.setState({currentRequest:req});
    },

    // - Render page
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
