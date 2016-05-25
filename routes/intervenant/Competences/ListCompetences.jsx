import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Select from 'react-select'
import MatiereService from '../../../services/MatiereService.js'
import GroupService from '../../../services/GroupService.js'
import UserService from '../../../services/UserService.js'
import ExamenService from '../../../services/ExamenService.js'
import Auth from '../../auth/Auth.jsx'

var ListCompetences = React.createClass({

    //
    getInitialState () {
        return {
            multi: false,
            competences: [],
            addCompetence: false
        };
    },

    componentWillReceiveProps(nextProps) {

        // -
        if(!nextProps.isIntervenant){
            this.updateOptions(null);
            return;
        }

        // -
        if(nextProps.group){
            if(this.state.options == null || this.props.group.id != nextProps.group.id)
                this.updateOptions(nextProps.group.id);
        }
    },

    //
    onChange (value) {
        this.setState({
            value: value
        });

        switch (this.props.mode) {
            case "evaluations_libres":
                this.getMatiereCompetences(value.id);
                break;
            case "default":
                this.getMatiereCompetences(value.id);
                break;
            case "evaluations_examens":
                this.getExamenCompetences(value.id);
                this.props.examenCallback(value.id);
                break;
        }
    },

    // -
    getExamenCompetences: function(examenID) {
        var that = this;
        ExamenService.getCompetences(examenID, function (result) {
            that.setState({
                competences: result
            });
        });
    },

    // -
    getMatiereCompetences: function (matiereID) {
        var that = this;
        MatiereService.getCompetences(matiereID, function (result) {
            that.setState({
                competences: result
            })
        });

    },

    updateOptions: function(groupID){

        switch (this.props.mode) {
            case "evaluations_libres":
                this.getMatieres(groupID);
                break;
            case "evaluations_examens":
                this.getExamens(groupID);
                break;
            default:
                this.getAllMatieres();
                break;
        }
    },

    //
    getAllMatieres: function(){
        var that = this;
        MatiereService.getAll(function (result) {
            that.setState({
                options:result["matieres"]
            });
        });
    },

    //
    getMatieres: function (groupID) {

        var that = this;
        if(groupID == null) {
            var userID = Auth.getUserInfo().user_id;
            UserService.getMatieres(userID, function (result) {
                that.setState({
                    options:result
                });
            });
        } else {
            GroupService.getMatieres(groupID, function (result) {
                that.setState({
                    options:result
                });
            });
        }
    },

    //
    getExamens: function (groupID) {

        var that = this;
        GroupService.getExamens(groupID, function (result) {
            that.setState({
                options:result
            });
        });

    },

    //
    render: function () {
        return (
            <div className="box-body col-md-12 col-xs-12 col-lg-12">
                <div className={this.props.addCompetence ? "col-md-11 col-xs-11 col-lg-11" : "col-md-12 col-xs-12 col-lg-12" }>
                    <div className="form-group">
                        <Select
                            value={this.state.value}
                            onChange={this.onChange}
                            valueKey="id"
                            clearable={false}
                            labelKey="name"
                            options={this.state.options}/>
                    </div>
                </div>

                {this.props.addCompetence
                    ?
                    <div className="col-md-1 col-xs-12 col-lg-1">
                        <div className="form-group">
                            <button className="btn btn-block btn-default pull-right"><i className="fa fa-plus"/>
                            </button>
                        </div>
                    </div>
                    :
                    null
                }
                <div>
                    <BootstrapTable
                        data={this.state.competences}
                        height="250"
                        striped={true}
                        hover={true}
                        selectRow={this.props.selectRowProp}
                        searchPlaceholder="Rechercher"
                        search={true}
                        noDataText="Aucune competence trouvé">
                        <TableHeaderColumn dataField="id" isKey={true} dataSort={true} hidden={true}>Competence
                            ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="name" dataSort={true}>Nom de la
                            compétence</TableHeaderColumn>
                    </BootstrapTable>

                </div>

            </div>
        )
    }
});

export default ListCompetences
