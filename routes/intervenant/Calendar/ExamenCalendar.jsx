import React from 'react'
import Calendar from './Calendar.jsx'

class ExamenCalendar extends React.Component {

    // -
    componentDidMount() {

    }

    // -
    componentWillUnmount() {

    }

    render() {
        return (

            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Mes Diplômes
                        <small>Mes diplômes obtenus</small>
                    </h1>
                </section>
                <section className="content" style={{ minHeight: 550 }}>
                    <div className="row">
                        <div className="col-xs-12">
                            <section >
                                <div className="box box-primary">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Statistiques</h3>
                                    </div>
                                    <div className="box-body">
                                        <Calendar events={[]} />
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