import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Select from 'react-select'
import MatiereService from '../../services/MatiereService.js'

const selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true
};

const options_table = {
    noDataText: "Aucune competence trouvée"
};

function logChange(val) {
    console.log("Selected: " + val);
}


var ListCompetences = React.createClass({

    //
    getInitialState () {
        return {multi: false,
            competences: []
        };
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

                {/* Left col */}
                <section className="col-lg-7 connectedSortable">
                    {/* Listes Competences */}
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">Choix dun groupe de compétences</h3>
                            <div className="col-md-3 col-xs-3 col-lg-3 pull-right">
                            </div>
                        </div>
                        {/* /.box-header */}
                        <div className="box-body">
                            <div className="row">
                                <div className="col-md-11 col-xs-12 col-lg-11">
                                    <div className="form-group">
                                        <Select.Async
                                            value={this.state.value}
                                            onChange={this.onChange}
                                            valueKey="id"
                                            clearable ={false}
                                            labelKey="name" loadOptions={this.getMatieres}/>
                                    </div>
                                    {/* /.form-group */}
                                </div>
                                {/* /.col */}
                                <div className="col-md-1 col-xs-12 col-lg-1">
                                    <div className="form-group">
                                        <button className="btn btn-default pull-right"><i className="fa fa-plus"/>
                                    </button>
                                </div>
                                {/* /.form-group */}
                            </div>
                            {/* /.col */}
                            <div className="col-md-12 col-xs-12 col-lg-12">
                                <BootstrapTable
                                    data={this.state.competences}
                                    height="250"
                                    striped={true}
                                    hover={true}
                                    selectRow={selectRowProp}
                                    searchPlaceholder="Rechercher"
                                    search={true}
                                    noDataText="test"
                                    options={options_table}>
                                    <TableHeaderColumn dataField="id" isKey={true} dataSort={true} hidden={true}>Competence
                                        ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField="name" dataSort={true}>Nom de la
                                        compétence</TableHeaderColumn>
                                </BootstrapTable>

                            </div>
                        </div>
                        {/* /.row */}
                    </div>
                    {/* /.box-body */}
                    <div className="box-footer clearfix no-border">
                        <button className="btn btn-default col-md-12 col-xs-12">Ajouter une compétence</button>
                    </div>
                </div>
                {/* /.box */}
            </section>
            {/* /.Left col */}
        </div>
    )
}
});

export default ListCompetences
