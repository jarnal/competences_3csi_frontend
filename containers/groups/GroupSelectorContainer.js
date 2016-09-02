/**
 * Created by jonathan on 30/08/2016.
 */

import { connect } from 'react-redux'
import { getAllGroups, groupSelected } from '../../actions/groups'
import GroupSelector from '../../components/groups/GroupSelector.jsx'

const mapStateToProps = (state) => {
    return {
        groups: state.groups.data,
        groupSelected: state.groups.selected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectChange: (value) => {
            dispatch(groupSelected(value));
        },
        getGroups:() => {
            dispatch(getAllGroups());
        }
    }
};

const GroupSelectorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GroupSelector);

export default GroupSelectorContainer