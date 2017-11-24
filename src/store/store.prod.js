import { createStore, applyMiddleware, compose } from 'redux'
import { rootReducer }  from 'reducers'
import thunkMiddleware from 'redux-thunk';
const initialState = window.__INITIAL_STATE__;
export let store = createStore( rootReducer, initialState, applyMiddleware (thunkMiddleware));

