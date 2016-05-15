import React from 'react'
import ListExamens from './ListExamens.jsx'
import AddExamens from './AddExamens.jsx'
import Select from 'react-select'
import SelectGroupes from '../components/SelectGroupes.jsx'

class Examens extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Examens
                        <small>En Construction...</small>
                        <SelectGroupes />
                        {/* /.form-group */}
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
