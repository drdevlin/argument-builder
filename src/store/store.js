import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const initialState = {};

const reducer = (state, action) => {
  return state;
}

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;