import React from 'react'
import ListExamens from './ListExamens.jsx'
import AddExamens from './AddExamens.jsx'
import Select from 'react-select'
import SelectGroupes from '../components/SelectGroupes.jsx'

class Examens extends React.Component {

    // - constructor
    constructor(props) {
        super(props);
        this.state = {selected_group: null};
        this.handleGroupValueChanged = this.handleGroupValueChanged.bind(this);
        this.handleNewExamenAdded = this.handleNewExamenAdded.bind(this);
    }

    // -
    handleGroupValueChanged(value) {
        this.setState({selected_group: value});
    }

    // -
    handleNewExamenAdded() {
        this.setState({selected_group: this.state.selected_group});
    }

    // -
    componentDidMount() {
        $(window).trigger('resize');
    }

    // -
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Examens
                        <small>Tous les examens...</small>
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
                                        <h3 className="box-title">Liste des examens</h3>
                                    </div>
                                    {/* /.box-header */}
                                    <div className="box-body">
                                        <div className="row">
                                            <div className="col-md-12 col-xs-12 col-lg-12">
                                                <AddExamens newElementCallback={this.handleNewExamenAdded} group={this.state.selected_group}/>
                                                <ListExamens group={this.state.selected_group}/>
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

export default Examens;
