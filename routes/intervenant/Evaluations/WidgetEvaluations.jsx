import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import UserEvaluations from './WidgetComponents/UserEvaluations.jsx'
import AttributionEvaluations from './WidgetComponents/AttributionEvaluations.jsx'
import ListCompetences from '../Competences/ListCompetences.jsx'
import UserService from '../../../services/UserService.js'

class WidgetEvaluations extends React.Component {

    //
    constructor(props) {
        super(props);
        this.state = {
            group: 3,
            users_selected: [],
            competences_selected: [],
            evaluation_rows: [],
            screenHeight: "100px"
        };

        this.onUserSelect = this.onUserSelect.bind(this);
        this.onUserSelectAll = this.onUserSelectAll.bind(this);
        this.onCompetenceSelect = this.onCompetenceSelect.bind(this);
        this.onCompetenceSelectAll = this.onCompetenceSelectAll.bind(this);
        this.handleResize = this.handleResize.bind(this);
    }

    handleResize(e) {
        this.setState({
            screenHeight: $(window).height() - $("#testtest").offset().top - 20
        });
        console.log("handleResize")
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);

        var that = this;
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            that.setState({
                screenHeight: $(window).height() - $("#testtest").offset().top - 20
            });
        });

        this.handleResize(null);
    }

    //
    componentWillReceiveProps(nextProps) {
        this.setState({
            group: nextProps.group
        });
    }

    //
    updateEvaluationRows(){
        var users_selected = this.state.users_selected;
        var competences_selected = this.state.competences_selected;

        var that = this;
        UserService.getUserListCompetenceEvaluation(users_selected, competences_selected, "examens", function(result){
            that.setState({
                evaluation_rows: result
            });
        });
    }

    //
    getUserSelectRowProp() {
        return {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onUserSelect,
            onSelectAll: this.onUserSelectAll
        };
    }

    //
    onUserSelect(row, isSelected) {
        var users_selected = this.state.users_selected;
        if (isSelected) {
            users_selected.push(row.id);
        }
        else {
            var unselected = users_selected.indexOf(row.id);
            if (unselected != -1) {
                users_selected.splice(unselected, 1);
            }
        }

        this.setState({
            users_selected: users_selected
        });
        this.updateEvaluationRows();
    }

    //
    onUserSelectAll(isSelected, currentDisplayAndSelectedData) {
        var users_selected = this.state.users_selected;
        if (isSelected) {
            for (let i = 0; i < currentDisplayAndSelectedData.length; i++) {
                users_selected.push(currentDisplayAndSelectedData[i].id);
            }
        }
        else {
            users_selected = [];
        }

        this.setState({
            users_selected: users_selected
        });
        this.updateEvaluationRows()
    }

    //
    getCompetenceSelectRowProp() {
        return {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onCompetenceSelect,
            onSelectAll: this.onCompetenceSelectAll
        };
    }

    //
    onCompetenceSelect(row, isSelected) {
        var competences_selected = this.state.competences_selected;
        if (isSelected) {
            competences_selected.push(row.id);
        }
        else {
            var unselected = competences_selected.indexOf(row.id);
            if (unselected != -1) {
                competences_selected.splice(unselected, 1);
            }
        }

        this.setState({
            competences_selected: competences_selected
        });
        this.updateEvaluationRows();
    }

    //
    onCompetenceSelectAll(isSelected, currentDisplayAndSelectedData) {
        var competences_selected = this.state.competences_selected;
        if (isSelected) {
            for (let i = 0; i < currentDisplayAndSelectedData.length; i++) {
                competences_selected.push(currentDisplayAndSelectedData[i].id);
            }
        }
        else {
            competences_selected = [];
        }

        this.setState({
            competences_selected: competences_selected
        });
        this.updateEvaluationRows();
    }

    render() {
        return (
            <div>
                {/* Left col */}
                <section  id="testtest" style={{height: this.state.screenHeight + 'px'}} className="col-lg-12 connectedSortable">
                    <div className="nav-tabs-custom" style={{height: 100 + '%'}}>
                        <ul id="myTabs" className="nav nav-tabs" role="tablist">
                            <li className="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Selection des
                                utilisateurs</a></li>
                            <li className><a href="#tab_2" data-toggle="tab" aria-expanded="false">Selection des
                                compétences</a></li>
                            <li><a href="#tab_3" data-toggle="tab">Attribution des compétences</a></li>
                        </ul>
                        <div className="tab-content">
                            <div role="tabpanel" className="tab-pane active" id="tab_1">
                                <div className="box-body col-xs-12 table-container">
                                    <UserEvaluations selectRowProp={this.getUserSelectRowProp()} group={this.state.group}/>
                                </div>
                                <div className="box-footer">
                                    <button onClick={function(){
                                        $('#myTabs a[href="#tab_2"]').tab('show')
                                    }} className="btn btn-primary pull-right">Suivant</button>
                                </div>
                            </div>
                            {/* /.tab-pane */}
                            <div role="tabpanel" className="tab-pane" id="tab_2">
                                <div className="box-body col-xs-12 table-container">
                                    <ListCompetences selectRowProp={this.getCompetenceSelectRowProp()} />
                                </div>
                                <div className="box-footer">
                                    <button onClick={function(){
                                        $('#myTabs a[href="#tab_1"]').tab('show')
                                    }} className="btn btn-default pull-left">Précédent</button>
                                    <button onClick={function(){
                                        $('#myTabs a[href="#tab_3"]').tab('show')
                                    }} className="btn btn-primary pull-right">Suivant</button>
                                </div>
                            </div>
                            {/* /.tab-pane */}
                            <div role="tabpanel" className="tab-pane" id="tab_3">
                                <AttributionEvaluations evaluations={this.state.evaluation_rows}/>
                                <div className="box-footer">
                                    <button onClick={function(){
                                        $('#myTabs a[href="#tab_2"]').tab('show')
                                    }} className="btn btn-default pull-left">Précédent</button>
                                </div>
                            </div>
                            {/* /.tab-pane */}
                        </div>
                        {/* /.tab-content */}
                    </div>
                </section>
                {/* /.Left col */}
            </div>
        )
    }
}

export default WidgetEvaluations
