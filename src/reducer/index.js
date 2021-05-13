// Main Redux reducer
import { combineReducers } from 'redux';
import customReducer from './reducer';

export default combineReducers({
	customReducer: customReducer
});