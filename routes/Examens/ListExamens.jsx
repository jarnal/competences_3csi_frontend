import React from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table'

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
  }
  render() {
    return (
      <BootstrapTable
        data={ this.props.data }
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

  module.exports = ListExamens
