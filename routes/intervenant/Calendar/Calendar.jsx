import React from 'react'

class Calendar extends React.Component {

    // -
    componentDidMount(){
        const {calendar} = this.refs;
        $(calendar).fullCalendar({
            event:{}
        });
    }

    // -
    componentWillUnmount(){
        const {calendar} = this.refs;
        $(calendar).fullCalendar("destroy");
    }

    render(){
        return(
            <div ref="calendar"></div>
        )
    }
}

export default Calendar;