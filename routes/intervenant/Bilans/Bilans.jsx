import React from 'react'
import ListBilansExamens from './ListBilansExamens.jsx'
import ListBilansMatieres from './ListBilansMatieres.jsx'
import SelectGroupes from '../components/SelectGroupes.jsx'
import GroupService from '../../../services/GroupService.js'
import UserService from '../../../services/UserService.js'
import Auth from '../../auth/Auth.jsx'

var selected_group = null;

class Bilans extends React.Component {

    // - Initialize
    constructor(props) {
        super(props);
        this.state = {selected_group: null};
        this.handleGroupValueChanged = this.handleGroupValueChanged.bind(this);
    }

    // - Called when the component has been mounted
    componentDidMount() {
        $(window).trigger('resize');

        // Patch allowing to resize multiple react-bootstrap-table instances in tabs
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var panels = $('div[role="tabpanel"]');
            var minHeight = Infinity;
            var panel;
            for (var i = 0; i < panels.length; i++) {
                panel = $(panels[i]);
                var test = panel.find('div[class="react-bs-container-body"]');
                minHeight = Math.min(minHeight, $(test).height());
            }
            $('div[class="react-bs-container-body"]').css('height', minHeight);
        });

        var isIntervenant = localStorage.getItem('us_role') == 'ROLE_INTERVENANT';
        this.setState({
            isIntervenant: isIntervenant,
            blockSizes: isIntervenant ? 'col-md-4 col-sm-4 col-xs-12' : 'col-md-6 col-sm-6 col-xs-12'
        });
        if (!isIntervenant) {
            this.handleGroupValueChanged(null);
        }
    }

    // -
    componentWillUnmount() {
        if (this.state.currentRequestExamen != null) {
            this.state.currentRequestExamen.abort();
        }
        if (this.state.currentRequestMatiere != null) {
            this.state.currentRequestMatiere.abort();
        }
    }

    // - Called on group change :
    handleGroupValueChanged(value) {

        var that = this;
        if (value != null) {
            var req = GroupService.getUsers(value.id, function (result) {
                that.setState({users_number: result.length});
            });
        }

        // -
        const isIntervenant = localStorage.getItem('us_role') == 'ROLE_INTERVENANT';
        if (!isIntervenant) {
            this.getExamens(null);
            this.getMatieres(null);
        } else {
            this.getExamens(value.id);
            this.getMatieres(value.id);
        }

        this.setState({
            examens: [],
            matieres: [],
            selected_group: value
        });
        selected_group = value;
    }

    // - Retrieves all exams by group ID
    getExamens(groupID) {

        var that = this;
        var req;
        if (groupID == null) {
            var userID = Auth.getUserInfo().user_id;
            req = UserService.getExamens(userID, function (result) {
                that.setState({
                    examens: result,
                    examen_number: result.length,
                    selected_group: selected_group
                });
            });
        } else {
            req = GroupService.getExamens(groupID, function (result) {
                that.setState({
                    examens: result,
                    examen_number: result.length,
                    selected_group: selected_group
                });
            });
        }
        this.setState({currentRequestExamen: req});
    }

    // - Retrieves all matieres by group ID
    getMatieres(groupID) {

        var that = this;
        var req;
        if (groupID == null) {
            var userID = Auth.getUserInfo().user_id;
            req = UserService.getMatieres(userID, function (result) {
                that.setState({
                    matieres: result,
                    matiere_number: result.length,
                    selected_group: selected_group
                });
            });
        } else {
            req = GroupService.getMatieres(groupID, function (result) {
                that.setState({
                    matieres: result,
                    matiere_number: result.length,
                    selected_group: selected_group
                });
            });
        }
        this.setState({currentRequestMatiere: req});
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
                            <div >
                                <div className="nav-tabs-custom" style={{height: 100 + '%'}}>
                                    <ul id="myTabs" className="nav nav-tabs" role="tablist">
                                        <li className="active"><a style={{fontSize: 18 + 'px', padding: 5 + 'px'}}
                                                                  href="#tab_1" data-toggle="tab" aria-expanded="true">Bilans
                                            par examen</a></li>
                                        <li className><a style={{fontSize: 18 + 'px', padding: 5 + 'px'}} href="#tab_2"
                                                         data-toggle="tab" aria-expanded="false">Bilans
                                            par matières</a></li>
                                    </ul>
                                    <div className="tab-content" style={{padding : 0}}>
                                        <div role="tabpanel" className="tab-pane active" id="tab_1">
                                            <ListBilansExamens
                                                group={this.state.selected_group}
                                                examens={this.state.examens}
                                                isIntervenant={this.state.isIntervenant}
                                            />
                                        </div>
                                        <div role="tabpanel" className="tab-pane" id="tab_2">
                                            <ListBilansMatieres
                                                group={this.state.selected_group}
                                                isIntervenant={this.state.isIntervenant}
                                                matieres={this.state.matieres}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div >
                            {this.state.isIntervenant
                                ?
                                <div className={this.state.blockSizes}>
                                    <div className="info-box">
                                        <span className="info-box-icon bg-green"><i className="fa fa-users"/></span>
                                        <div className="info-box-content">
                                            <span className="info-box-text">Usagers</span>
                                            <span className="info-box-number">{this.state.users_number}</span>
                                        </div>
                                    </div>
                                </div>
                                :
                                null
                            }
                            <div className={this.state.blockSizes}>
                                <div className="info-box">
                                    <span className="info-box-icon bg-aqua"><i className="fa fa-graduation-cap"/></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Examens</span>
                                        <span className="info-box-number">{this.state.examen_number}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={this.state.blockSizes}>
                                <div className="info-box">
                                    <span className="info-box-icon bg-yellow"><i className="fa fa-sticky-note"/></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Matières</span>
                                        <span className="info-box-number">{this.state.matiere_number}</span>
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

export default Bilans
