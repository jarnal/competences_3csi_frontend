import React from 'react';
import RemoteAll from '../ListExamens.jsx';

function getExams() {
  const Exams = [];
  const startId = Exams.length;
  for (let i = 0; i < 40; i++) {
    const id = startId + i;
    Exams.push({
      id: id,
      name: 'Examen n ° ' + id,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    });
  }
  return Exams;
}

export default class RemoteStoreSorting extends React.Component {
  constructor(props) {
    super(props);
    this.products = getExams();
    this.state = {
      data: this.products.slice(0, this.props.sizePerPage),
      totalDataSize: this.products.length,
      sizePerPage: this.props.sizePerPage
    };
  }

  onAddRow(row) {
    this.products.push(row);
    this.setState({
      data: this.products
    });
  }

  onPageChange(page, sizePerPage) {
    const currentIndex = (page - 1) * sizePerPage;
    this.setState({
      data: this.products.slice(currentIndex, currentIndex + sizePerPage),
      currentPage: page
    });
  }

  onSizePerPageList(sizePerPage) {
    const currentIndex = (this.state.currentPage - 1) * sizePerPage;
    this.setState({
      data: this.products.slice(currentIndex, currentIndex + sizePerPage),
      sizePerPage: sizePerPage
    });
  }

  render() {
    return (
      <RemoteAll onAddRow={ this.onAddRow.bind(this) }
        onPageChange={ this.onPageChange.bind(this) }
        onSizePerPageList={ this.onSizePerPageList.bind(this) } { ...this.state } />
    );
  }
}
