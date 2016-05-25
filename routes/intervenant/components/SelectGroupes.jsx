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

    componentDidMount(){
        this.getGroups();
    }

    //
    onChange(value) {
        localStorage.setItem("sgroup", JSON.stringify(value));
        this.setState({ value: value });

        if(this.props.callback){
            this.props.callback(value);
        }
    }

    //
    getGroups() {
        var that = this;
        GroupService.getAll(function (result) {
            var previousSelectedGroup = JSON.parse(localStorage.getItem("sgroup"));
            if(previousSelectedGroup && that.props.callback != null) {
                that.props.callback(previousSelectedGroup);
            }

            that.setState({
                groups: result["groups"],
                value: previousSelectedGroup
            })
        });
    }

    render() {
        return (
            <div className="form-group col-md-3 col-xs-12 col-lg-3 pull-right" style={{fontSize: '14px'}}>
                <Select
                    value={this.state.value}
                    onChange={this.onChange}
                    valueKey="id"
                    clearable={false}
                    labelKey="name"
                    options={this.state.groups}
                />
            </div>
        )
    }
}

module.exports = SelectGroupes;
