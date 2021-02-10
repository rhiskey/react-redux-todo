import {combineReducers} from 'redux';
import tasks from './tasks';
import filters from './filters';

//Редьюсеры по scope задач делятся
const rootReducer = combineReducers({tasks, filters});

export default rootReducer;