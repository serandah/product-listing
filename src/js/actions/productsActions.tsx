//Redux
import { Dispatch } from 'redux';

import * as types from './actionTypes';
import { iProduct } from '../reducers/productsReducer';

export interface ProductsActionsTypes{
	loadProducts: (url: string)=>(dispatch: Dispatch)=>void;
}

function loadProductsprogress() {  
	return {type: types.PRODUCTS_LOAD_PROGRESS};
}

function loadProductsSuccess(products: iProduct[]) {  
	return {type: types.PRODUCTS_LOAD_SUCCESS, products};
}

export function loadProducts(url: string) {
	
	return function(dispatch: Dispatch) {
		//debugger;
		dispatch(loadProductsprogress());  
		return fetch(url).then(response => {
			return response.json();
		}).then(products => {
			dispatch(loadProductsSuccess(products));
		}).catch(error => {
			throw(error);
		});
	};
}
