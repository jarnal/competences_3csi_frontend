/**
 * Created by jonathan on 02/09/2016.
 */

import { connect } from 'react-redux'
import { addUser, addAllUsers, removeUser, removeAllUsers } from '../../actions/evaluations'
import { getUsersByGroup } from '../../actions/users'
import EvaluationsUserSelector from '../../components/evaluations/EvaluationsUserSelector.jsx'

const mapStateToProps = (state) => {
    return {
        users: state.users.data,
        needsFetching: state.users.needsFetching,
        selectedGroup: state.groups.selected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUserSelect : (user, isSelected) => {
            dispatch(isSelected ? addUser(user) : removeUser(user));
        },
        onUserSelectAll : (isSelected, users) => {
            if(!isSelected){
                dispatch(removeAllUsers());
                return;
            }
            dispatch(addAllUsers(users));
        },
        loadData: (groupID) => {
            dispatch(getUsersByGroup(groupID));
        }
    }
};

const EvaluationsUserSelectorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EvaluationsUserSelector);

export default EvaluationsUserSelectorContainer