/**
 * Created by jonathan on 29/08/2016.
 */

import { connect } from 'react-redux'
import { login } from '../../actions/actions'
import Competences from '../../components/competences/Competences.jsx'

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

const CompetencesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Competences);

export default CompetencesContainer