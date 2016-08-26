import React from 'react'
import WidgetEvaluations from './WidgetEvaluations.jsx'
import Select from 'react-select'
import GroupService from '../../../services/GroupService.js'
import SelectGroupes from '../components/SelectGroupes.jsx'

class EvaluationsExamens extends React.Component {

    // - Build component view for "evaluations examens"
    constructor(props) {
        super(props);
        this.state = {selected_group: null};
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

    // - Render view for "evaluations examens"
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Évaluations Examens
                        <small>Attribuer des évaluations aux examens</small>
                        <SelectGroupes callback={this.handleGroupValueChanged}/>
                    </h1>
                </section>
                <section className="content" style={{ minHeight: 550 }}>
                    <div className="row">
                        <div className="col-xs-12">
                            <section >
                                <WidgetEvaluations
                                    mode="evaluations_examens"
                                    group={this.state.selected_group}
                                    isIntervenant={this.state.isIntervenant}
                                    />
                            </section>
                        </div>
                    </div>

                </section>
            </div>
        )
    }
}

export default EvaluationsExamens;
