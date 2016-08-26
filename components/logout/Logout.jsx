import React, { PropTypes } from 'react'

// - logout component, only return view and logout user
class Logout extends React.Component{

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        return(
            <div className="login-box">
                <div className="login-logo" style={{color: 'white'}}>
                    <b>Admin</b>Skill
                </div>
                <div className ="login-box-body">
                    <p className="login-box-msg">Vous êtes déconnectés</p>
                </div>
            </div>
        )
    }
}

Logout.propTypes = {
    onMount: PropTypes.func.isRequired
};

export default Logout