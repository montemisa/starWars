import { combineReducers } from 'redux';
import peopleReducer from '../components/People/PeopleSlice';
import speciesReducer from '../components/Species/SpeciesSlices';
import searchReducer from '../components/SearchBar/SearchSlice'
import filmsReducer from '../components/Film/FilmSlice';

const rootReducer = combineReducers({
    peopleState: peopleReducer,
    speciesState: speciesReducer,
    searchState: searchReducer,
    filmsState: filmsReducer,
});

export default rootReducer;