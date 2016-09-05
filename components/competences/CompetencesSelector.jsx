import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import Select from 'react-select'
import MatiereService from '../../services/MatiereService'
import GroupService from '../../services/GroupService'
import UserService from '../../services/UserService'
import ExamenService from '../../services/ExamenService'
import Auth from '../../services/AuthService'

class ListCompetences extends React.Component {

    //
    componentWillMount() {
        this.props.loadSelectOptions(this.props.mode);
    }

    // - Render the component view
    render () {
        return (
            <div className="box-body col-md-12 col-xs-12 col-lg-12">
                <div className={this.props.addCompetence ? "col-md-11 col-xs-11 col-lg-11" : "col-md-12 col-xs-12 col-lg-12" }>
                    <div className="form-group">
                        <Select
                            value={this.props.selectValue}
                            onChange={this.props.onSelectChange}
                            valueKey="id"
                            clearable={false}
                            labelKey="name"
                            options={this.props.options}
                        />
                    </div>
                </div>

                {this.props.addCompetence
                    ?
                    <div className="col-md-1 col-xs-12 col-lg-1">
                        <div className="form-group">
                            <button className="btn btn-block btn-default pull-right"><i className="fa fa-plus"/>
                            </button>
                        </div>
                    </div>
                    :
                    null
                }
                <div>
                    <BootstrapTable
                        data={this.props.competences}
                        height="250"
                        striped={true}
                        hover={true}
                        selectRow={this.props.selectRow}
                        searchPlaceholder="Rechercher"
                        search={true}
                        noDataText="Aucune competence trouvé">
                        <TableHeaderColumn dataField="id" isKey={true} dataSort={true} hidden={true}>Competence
                            ID</TableHeaderColumn>
                        <TableHeaderColumn dataField="name" dataSort={true}>Nom de la
                            compétence</TableHeaderColumn>
                    </BootstrapTable>

                </div>

            </div>
        )
    }
}

export default ListCompetences
