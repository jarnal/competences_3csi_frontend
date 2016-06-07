import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import TypeNoteService from '../../../../services/TypeNoteService.js'

class AttributionEvaluations extends React.Component {

    // - Build component for display
    constructor(props) {
        super(props);
        this.state = {
            noteTypes: [],
            currentRequest: null
        };
        this.getCellEditProp = this.getCellEditProp.bind(this);
    }

    // - When component is mounted get
    componentWillMount() {
        this.getTypeNotes();
    }

    // -
    componentWillUnmount() {
        if(this.state.currentRequest != null) {
            this.state.currentRequest.abort();
        }
    }

    // - Edit note when user click
    getCellEditProp() {
        return {
            mode: 'click',
            blurToSave: true,
            afterSaveCell: this.props.editCallback
        }
    }

    // - Get notes from services
    getTypeNotes(){

        var that = this;
        var req = TypeNoteService.getAll(function(result){
            var finalList = result["type_notes"].map(function(typenote){
                return typenote.name
            });
            that.setState({
                noteTypes:finalList
            })
        });
        this.setState({currentRequest:req});
    }

    // validator function pass the user input value and should return true|false.
    jobNameValidator(value) {
        return true;
    }

    // - Render view for "attribution des competences"
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
                    <TableHeaderColumn
                        dataField='type_note_label'
                        editable={{
                            type: 'select',
                            options: { values: this.state.noteTypes },
                            validator: this.jobNameValidator
                        }}
                    >
                        {this.props.isIntervenant ? "Evaluation" : "Auto-evaluation"}
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default AttributionEvaluations
