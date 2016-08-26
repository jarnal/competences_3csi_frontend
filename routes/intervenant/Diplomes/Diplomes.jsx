import React from 'react'
import SelectGroupes from '../components/SelectGroupes.jsx'
import GroupService from '../../../services/GroupService.js'
import UserService from '../../../services/UserService.js'
import DiplomeBox from './DiplomeBox.jsx'
import Auth from '../../auth/Auth.jsx'

class Diplomes extends React.Component {

    // - Initialize
    constructor(props) {
        super(props);
        this.state = {
            diplomes: [],
            overlayVisibility: 'visible'
        };
    }

    // - Called when the component has been mounted
    componentDidMount() {
        $(window).trigger('resize');

        this.getDiplomes = this.getDiplomes.bind(this);
        this.getDiplomes();
    }

    // - Retrieves all diplomes by user ID
    getDiplomes() {

        let that = this;
        let userID = Auth.getUserInfo().user_id;
        let req = UserService.getDiplomes(userID, (result) => {
            that.setState({
                diplomes: that.buildDiplomeView(result),
                overlayVisibility: 'hidden'
            });
        });
        this.setState({currentRequest: req});
    }

    // -
    buildDiplomeView(diplomesList) {
        var diplomesComponents = [];
        var diplome;
        for(var i=0; i<diplomesList.length; i++){
            diplome = diplomesList[i];
            diplomesComponents.push( <DiplomeBox data={diplome} key={i} /> );
        }
        return diplomesComponents;
    }

    // - Render the component view
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Mes Diplômes
                        <small>Mes diplômes obtenus</small>
                    </h1>
                </section>
                <section className="content" style={{ minHeight: 550 }}>
                    <div className="row">
                        <div className="col-xs-12">
                            <section >
                                <div className="box box-primary">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Diplômes</h3>
                                    </div>
                                    <div className="box-body">
                                        <div className="row">
                                            {this.state.diplomes}
                                        </div>
                                    </div>
                                    <div className="overlay" style={{visibility: this.state.overlayVisibility}}>
                                        <i className="fa fa-refresh fa-spin"></i>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Diplomes
