import React from 'react'
import ListCompetences from './CompetencesSelector.jsx'
import Select from 'react-select'
import GroupService from '../../services/GroupService.js'
import GroupSelector from '../../containers/groups/GroupSelectorContainer'

class Competences extends React.Component {

    // - Render the component view
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Gestionnaire de compétences
                        <small>Toutes les compétences par section</small>
                        <GroupSelector/>
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
                                                //group={this.state.selected_group}
                                                //mode="default"
                                                options = {this.props.selectOptions}
                                                competences = {this.props.competences}
                                                selectValue = {this.props.matiereSelected}
                                                onSelectChange = {this.props.onSelectChange}
                                                loadSelectOptions = {this.props.loadSelectOptions}
                                                addCompetence = {false}
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
