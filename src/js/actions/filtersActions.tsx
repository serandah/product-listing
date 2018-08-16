//Redux imports
import { Dispatch } from 'redux';

//Other imports
import { FILTERS_CHANGED } from './actionTypes';

export interface FiltersActionsTypes{
	filtersChanged: (pageSize: number)=>(dispatch: Dispatch)=>void;
}

export function filtersChanged(pageSize: number){  
	return function(dispatch: Dispatch) {
		dispatch({
			type: FILTERS_CHANGED,
			pageSize
		});
	}
}


