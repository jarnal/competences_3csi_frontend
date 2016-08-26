import React, { PropTypes } from 'react'

class Login extends React.Component {

    // Constructor
    constructor(props) {
        super(props);
    }

    //- Render login view
    render() {

        return (
            <div className="login-box">
                <div className="login-logo" style={{color: 'white'}}>
                    <b>Admin</b>Skill
                </div>
                <div className ="login-box-body">
                    <p className="login-box-msg">Veuillez saisir vos identifiants</p>
                    <form onSubmit={(e) => {e.preventDefault(); this.props.onSubmit(this.refs.email.value, this.refs.pass.value)}}>
                        <div className="form-group has-feedback">
                            <input className="form-control" placeholder="Email" ref="email" required/>
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>

                        <div className="form-group has-feedback">
                            <input className="form-control" type="password" placeholder="Password" ref="pass" required/>
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <br/>
                        <div>
                            <button className="btn btn-primary btn-block btn-flat" type="submit">Se connecter</button>
                        </div>
                        <br/>
                        <p className="login-box-msg" style={{color: 'red'}}>{this.props.session.error}</p>
                    </form>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    session: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default Login