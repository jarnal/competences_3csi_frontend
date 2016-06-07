import React from 'react'
import SelectGroupes from '../components/SelectGroupes.jsx'
import GroupService from '../../../services/GroupService.js'
import UserService from '../../../services/UserService.js'
import Select from 'react-select'
import Auth from '../../auth/Auth.jsx'
var PieChart = require("react-chartjs").Pie;

var selected_group = null;
const options_table = {
    noDataText: "Aucun bilan disponible"
};

class Statistiques extends React.Component {

    // - Initialize
    constructor(props) {
        super(props);
        this.state = {
            multi: false,
            competences: [],
            is_matieres_loading: false,
            data: [],
            currentRequest: null
        };
        this.handleGroupValueChanged = this.handleGroupValueChanged.bind(this);
        this.handleChangeMatiere = this.handleChangeMatiere.bind(this);
        this.renderChart = this.renderChart.bind(this);
    }

    // - Called when the component has been mounted
    componentDidMount() {
        $(window).trigger('resize');
    }

    // - Called on group change :
    handleGroupValueChanged(value) {

        // -
        const isIntervenant = localStorage.getItem('us_role') == 'ROLE_INTERVENANT';
        if (!isIntervenant) {
            this.getMatieres(null);
        } else {
            this.getMatieres(value.id);
        }
        selected_group = value;
    }

    // - On selected matiere change :
    handleChangeMatiere (matiere) {

        var that = this;
        var req;

        const isIntervenant = localStorage.getItem('us_role') == 'ROLE_INTERVENANT';
        if(isIntervenant) {
            req = UserService.getUsersEvaluatedCompetencesStatistiquesForMatiere(selected_group.id, matiere.id, function (result) {
                that.setState({
                    data: result,
                    currentRequest:null
                });
            });
        } else {
            return;
        }
        this.setState({
            currentRequest:req,
            matiere_value: matiere
        });
    }

    // - Retrieves all matieres by group ID
    getMatieres(groupID) {

        var that = this;
        var req;
        if (groupID == null) {
            return;
        } else {
            req = GroupService.getMatieres(groupID, function (result) {
                that.setState({
                    matieres: result,
                    selected_group: selected_group
                });
            });
        }
        this.setState({currentRequest: req});
    }

    // -
    renderChart(cell, row, formatExtraData) {
        console.log(row);
        console.log(cell);
        var pieData = [
            {
                value: row.nb_competence-row.nb_evaluated,
                color:"#F7464A",
                highlight: "#FF5A5E",
                //label: "Red"
            },
            {
                value: row.nb_evaluated,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                //label: "Green"
            }
        ];

        var options = {
            legend: {
                display: true,
                labels: {
                    fontColor: 'rgb(255, 99, 132)'
                }
            }
        };
        return <PieChart data={pieData} options={options} width="50" height="50"/>
    }

    // -
    renderChartLabel(cell, row, formatExtraData) {
        return '<div>'+row.nb_evaluated+'/'+row.nb_competence+'</div>';
    }

    // - Render the component view
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Statistiques
                        <small>En Construction...</small>
                        <SelectGroupes callback={this.handleGroupValueChanged}/>
                    </h1>
                </section>
                <section className="content" style={{ minHeight: 550 }}>
                    <div className="row">
                        <div className="col-xs-12">
                            {/* Left col */}
                            <section >
                                {/* Listes Examens */}
                                <div className="box box-primary">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Statistiques</h3>
                                    </div>
                                    {/* /.box-header */}
                                    <div className="box-body">
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12 col-lg-12">
                                                <div className="row">
                                                    <div className="col-xs-12 header-table-select">
                                                        <h4>Matière :</h4>
                                                        <Select
                                                            value={this.state.matiere_value}
                                                            onChange={this.handleChangeMatiere}
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
                                                                dataField="matiere_name"
                                                                dataSort={true}>Matière</TableHeaderColumn>
                                                            <TableHeaderColumn
                                                                dataSort={true}
                                                                dataFormat={this.renderChartLabel}
                                                            >Compétences evaluées</TableHeaderColumn>
                                                            <TableHeaderColumn
                                                                dataSort={true}
                                                                dataFormat={this.renderChart}
                                                            ></TableHeaderColumn>
                                                        </BootstrapTable>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* /.row */}
                                    </div>
                                    {/* /.box-body */}
                                </div>
                                {/* /.box */}
                            </section>
                            {/* /.Left col */}
                        </div>
                        {/* /.row (main row) */}
                    </div>
                </section>
            </div>
        )
    }
}

module.exports = Statistiques;
