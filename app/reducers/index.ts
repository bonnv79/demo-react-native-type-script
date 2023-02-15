import { combineReducers } from 'redux';

import cartReducers from './cartReducers';
import userReducers from './userReducers';
import newsReducers from './newsReducers';
import appReducers from './appReducers';

const rootReducer = combineReducers({
  cart: cartReducers,
  user: userReducers,
  news: newsReducers,
  app: appReducers,
});

export default rootReducer;