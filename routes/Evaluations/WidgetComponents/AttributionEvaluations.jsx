import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import TypeNoteService from '../../../services/TypeNoteService.js'

const cellEditProp = {
    mode: 'click',
    blurToSave: true
};

class AttributionEvaluations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            noteTypes: []
        };
        this.getTypeNotes();
    }

    componentWillReceiveProps(nextProps) {

    }

    getTypeNotes(){

        var that = this;
        TypeNoteService.getAll(function(result){
            var finalList = result["type_notes"].map(function(typenote){
                return typenote.name
            });
            console.log(finalList);

            that.setState({
                noteTypes:finalList
            })
        });
    }

    render() {
        return (
            <div className="box-body col-xs-5">
                <BootstrapTable
                    data={this.props.evaluations}
                    cellEdit={cellEditProp}
                    height="250"
                    striped={true}
                    hover={true}
                    //selectRow={this.props.selectRowProp}
                    searchPlaceholder="Rechercher"
                    search={true}
                    noDataText="Aucun utilisateur trouvé">
                    <TableHeaderColumn dataField="user_id" isKey={true} dataSort={true} hidden={true}>Utilisateur
                        ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="user_name" editable={false} dataSort={true}>Nom de l'utilisateur</TableHeaderColumn>
                    <TableHeaderColumn dataField="competence_id" dataSort={true} hidden={true}>Utilisateur
                        ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="competence_name" editable={false} dataSort={true}>Compétence</TableHeaderColumn>
                    <TableHeaderColumn dataField='evaluation' editable={ { type: 'select', options: { values: this.state.noteTypes } } }>Evaluation</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default AttributionEvaluations
