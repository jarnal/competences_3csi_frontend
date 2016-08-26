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
class ListBilansExamens extends React.Component {

    // -
    constructor(props){
        super(props);
        this.state = {
            multi: false,
            examens: [],
            isLoading: true,
            data: [],
            currentRequest: null
        };
    }

    // -
    componentWillUnmount() {
        if (this.state.currentRequest != null) {
            this.state.currentRequest.abort();
        }
    }

    // - On exam changed : rebind data
    onChangeExamen(examen, groupID) {

        var that = this;
        var req;
        this.setState({isLoading:true});
        const isIntervenant = localStorage.getItem('us_role') == 'ROLE_INTERVENANT';
        if (isIntervenant) {
            if (groupID == null)
                groupID = this.props.group.id;

            req = UserService.getUserListWithEvaluationByGroupAndExamen(groupID, examen.id, (result) => {
                that.setState({
                    data: result,
                    isLoading: false,
                    currentRequest: null
                });
            });
        } else {
            var userID = parseInt(Auth.getUserInfo().user_id);
            req = UserService.getUserWithEvaluationByExamen(userID, examen.id, (result) => {
                that.setState({
                    data: result,
                    isLoading: false,
                    currentRequest: null
                });
            });
        }
        this.setState({
            examen_value: examen,
            currentRequest: req
        });
    }

    // - Called when the component will receive props
    componentWillReceiveProps(nextProps) {
        if (nextProps.examens) {

            if (this.state.currentRequest != null || this.props.examens == nextProps.examens) {
                return;
            }

            this.setState({
                examens: nextProps.examens,
                data: [],
                examen_value: null
            });

            var groupID;
            if (nextProps.group) {
                groupID = nextProps.group.id;
            }

            if(nextProps.examens != null && nextProps.examens.length > 0){
                var examen = nextProps.examens[0];
                this.onChangeExamen(examen, groupID);
            }
        }
    }

    // - Render bilans list for examens
    render() {
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
                    <div className="custom-table-container">
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
                                filter={ {
                                type: 'NumberFilter',
                                delay: 500,
                                numberComparators: [ '=', '>', '<' ]
                             } }
                            >Evaluation personnelle</TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="type_note_label_auto"
                                dataSort={true}
                                filter={ { type: 'SelectFilter', options: qualityType } }
                            >Niveau</TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="type_note_value"
                                dataSort={true}
                                filter={ {
                                type: 'NumberFilter',
                                delay: 500,
                                numberComparators: [ '=', '>', '<' ]
                             } }
                            >Evaluation intervenant</TableHeaderColumn>
                            <TableHeaderColumn
                                dataField="type_note_label"
                                dataSort={true}
                                filter={ { type: 'SelectFilter', options: qualityType } }
                            >Niveau</TableHeaderColumn>
                        </BootstrapTable>
                        <div className="overlay"
                             style={{visibility: this.state.isLoading ? 'visible' : 'hidden'}}>
                            <i className="fa fa-refresh fa-spin"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListBilansExamens
