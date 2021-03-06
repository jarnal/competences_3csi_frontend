import React from 'react'
import EvaluationsManager from './EvaluationsManager.jsx'
import Select from 'react-select'
import GroupService from '../../services/GroupService.js'
import GroupSelector from '../../containers/groups/GroupSelectorContainer'

class EvaluationsLibres extends React.Component {

    // - Build component view for "evaluations libres"
    constructor(props) {
        super(props);
        this.state = {
            selected_group: null,
            is_intervenant: localStorage.getItem('us_role') == 'ROLE_INTERVENANT'
        };
        this.handleGroupValueChanged = this.handleGroupValueChanged.bind(this);
    }

    // - When component has mounted check if user is "usager" or "intervenant"
    componentDidMount(){
        $(window).trigger('resize');
        this.setState({isIntervenant: localStorage.getItem('us_role') == 'ROLE_INTERVENANT'});
    }

    // - On change group, bind selected group
    handleGroupValueChanged(value) {
        this.setState({selected_group: value});
    }

    // - Render view for "evaluations libres"
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Evaluations Libres
                        <small>Attribuer des évaluations depuis des competences</small>
                        { this.state.is_intervenant
                            ?
                            <GroupSelector/>
                            :
                            null
                        }
                    </h1>
                </section>
                <section className="content" style={{ minHeight: 550 }}>
                    <div className="row">
                        <div className="col-xs-12">
                            <section >
                                <EvaluationsManager
                                    mode="evaluations_libres"
                                    group={this.state.selected_group}
                                    isIntervenant={this.state.isIntervenant}

                                    onUserSelect={this.props.onUserSelect}
                                    onUserSelectAll={this.props.onUserSelectAll}
                                    onCompetenceSelect={this.props.onCompetenceSelect}
                                    onCompetenceSelectAll={this.props.onCompetenceSelectAll}
                                    onExamenSelect={this.props.onExamenSelect}
                                    onAfterSaveCell={this.props.onAfterSaveCell}
                                    loadSelectOptions={this.props.loadSelectOptions}
                                    onMatiereSelectChange={this.props.onMatiereSelectChange}

                                    matieres={this.props.matieres}
                                    competences={this.props.competences}
                                />
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default EvaluationsLibres;
