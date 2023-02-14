import { combineReducers, createStore } from 'redux';
import cartReducers from './cartReducers';
import userReducers from './userReducers';

const rootReducer = combineReducers({
  cart: cartReducers,
  user: userReducers,
});

export const store = createStore(rootReducer);
