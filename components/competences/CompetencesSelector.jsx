import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Select from 'react-select'
import MatiereService from '../../services/MatiereService'
import GroupService from '../../services/GroupService'
import UserService from '../../services/UserService'
import ExamenService from '../../services/ExamenService'
import Auth from '../../services/AuthService'

class ListCompetences extends React.Component {

    // - Initialize
    constructor(props) {
        super(props);
        this.state = {
            multi: false,
            competences: [],
            addCompetence: false,
            currentRequest: null
        };
    }

    // - Trick for unmount component when a page is reload
    componentWillUnmount() {
        if(this.state.currentRequest != null) {
            this.state.currentRequest.abort();
        }
    }

    // - Called when the component will receive props
    componentWillReceiveProps(nextProps) {

        if(!nextProps.isIntervenant){
            this.updateOptions(null);
            return;
        }

        if(nextProps.group){
            if(this.state.options == null || this.props.group.id != nextProps.group.id)
                this.updateOptions(nextProps.group.id);
        }
    }

    // -
    onChange (value) {
        this.setState({value: value});
        switch (this.props.mode) {
            case "evaluations_libres":
                this.getMatiereCompetences(value.id);
                break;
            case "evaluations_examens":
                this.getExamenCompetences(value.id);
                this.props.examenCallback(value.id);
                break;
            case "default":
                this.getMatiereCompetences(value.id);
                break;
        }
    }

    // - Retrieves skills related to the current examen
    getExamenCompetences(examenID) {
        let that = this;
        let req = ExamenService.getCompetences(examenID, (result) => {
            that.setState({
                competences: result
            });
        });
        this.setState({currentRequest: req});
    }

    // - Retrieves skills related to the current matiere
    getMatiereCompetences(matiereID) {
        let that = this;
        let req = MatiereService.getCompetences(matiereID, (result) => {
            that.setState({
                competences: result
            })
        });
        this.setState({currentRequest: req});
    }

    // - Get data of selected option
    updateOptions(groupID){
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
    }

    // - Retrieves all matieres
    getAllMatieres(){
        let that = this;
        let req = MatiereService.getAll( (result) => {
            that.setState({
                options:result["matieres"]
            });
            that.onChange(that.state.options[0]);
        });
        this.setState({currentRequest: req});
    }

    // - Retrieves all matieres by group ID
    getMatieres (groupID) {

        let that = this;
        var req;
        if(groupID == null) {
            let userID = Auth.getUserInfo().user_id;
            req = UserService.getMatieres(userID, (result) => {
                that.setState({
                    options:result
                });
                that.onChange(that.state.options[0]);
            });
        } else {
            req = GroupService.getMatieres(groupID, (result) => {
                that.setState({
                    options:result
                });
                that.onChange(that.state.options[0]);
            });
        }
        this.setState({currentRequest: req});
    }

    // - Retrieves all exams by group ID
    getExamens (groupID) {

        let that = this;
        let req = GroupService.getExamens(groupID, (result) => {
            that.setState({
                options:result
            });
            that.onChange(that.state.options[0]);
        });
        this.setState({currentRequest: req});
    }

    // - Render the component view
    render () {
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
}

export default ListCompetences
