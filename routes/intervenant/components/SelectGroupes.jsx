import React from 'react'
import Select from 'react-select'
import GroupService from '../../../services/GroupService.js'
class SelectGroupes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {groups: [], value: ""};
        this.onChange = this.onChange.bind(this);
        this.getGroups = this.getGroups.bind(this);
    }

    //
    onChange(value) {
        this.props.callback(value);
        this.setState({ value: value });
    }

    //
    getGroups(input, callback) {
        GroupService.getAll(function (result) {
            var data = {
                options: result["groups"],
                complete: false
            };
            callback(null, data);
        });
    }

    render() {
        return (
            <div className="form-group col-md-3 col-xs-12 col-lg-3 pull-right" style={{fontSize: '14px'}}>
                <Select.Async value={this.state.value} onChange={this.onChange} valueKey="id"
                    clearable={false}  labelKey="name" loadOptions={this.getGroups}/>
            </div>
        )
    }
}

module.exports = SelectGroupes;
