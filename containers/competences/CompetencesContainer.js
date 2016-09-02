/**
 * Created by jonathan on 29/08/2016.
 */

import { connect } from 'react-redux'
import { getCompetencesByMatiere } from '../../actions/competences'
import { getAllMatieres, matiereSelected } from '../../actions/matieres'
import Competences from '../../components/competences/Competences.jsx'

const mapStateToProps = (state) => {
    return {
        selectOptions: state.matieres.data,
        competences: state.competences.data,
        matiereSelected: state.matieres.selected
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectChange: (value) => {
            dispatch(matiereSelected(value));
            dispatch(getCompetencesByMatiere(value.id));
        },
        loadSelectOptions:() => {
            dispatch(getAllMatieres());
        }
    }
};

const CompetencesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Competences);

export default CompetencesContainer