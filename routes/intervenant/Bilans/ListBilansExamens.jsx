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

const qualityType = {
    0: "0- Non noté",
    1: "1- Non acquis",
    2: "2- En cours d'acquisition",
    3: "3- A renforcer",
    4: "4- Acquis",
    5: "5- Maîtrisé"
};
var ListBilansExamens = React.createClass({

    // - Initialize
    getInitialState () {
        return {
            multi: false,
            examens: [],
            is_examens_loading: false,
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

    // -
    handleGroupValueChanged(value) {
        this.setState({selected_group: value});
    },

    // - On exam changed : rebind data
    onChangeExamen(value) {

        var that = this;
        var req;
        if(this.props.isIntervenant) {
            req = UserService.getUserListWithEvaluationByGroupAndExamen(this.props.group.id, value.id, function (result) {
                that.setState({
                    data: result
                });
            });
        } else {
            var userID = parseInt(Auth.getUserInfo().user_id);
            req = UserService.getUserWithEvaluationByExamen(userID, value.id, function (result) {
                that.setState({
                    data: result
                });
            });
        }
        this.setState({
            examen_value: value,
            currentRequest: req
        });
    },

    // - Called when the component will receive props
    componentWillReceiveProps(nextProps) {

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

    // - Retrieves all exams by group ID
    getExamens: function (groupID) {

        var that = this;
        var req;
        if(groupID == null) {
            var userID = Auth.getUserInfo().user_id;
            req = UserService.getExamens(userID, function (result) {
                that.setState({
                    examens: result,
                    is_matieres_loading: false
                });
            });
        } else {
            req = GroupService.getExamens(groupID, function (result) {
                that.setState({
                    examens: result,
                    is_matieres_loading: false
                });
            });
        }
        this.setState({currentRequest: req});
    },

    // - Render
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
                        exportCSV
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
                            >Evaluation personnelle</TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="type_note_label_auto"
                            dataSort={true}
                            filter={ { type: 'SelectFilter', options: qualityType } }
                        >Niveau</TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="type_note_value"
                            dataSort={true}
                        >Evaluation intervenant</TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="type_note_label"
                            dataSort={true}
                            filter={ { type: 'SelectFilter', options: qualityType } }
                        >Niveau</TableHeaderColumn>
                    </BootstrapTable>
                </div>
            </div>
        )
    }
});
export default ListBilansExamens
