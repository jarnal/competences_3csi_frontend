import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Select from 'react-select'
import MatiereService from '../../services/MatiereService.js'

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
        this.setState({
            screenHeight: $(window).height() - $("#competences-table").offset().top - 201 + "px"
        });
        console.log($("#competences-table"));
        console.log("componentWillReceiveProps "+$("#competences-table").offset().top)
    },

    componentDidMount() {
        this.setState({
            screenHeight: $(window).height() - $("#competences-table").offset().top - 201 + "px"
        });

        //console.log("componentDidMount "+$(window).height())
    },

    //
    onChange (value) {
        this.setState({
            value: value
        });
        this.getCompetences(value.id);
    },

    //
    getCompetences: function (matiereID) {
        var that = this;
        MatiereService.getCompetences(matiereID, function (result) {
            console.log(result);
            that.setState({
                competences: result
            })
        });

    },

    //
    getMatieres: function (input, callback) {

        MatiereService.getAll(function (result) {
            var data = {
                options: result["matieres"],
                complete: false
            };
            callback(null, data);
        });

    },

    //
    render: function () {
        return (
            <div>
                {this.props.addCompetence
                    ?
                    <div>
                        <div className="">
                            <div className="form-group">
                                <Select.Async
                                    value={this.state.value}
                                    onChange={this.onChange}
                                    valueKey="id"
                                    clearable={false}
                                    labelKey="name" loadOptions={this.getMatieres}/>
                            </div>
                        </div>

                        <div className="col-md-1 col-xs-12 col-lg-1">
                            <div className="form-group">
                                <button className="btn btn-default pull-right"><i className="fa fa-plus"/>
                                </button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="box-body col-md-12 col-xs-12 col-lg-12">
                        <div className="form-group">
                            <Select.Async
                                value={this.state.value}
                                onChange={this.onChange}
                                valueKey="id"
                                clearable={false}
                                labelKey="name" loadOptions={this.getMatieres}/>
                        </div>
                    </div>
                }
                <div id="competences-table" className="table-container">
                    <BootstrapTable
                        data={this.state.competences}
                        height={this.state.screenHeight}
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
