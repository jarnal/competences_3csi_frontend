import React from 'react'
import ListExamens from './ListExamens.jsx'
import AddExamens from './AddExamens.jsx'
import Select from 'react-select'
import GroupService from '../../services/GroupService.js'

class Examens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {groups: [], value: ""};

        this.onChange = this.onChange.bind(this);
    }

    //
    onChange(value) {
        console.log(this);
        this.setState({
            value: value
        });
    }

    //
    getGroups(input, callback) {

        GroupService.getAll(function (result) {
            var data = {
                options: result["groups"],
                complete: false
            };
            callback(null, data);
        });

    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Examens
                        <small>En Construction...</small>
                        <div className="form-group col-md-3 col-xs-12 col-lg-3 pull-right" style={{fontSize: '14px'}}>
                            <Select.Async
                                value={this.state.value}
                                onChange={this.onChange}
                                valueKey="id"
                                searchingText='Chargement...'
                                placeholder="Sélectionnez une classe"
                                noResultsText="Aucun resultat"
                                clearable={false}
                                labelKey="name"
                                loadOptions={this.getGroups}/>
                        </div>
                    </h1>
                </section>
                <section className="content" style={{ minHeight: 550 }}>
                    <div className="row">
                        <div className="col-xs-12">
                            {/* Left col */}
                            <section className="col-lg-12 connectedSortable">
                                {/* Listes Examens */}
                                <div className="box box-primary">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Liste des examens</h3>
                                    </div>
                                    {/* /.box-header */}
                                    <div className="box-body">
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12 col-lg-12">
                                                <AddExamens />
                                                <ListExamens />
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

module.exports = Examens;
