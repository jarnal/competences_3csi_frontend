import React from 'react'
import Select from 'react-select'
import GroupService from '../../../services/GroupService.js'
class Groupes extends React.Component {

    constructor(props) {
        super(props);
        this.state = {groups: [], value: ""};

        this.onChange = this.onChange.bind(this);
        this.getGroups = this.getGroups.bind(this);
    }

    //
    onChange(value) {
        console.log(this);
        this.setState({
            value: value
        });
    }

    //
    getGroups(input, callback) {
        var that = this;
        GroupService.getAll(function (result) {
            var data = {
                options: result["groups"],
                complete: false
            };
            callback(null, data);
            //that.onChange(result["groups"][3]);
        });
    }

    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Groupes
                        <small>En Construction...</small>
                        <div className="form-group col-md-3 col-xs-12 col-lg-3 pull-right" style={{fontSize: '14px'}}>
                            <Select.Async
                                value={this.state.value}
                                onChange={this.onChange}
                                valueKey="id"
                                searchingText='Chargement...'
                                placeholder="Sélectionnez une classe"
                                noResultsText="Aucun resultat"
                                clearable={false}
                                labelKey="name"
                                loadOptions={this.getGroups}/>
                        </div>
                    </h1>
                </section>
                <section className="content" style={{ minHeight: 550 }}>
                    {/* contenu */}
                </section>
            </div>
        )
    }
}

module.exports = Groupes
