import React from 'react'

var ListClass = React.createClass({
  getInitialState: function() {
    return {
      ListClass: 'Chargement...'
    };
  },

  componentDidMount: function() {
    this.serverRequest = $.get(this.props.source, function (result) {
      console.log(result.class[0]);
      var ListClass = result.class[0];
      this.setState({
        ListClass: ListClass
      });
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.serverRequest.abort();
  },

  render: function() {
    return (
      <div>
        {this.state.ListClass}
      </div>
    );
  }
});

class ClassSelector extends React.Component {
  render() {
    return (
        <ListClass source="http://localhost:8081/class" />
    )
  }
}
module.exports = ClassSelector
