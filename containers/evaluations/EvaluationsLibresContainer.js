/**
 * Created by jonathan on 02/09/2016.
 */

import { connect } from 'react-redux'
import { addUser, addAllUsers, removeUser, removeAllUsers } from '../../actions/evaluations'
import { addCompetence, addAllCompetences, removeCompetence, removeAllCompetences } from '../../actions/evaluations'
import { getCompetencesByMatiere } from '../../actions/competences'
import { getAllMatieres, matiereSelected } from '../../actions/matieres'
import EvaluationsLibres from '../../components/evaluations/EvaluationsLibres.jsx'

const mapStateToProps = (state) => {
    return {
        matiereSelected: state.matieres.selected,
        competences: state.competences.data,
        matieres: state.matieres.data,
        //users: state.users.data
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
        onCompetenceSelect : (competence, isSelected) => {
            dispatch(isSelected ? addCompetence(competence) : removeCompetence(competence));
        },
        onCompetenceSelectAll : (isSelected, competences) => {
            if(!isSelected){
                dispatch(removeAllCompetences());
                return;
            }
            dispatch(addAllCompetences(competences));
        },
        onExamenSelect : (value) => {

        },
        onAfterSaveCell : (value) => {

        },
        onMatiereSelectChange: (matiere) => {
            dispatch(matiereSelected(matiere));
            dispatch(getCompetencesByMatiere(matiere.id));
        },
        loadSelectOptions:() => {
            dispatch(getAllMatieres());
        }
    }
};

const EvaluationsLibresContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(EvaluationsLibres);

export default EvaluationsLibresContainer