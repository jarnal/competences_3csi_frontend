import React from 'react'
import ListCompetences from './CompetencesSelector.jsx'
import Select from 'react-select'
import GroupService from '../../services/GroupService.js'
import SelectGroupes from '../../routes/intervenant/components/SelectGroupes.jsx'

class Competences extends React.Component {

    // - Initialize
    constructor(props) {
        super(props);
        this.state = {selected_group: null};
        this.handleGroupValueChanged = this.handleGroupValueChanged.bind(this);
    }

    // - Handle group value changed
    handleGroupValueChanged(value) {
        this.setState({selected_group: value});
    }

    // - Called when the component has been mounted
    componentDidMount() {
        this.state = {selected_group: 1};
        $(window).trigger('resize');
    }

    // - Render the component view
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Gestionnaire de compétences
                        <small>Toutes les compétences par section</small>
                        <SelectGroupes callback={this.handleGroupValueChanged}/>
                    </h1>
                </section>
                <section className="content" style={{ minHeight: 550 }}>
                    <div className="row">
                        <div className="col-xs-12">

                            {/* Left col */}
                            <section >
                                {/* Listes Competences */}
                                <div className="box box-primary">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Choix d'un groupe de compétences</h3>
                                        <div className="col-md-3 col-xs-3 col-lg-3 pull-right">
                                        </div>
                                    </div>
                                    {/* /.box-header */}
                                    <div className="box-body">
                                        <div className="row">
                                            <ListCompetences
                                                group={this.state.selected_group}
                                                addCompetence={false}
                                                mode="default"
                                            />
                                        </div>
                                        {/* /.row */}
                                    </div>
                                </div>
                                {/* /.box */}
                            </section>
                            {/* /.Left col */}
                        </div>{/* /.row (main row) */}
                    </div>
                </section>
            </div>
        )
    }
}

export default Competences
