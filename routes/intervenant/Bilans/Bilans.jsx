import React from 'react'
import ListBilansExamens from './ListBilansExamens.jsx'
import ListBilansMatieres from './ListBilansMatieres.jsx'
import SelectGroupes from '../components/SelectGroupes.jsx'

class Bilans extends React.Component {

    // -
    constructor(props) {
        super(props);
        this.state = {selected_group: 25};
        this.handleGroupValueChanged = this.handleGroupValueChanged.bind(this);
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
                        Bilans
                        <small>Toutes les compétences par section</small>
                        <SelectGroupes callback={this.handleGroupValueChanged}/>
                    </h1>
                </section>
                <section className="content" style={{ minHeight: 550 }}>
                    {/* contenu */}
                    <div className="row">
                        <div className="col-xs-12">

                            <div className="nav-tabs-custom" style={{height: 100 + '%'}}>
                                <ul id="myTabs" className="nav nav-tabs" role="tablist">
                                    <li className="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Bilans par examen</a></li>
                                    <li className><a href="#tab_2" data-toggle="tab" aria-expanded="false">Bilans par matières</a></li>
                                </ul>
                                <div className="tab-content">
                                    <div role="tabpanel" className="tab-pane active" id="tab_1">
                                        <div className="box-body col-xs-12 table-container">
                                            <ListBilansExamens selected_group={this.state.selected_group.id}/>
                                        </div>
                                    </div>
                                    <div role="tabpanel" className="tab-pane" id="tab_2">
                                        <div className="box-body col-xs-12 table-container">
                                            <ListBilansMatieres selected_group={this.state.selected_group.id}/>
                                        </div>
                                    </div>
                                </div>
                                {/* /.tab-content */}
                            </div>
                        </div>
                        {/* /.row (main row) */}
                    </div>
                </section>
            </div>
        )
    }
}

module.exports = Bilans
