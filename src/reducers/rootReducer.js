import {combineReducers} from 'redux';
import { authReducer } from './authReducer';
import { pageReducer } from './pageReducer';

export const rootReducer = combineReducers({
    page: pageReducer,
    auth: authReducer
})