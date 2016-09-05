import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import { getGroupUsers } from '../../services/GroupService.js'

class UserEvaluations extends React.Component {

    // When component will mount, fetch users
    componentWillMount(){
        if(this.props.needsFetching){
            this.props.loadData(this.props.selectedGroup.id);
        }
    }

    // - When component has received props, fetch users
    componentWillReceiveProps(nextProps) {
        if(nextProps.needsFetching){
            this.props.loadData(nextProps.selectedGroup.id);
        }
    }

    // - Render user list evaluations
    render() {
        return (
            <div className="box-body col-xs-12">
                <BootstrapTable
                    data={this.props.users}
                    height="250"
                    striped={true}
                    hover={true}
                    selectRow={{
                        mode: 'checkbox',
                        clickToSelect: true,
                        onSelect: this.props.onUserSelect,
                        onSelectAll: this.props.onUserSelectAll
                    }}
                    searchPlaceholder="Rechercher"
                    search={true}
                    noDataText="Aucun utilisateur trouvé">
                    <TableHeaderColumn dataField="id" isKey={true} dataSort={true} hidden={true}>Utilisateur
                        ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort={true}>Nom de l'utilisateur</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default UserEvaluations
