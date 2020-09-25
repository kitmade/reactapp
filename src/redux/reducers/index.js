import {combineReducers} from 'redux';
import {numbReducer} from './numReducer';

const rootReducer = combineReducers({numb: numbReducer});

export default rootReducer;
