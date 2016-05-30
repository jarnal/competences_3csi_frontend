import React from 'react'
import SkyLight from 'react-skylight'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import ListCompetences from '../Competences/ListCompetences.jsx'
import 'react-datepicker/dist/react-datepicker.css'
import ExamenService from '../../../services/ExamenService'

var DateSelect = React.createClass({

    getInitialState: function() {
        return {
            startDate: moment()
        };
    },

    handleChange: function(date) {
        this.setState({
            startDate: date
        });
    },

    render: function() {
        return <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            className="form-control"
            dateFormat="DD/MM/YYYY"
            id="date"
            required />;
    }
});

class AddExamens extends React.Component {

    // -
    constructor(props){
        super(props);
        this.state = {
            competences_selected: [],
            group: null
        };
        this.onCompetenceSelect = this.onCompetenceSelect.bind(this);
        this.onCompetenceSelectAll = this.onCompetenceSelectAll.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this._executeAfterModalClose = this._executeAfterModalClose.bind(this);
        this._executeOnOverlayClicked = this._executeOnOverlayClicked.bind(this);
        this._executeAfterModalOpen = this._executeAfterModalOpen.bind(this);
    }

    // -
    handleSubmit(event){
        event.preventDefault();

        var competences_selected = this.state.competences_selected;
        var competences_tab = [];

        for (var i = 0; i < competences_selected.length; i++) {
            competences_tab.push(competences_selected[i].id);
        }

        var formData = {
            nom: document.getElementById('nom_examen').value,
            description: document.getElementById('description').value,
            competences: competences_tab,
            date : document.getElementById('date').value
        };

        if(formData.competences.length == 0)
        {
            return alert("Veuillez saisir une competences")
        }
        else{
            formData.group_id = this.state.group.id;

            var that = this;
            ExamenService.post(formData, function(result){
                console.log(result);
                that.refs.simpleDialog.hide();
                that.props.newElementCallback();
            });
        }
    }

    _executeAfterModalOpen(){
        this.setState({
            group: this.props.group
        });
    }

    // -
    _executeAfterModalClose(){
        this.setState({
            competences_selected: []
        });
    }

    // -
    _executeOnOverlayClicked(){
        this.setState({
            competences_selected: []
        });
    }

    // -
    getCompetenceSelectRowProp() {
        return {
            mode: 'checkbox',
            clickToSelect: true,
            onSelect: this.onCompetenceSelect,
            onSelectAll: this.onCompetenceSelectAll
        };
    }

    //
    onCompetenceSelect(row, isSelected) {
        var competences_selected = this.state.competences_selected;
        if (isSelected) {
            competences_selected.push(row);
        }
        else {
            var unselected = competences_selected.indexOf(row);
            if (unselected != -1) {
                competences_selected.splice(unselected, 1);
            }
        }

        this.setState({
            competences_selected: competences_selected
        });
        console.log(this.state.competences_selected);
    }

    //
    onCompetenceSelectAll(isSelected, currentDisplayAndSelectedData) {
        var competences_selected = this.state.competences_selected;
        if (isSelected) {
            for (let i = 0; i < currentDisplayAndSelectedData.length; i++) {
                competences_selected.push(currentDisplayAndSelectedData[i]);
            }
        }
        else {
            competences_selected = [];
        }

        this.setState({
            competences_selected: competences_selected
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            group: nextProps.group
        });
    }

    render() {
        var style = {
            width: '80%',
            top: 'initial',
            marginLeft: '-40%',
            zIndex: '2000',
            height: '100%',
            overflow: 'auto'
        };
        return (
            <div>
                <button className="btn btn-block btn-primary" onClick={() => this.refs.simpleDialog.show()}>Nouvelle examen</button>

                <SkyLight
                    afterClose={this._executeAfterModalClose}
                    onOverlayClicked={this._executeOnOverlayClicked}
                    afterOpen={this._executeAfterModalOpen}
                    dialogStyles={style}
                    hideOnOverlayClicked
                    ref="simpleDialog"
                    onChange={this.handleChange}
                    title="Nouvel examen"
                >
                    <form action="" onSubmit={this.handleSubmit}>
                        <div style={{overflow:'auto', height:'inherit'}}>
                            <div className="box-body" style={{overflow: 'auto'}}>
                                <div className="col-xs-12 col-md-6 col-lg-6">
                                    <div className="form-group">
                                        <label >Nom de l'examen</label>
                                        <input type="examen" className="form-control" id="nom_examen" placeholder="Nom de l'examen" required/>
                                    </div>
                                    <div className="form-group">
                                        <label>Date de l'examen</label>
                                        {" "}
                                        <br />
                                        <DateSelect />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" id="description" rows={3} placeholder="Veuillez saisir une description ..." style={{maxWidth:'100%', height: '110px'}} defaultValue={""} required/>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-md-6 col-lg-6">
                                    <ListCompetences
                                        selectRowProp={this.getCompetenceSelectRowProp()}
                                        group={this.state.group}
                                        mode="evaluations_libres"
                                        examenCallback={this.onExamenSelect}
                                        isIntervenant={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="box-footer">
                            <button className="btn btn-lg btn-default" onClick={() => this.refs.simpleDialog.hide()}>Annuler</button>
                            <button type="submit" className="btn btn-lg btn-success pull-right">Sauvegarder</button>
                        </div>
                    </form>
                </SkyLight>
            </div>
        )
    }
}

AddExamens.displayName = 'Example';
module.exports = AddExamens;
