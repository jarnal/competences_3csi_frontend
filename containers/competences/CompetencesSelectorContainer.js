/**
 * Created by jonathan on 29/08/2016.
 */

import { connect } from 'react-redux'
import { login } from '../../actions/actions'
import Selector from '../../components/competences/CompetencesSelector.jsx'

const mapStateToProps = (state) => {
    return {
        //groups: state.data.competences
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        /*onSelectChange: (group) => {
            dispatch(selectGroup(group));
        }*/
    }
};

const CompetencesSelectorContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Selector);

export default CompetencesSelectorContainer