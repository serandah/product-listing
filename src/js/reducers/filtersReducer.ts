import * as types from '../actions/actionTypes';  

export interface iAction{
	type: string,
	pageSize: number

}

export interface iState{
	pageSize: number
}

export default function filtersReducer(state: iState = {pageSize: 50}, action:iAction) {  
	switch(action.type) {
		case types.FILTERS_CHANGED:
			return { ...state, pageSize:action.pageSize };
		default: 
			return state;
	}
}
