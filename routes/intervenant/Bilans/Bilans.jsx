import React from 'react'
import ListBilansExamens from './ListBilansExamens.jsx'
import ListBilansMatieres from './ListBilansMatieres.jsx'
import SelectGroupes from '../components/SelectGroupes.jsx'

class Bilans extends React.Component {

    // - Initialize
    constructor(props) {
        super(props);
        this.state = {selected_group: null};
        this.handleGroupValueChanged = this.handleGroupValueChanged.bind(this);
    }

    // - Called when the component has been mounted
    componentDidMount(){
        $(window).trigger('resize');
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var panels = $('div[role="tabpanel"]');
            var minHeight = Infinity;
            var panel;
            for(var i= 0; i<panels.length; i++){
                panel = $(panels[i]);
                var test = panel.find('div[class="react-bs-container-body"]');
                minHeight = Math.min( minHeight, $(test).height() );
            }
            $('div[class="react-bs-container-body"]').css('height', minHeight);
        });
        this.setState({isIntervenant: localStorage.getItem('us_role') == 'ROLE_INTERVENANT'});
    }

    // - Called on group change :
    handleGroupValueChanged(value) {
        this.setState({
            selected_group: value
        });
    }

    // - Render the component view
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Bilans
                        <small>Toutes les compétences par section</small>
                        {this.state.isIntervenant
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
                            <div className="col-lg-12 connectedSortable">
                                <div className="nav-tabs-custom" style={{height: 100 + '%'}}>
                                    <ul id="myTabs" className="nav nav-tabs" role="tablist">
                                        <li className="active"><a href="#tab_1" data-toggle="tab" aria-expanded="true">Bilans par examen</a></li>
                                        <li className><a href="#tab_2" data-toggle="tab" aria-expanded="false">Bilans par matières</a></li>
                                    </ul>
                                    <div className="tab-content" style={{padding : 0}}>
                                        <div role="tabpanel" className="tab-pane active" id="tab_1">
                                            <ListBilansExamens
                                                group={this.state.selected_group}
                                                isIntervenant={this.state.isIntervenant}
                                                />
                                        </div>
                                        <div role="tabpanel" className="tab-pane" id="tab_2">
                                            <ListBilansMatieres
                                                group={this.state.selected_group}
                                                isIntervenant={this.state.isIntervenant}
                                                />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

module.exports = Bilans
