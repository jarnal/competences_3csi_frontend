import React from 'react'
import Select from 'react-select'

class SelectGroupes extends React.Component {

    // - when the component has built, get groups
    componentDidMount(){
        this.props.getGroups();
    }

    // - Render selecter view for groups
    render() {
        return (
            <div className="form-group col-md-3 col-xs-12 col-lg-3 pull-right" style={{fontSize: '14px'}}>
                <Select
                    value={this.props.groupSelected}
                    onChange={this.props.onSelectChange}
                    valueKey="id"
                    clearable={false}
                    labelKey="name"
                    options={this.props.groups}
                />
            </div>
        )
    }
}

export default SelectGroupes;
