import { combineReducers, createStore } from 'redux';
import cartReducers from './cartReducers';

const rootReducer = combineReducers({
  cart: cartReducers
});

export const store = createStore(rootReducer);
