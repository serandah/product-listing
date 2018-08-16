import * as types from '../actions/actionTypes';  

export interface iAction{
	type: string,
	products: {ProductCollection:iProduct[]}
}

export interface iState{
	isFetching: boolean,
	productList:iProduct[]
}

export interface iProduct{
	ProductPicUrl: string;
	ProductId: string;
  	Description: string;
	Name: string;
}

export default function productsReducer(state: iState = {isFetching: true, productList:[]}, action: iAction) {  
	switch(action.type) {
		case types.PRODUCTS_LOAD_SUCCESS:
			return { ...state, isFetching: false, productList:action.products.ProductCollection };
		case types.PRODUCTS_LOAD_PROGRESS:
			return { ...state, isFetching: true, productList:[] };
		default: 
			return state;
	}
}
