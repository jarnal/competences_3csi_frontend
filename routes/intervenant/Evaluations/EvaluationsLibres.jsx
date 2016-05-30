import React from 'react'
import WidgetEvaluations from './WidgetEvaluations.jsx'
import Select from 'react-select'
import GroupService from '../../../services/GroupService.js'
import SelectGroupes from '../components/SelectGroupes.jsx'

class EvaluationsLibres extends React.Component {

    // -
    constructor(props) {
        super(props);
        this.state = {
            selected_group: null,
            is_intervenant: localStorage.getItem('us_role') == 'ROLE_INTERVENANT'
        };
        this.handleGroupValueChanged = this.handleGroupValueChanged.bind(this);
    }

    // -
    componentDidMount(){
        $(window).trigger('resize');
        this.setState({isIntervenant: localStorage.getItem('us_role') == 'ROLE_INTERVENANT'});
    }

    // -
    handleGroupValueChanged(value) {
        this.setState({selected_group: value});
    }

    // -
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Evaluations Libres
                        <small>En Construction...</small>
                        { this.state.is_intervenant
                            ?
                            <SelectGroupes callback={this.handleGroupValueChanged}/>
                            :
                            null
                        }
                    </h1>
                </section>
                <section className="content" style={{ minHeight: 550 }}>
                    <div className="row">
                        <div className="col-xs-12">
                            <WidgetEvaluations
                                mode="evaluations_libres"
                                group={this.state.selected_group}
                                isIntervenant={this.state.isIntervenant}
                            />
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

module.exports = EvaluationsLibres;