import { combineReducers } from 'redux';
import products from './reducers/product';
import common from './reducers/common';
import { routerReducer } from 'react-router-redux';
export default combineReducers({
  products,
  common,
  router: routerReducer
});