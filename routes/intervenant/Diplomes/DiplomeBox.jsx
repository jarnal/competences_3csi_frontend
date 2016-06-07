import React from 'react'
import SelectGroupes from '../components/SelectGroupes.jsx'
import GroupService from '../../../services/GroupService.js'
import UserService from '../../../services/UserService.js'
import Auth from '../../auth/Auth.jsx'

class Diplomes extends React.Component {

    // - Initialize
    constructor(props) {
        super(props);
    }

    // - Called when the component has been mounted
    componentDidMount() {
        $(window).trigger('resize');
    }

    // - Render the component view
    render() {
        return (
            <div className="col-xs-4">
                <div className="small-box bg-aqua">
                    <div className="inner">
                        <h3>{this.props.data.diplome_name}</h3>
                        <p>{this.props.data.diplome_mention}</p>
                    </div>
                    <div className="icon">
                        <i className="fa fa-graduation-cap"></i>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Diplomes;