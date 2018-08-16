import { combineReducers } from 'redux';
import productsReducer, { iState as iProductState } from './productsReducer';
import filtersReducer, { iState as iFilterState } from './filtersReducer';

export interface iState{
	filters: iFilterState,
	products: iProductState
}

const rootReducer = combineReducers({
  products: productsReducer,
  filters: filtersReducer
});

export default rootReducer;