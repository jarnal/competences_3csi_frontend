import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import UserEvaluations from './EvaluationsUserSelector.jsx'
import AttributionEvaluations from './EvaluationsAttributor.jsx'
import ListCompetences from '../competences/CompetencesSelector.jsx'
import UserService from '../../services/UserService'
import EvaluationAutoService from '../../services/EvaluationAutoService.js'
import EvaluationIntervenantService from '../../services/EvaluationIntervenantService.js'
import EvaluationExamenService from '../../services/EvaluationExamenService.js'
import { getTokenAPI, getUserInfo } from '../../services/AuthService'

import UserSelector from '../../containers/evaluations/EvaluationsUserSelectorContainer'

class EvaluationManager extends React.Component {

    // - Build evaluations widget which build evaluations
    constructor(props) {
        super(props);
        this.state = {
            group: null,
            users_selected: [],
            competences_selected: [],
            evaluation_rows: [],
            screenHeight: "100px"
        };
    }

    // when compoent will receive props, bind data
    componentWillReceiveProps(nextProps) {
        this.setState({
            group: nextProps.group,
            isIntervenant: nextProps.isIntervenant
        });

        if (!nextProps.isIntervenant) {
            var userID = Auth.getUserInfo().user_id;
            this.state.users_selected = [userID];
        }
    }

    // - Custom options for users table
    getUserSelectRowProp() {
        return {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.props.onUserSelect,
            onSelectAll: this.props.onUserSelectAll
        };
    }

    // gustom option for compoentences table
    getCompetenceSelectRowProp() {
        return {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.props.onCompetenceSelect,
            onSelectAll: this.props.onCompetenceSelectAll
        };
    }

    // - When compoent has mounted, try to get last examen
    componentDidMount() {
        this.setState({examen_id: 1});

        // Patch allowing to resize multiple react-bootstrap-table instances in tabs
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            let panels = $('div[role="tabpanel"]');
            var minHeight = Infinity;
            var panel;
            for (var i = 0; i < panels.length; i++) {
                panel = $(panels[i]);

                var container = panel.find('div[class="react-bs-container-body"]');
                minHeight = Math.min(minHeight, $(container).height());
            }
            $('div[class="react-bs-container-body"]').css('height', minHeight);
        });
    }

    // - render widget evaluations
    render() {
        return (
            <div className="nav-tabs-custom" style={{height: 100 + '%'}}>
                <ul id="myTabs" className="nav nav-tabs" role="tablist">
                    {this.props.isIntervenant
                        ?
                        <li className="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Selection des
                            utilisateurs</a></li>
                        :
                        null
                    }
                    <li className={this.props.isIntervenant ? "" : "active"}>
                        <a href="#tab_2" data-toggle="tab" aria-expanded="false">Selection des compétences</a>
                    </li>
                    <li><a href="#tab_3" data-toggle="tab">Attribution des compétences</a></li>
                </ul>
                <div className="tab-content" style={{padding: 0}}>
                    {this.props.isIntervenant
                        ?
                        <div role="tabpanel" className="tab-pane active" id="tab_1">
                            <div className="box-body col-xs-12 table-container">
                                <UserSelector />
                            </div>
                            <div className="box-footer">
                                <button onClick={function(){
                                        $('#myTabs a[href="#tab_2"]').tab('show')
                                    }} className="btn btn-primary pull-right">Suivant
                                </button>
                            </div>
                        </div>
                        :
                        null
                    }
                    <div role="tabpanel" className={this.props.isIntervenant ? "tab-pane" : "tab-pane active" }
                         id="tab_2">
                        <div className="box-body col-xs-12 table-container">
                            <ListCompetences
                                options = {this.props.matieres}
                                competences = {this.props.competences}
                                selectValue = {this.props.matiereSelected}
                                onSelectChange = {this.props.onMatiereSelectChange}
                                loadSelectOptions = {this.props.loadSelectOptions}
                                addCompetence = {false}
                                selectRow = {
                                    {
                                        mode: 'checkbox',
                                        clickToSelect: true,
                                        onSelect: this.props.onCompetenceSelect,
                                        onSelectAll: this.props.onCompetenceSelectAll
                                    }
                                }
                            />
                        </div>
                        <div className="box-footer">
                            <button onClick={function(){
                                        $('#myTabs a[href="#tab_1"]').tab('show')
                                    }} className="btn btn-default pull-left">Précédent
                            </button>
                            <button onClick={function(){
                                        $('#myTabs a[href="#tab_3"]').tab('show')
                                    }} className="btn btn-primary pull-right">Suivant
                            </button>
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane" id="tab_3">
                        <AttributionEvaluations
                            evaluations={this.state.evaluation_rows}
                            mode={this.props.mode}
                            editCallback={this.props.onAfterSaveCell}
                            isIntervenant={this.state.isIntervenant}
                        />
                        <div className="box-footer">
                            <button onClick={function(){
                                        $('#myTabs a[href="#tab_2"]').tab('show')
                                    }} className="btn btn-default pull-left">Précédent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EvaluationManager
