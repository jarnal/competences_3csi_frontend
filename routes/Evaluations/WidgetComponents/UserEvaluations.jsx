import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import GroupService from '../../../services/GroupService.js'

const selectRowProp = {
    mode: 'checkbox',
    clickToSelect: true  // enable click to select
};

const options = {
    noDataText: "Aucun utilisateur trouvée"
};

class UserEvaluations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

        this.getUsers = this.getUsers.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.getUsers(nextProps.group.id);
    }

    getUsers(groupID){

        var that = this;
        GroupService.getUsers(groupID, function(result){
            console.log(result);
            that.setState({
                users:result
            })
        });
    }

    render() {
        return (
            <div className="box-body col-xs-5">
                <BootstrapTable
                    data={this.state.users}
                    height="250"
                    striped={true}
                    hover={true}
                    selectRow={selectRowProp}
                    searchPlaceholder="Rechercher"
                    search={true}
                    noDataText="test"
                    options={options}>
                    <TableHeaderColumn dataField="id" isKey={true} dataSort={true} hidden={true}>Utilisateur
                        ID</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataSort={true}>Nom de l'utilisateur</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default UserEvaluations
