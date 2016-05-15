import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import GroupService from '../../../../services/GroupService.js'

class UserEvaluations extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        };

        this.getUsers = this.getUsers.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.group && this.props.group.id != nextProps.group.id){
            this.getUsers(nextProps.group.id);
        }
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
            <div className="box-body col-xs-12">
                <BootstrapTable
                    data={this.state.users}
                    height="250"
                    striped={true}
                    hover={true}
                    selectRow={this.props.selectRowProp}
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
