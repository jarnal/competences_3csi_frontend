import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'
import ExamenService from '../../services/ExamenService.js'

function DescValidator(value) {
    if (!value) {
        return 'Une description est requise';
    }
    return true;
}

function NameValidator(value) {
    if (!value) {
        return 'Un nom est requis';
    }
    return true;
}

class ListExamens extends React.Component {
    constructor(props) {
        super(props);
        this.state = {examens: []};
    }

    componentDidMount(){
        console.log("componentDidMount");
        this.getExamens();
    }

    getExamens() {
        var that = this;
        ExamenService.getAll(function (result) {
            console.log(result);
            that.setState({
                examens: result["examens"]
            })
        });
    }

    render() {
        return (
            <BootstrapTable
                data={ this.state.examens }
                remote={ true }
                search={true}
                pagination={ true }
                fetchInfo={ { dataTotalSize: this.props.totalDataSize } }
                options={ {
          onAddRow: this.props.onAddRow,
          sizePerPage: this.props.sizePerPage,
          onPageChange: this.props.onPageChange,
          sizePerPageList: [ 5, 10 ],
          page: this.props.currentPage,
          onSizePerPageList: this.props.onSizePerPageList } }>
                <TableHeaderColumn dataField='id' hidden={ true } dataSort isKey autoValue>ID</TableHeaderColumn>
                <TableHeaderColumn
                    dataField='name'
                    editable={ { validator: NameValidator } }>Nom</TableHeaderColumn>
                <TableHeaderColumn
                    dataField='description'
                    editable={ { type: 'textarea', validator: DescValidator } }>Description</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}

module.exports = ListExamens;
