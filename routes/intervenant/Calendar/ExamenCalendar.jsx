import React from 'react'
import Calendar from './Calendar.jsx'
import UserService from '../../../services/UserService'
import Auth from '../../auth/Auth.jsx'

var events = [
    {
        title:  'My Event',
        start:  Date.now(),
        allDay: true
    }
];

class ExamenCalendar extends React.Component {

    // - Initialize
    constructor(props) {
        super(props);
        this.state = {events: [], overlayVisibility: 'visible'};
    }

    // -
    componentDidMount() {
        var isIntervenant = localStorage.getItem('us_role') == 'ROLE_INTERVENANT';
        if (!isIntervenant) {
            this.getExamensCalendar(null);
        }
    }

    // -
    componentWillUnmount() {

    }

    // - Retrieves all exams by group ID
    getExamensCalendar(groupID) {

        let that = this;
        var req;
        if (groupID == null) {
            var userID = Auth.getUserInfo().user_id;
            req = UserService.getExamensForCalendar(userID, (result) => {
                that.setState({
                    events: result,
                    overlayVisibility: 'hidden'
                });
                console.log(result);
            });
        } else {
            req = GroupService.getExamens(groupID, (result) => {
                that.setState({
                    examens: result,
                    examen_number: result.length,
                    selected_group: selected_group
                });
            });
        }
        this.setState({currentRequestExamen: req});
    }

    render() {
        return (

            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Mon Calendrier
                        <small>Mes examens prévus</small>
                    </h1>
                </section>
                <section className="content" style={{ minHeight: 550 }}>
                    <div className="row">
                        <div className="col-xs-12">
                            <section >
                                <div className="box box-primary">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Calendrier</h3>
                                    </div>
                                    <div className="box-body">
                                        <Calendar events={this.state.events}
                                        />
                                    </div>
                                    <div className="overlay" style={{visibility: this.state.overlayVisibility}}>
                                        <i className="fa fa-refresh fa-spin"></i>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default ExamenCalendar;