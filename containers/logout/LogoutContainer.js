/**
 * Created by jonathan on 26/08/2016.
 */

import { connect } from 'react-redux'
import { logout } from '../../actions/actions'
import Logout from '../../components/logout/Logout.jsx'

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        onMount: () => {
            dispatch(logout());
        }
    }
};

const LogoutContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout);

export default LogoutContainer