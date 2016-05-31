import React from 'react'
import WidgetEvaluations from './WidgetEvaluations.jsx'
import Select from 'react-select'
import GroupService from '../../../services/GroupService.js'
import SelectGroupes from '../components/SelectGroupes.jsx'

class EvaluationsExamens extends React.Component {

    // -
    constructor(props) {
        super(props);
        this.state = {selected_group: null};
        this.handleGroupValueChanged = this.handleGroupValueChanged.bind(this);
    }

    // -
    componentDidMount(){
        $(window).trigger('resize');
        this.setState({isIntervenant: localStorage.getItem('us_role') == 'ROLE_INTERVENANT'});
    }

    // -
    handleGroupValueChanged(value) {
        console.log(value);
        this.setState({selected_group: value});
    }

    // -
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
                            <section className="col-lg-12 connectedSortable">
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

module.exports = EvaluationsExamens;
