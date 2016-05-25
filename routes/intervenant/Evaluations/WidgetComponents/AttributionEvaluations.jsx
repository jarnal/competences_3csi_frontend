import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import TypeNoteService from '../../../../services/TypeNoteService.js'

class AttributionEvaluations extends React.Component {

    // -
    constructor(props) {
        super(props);
        this.state = {
            noteTypes: []
        };
        this.getTypeNotes();
        this.getCellEditProp = this.getCellEditProp.bind(this);
    }

    // -
    getCellEditProp() {
        return {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.props.editCallback
        }
    }

    // -
    getTypeNotes(){

        var that = this;
        TypeNoteService.getAll(function(result){
            var finalList = result["type_notes"].map(function(typenote){
                return typenote.name
            });
            that.setState({
                noteTypes:finalList
            })
        });
    }

    // -
    render() {
        return (
            <div className="box-body col-xs-12">
                <BootstrapTable
                    data={this.props.evaluations}
                    cellEdit={this.getCellEditProp()}
                    height="250"
                    striped={true}
                    hover={true}
                    searchPlaceholder="Rechercher"
                    search={true}
                    noDataText="Aucun utilisateur trouvé">
                    <TableHeaderColumn dataField="user_id" isKey={true} dataSort={true} hidden={true}>Utilisateur
                        ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="user_name" editable={false} dataSort={true}>Nom de l'utilisateur</TableHeaderColumn>
                    <TableHeaderColumn dataField="competence_id" dataSort={true} hidden={true}>Utilisateur
                        ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="competence_name" editable={false} dataSort={true}>Compétence</TableHeaderColumn>
                    <TableHeaderColumn dataField='type_note_label' editable={ { type: 'select', options: { values: this.state.noteTypes } } }>
                        {this.props.isIntervenant ? "Evaluation" : "Auto-evaluation"}
                    </TableHeaderColumn>
                </BootstrapTable>
                <button onClick={this.submit} className="collapsed btn btn-primary pull-right">Envoyer</button>
            </div>
        )
    }
}

export default AttributionEvaluations
