import React from 'react'

class Calendar extends React.Component {

    // -
    componentDidMount(){
        this.buildCalendar(this.props.events);
    }

    // - Called when the component will receive props
    componentWillReceiveProps(nextProps) {
        if(nextProps.events && nextProps.events.length > 0) {
            this.buildCalendar(nextProps.events);
        }
    }

    // -
    buildCalendar(events) {
        const {calendar} = this.refs;
        $(calendar).fullCalendar("destroy");
        $(calendar).fullCalendar({
            events:events,
            aspectRatio: 2.5,
            allDayDefault: true,
            lang:'fr'
        });
    }

    // -
    componentWillUnmount(){
        const {calendar} = this.refs;
        $(calendar).fullCalendar("destroy");
    }

    render(){
        return(
            <div className="calendar-container" ref="calendar"></div>
        )
    }
}

export default Calendar;