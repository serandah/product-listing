//React imports
import  * as React from 'react';

//Redux imports
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

//React Router imports
import { RouteComponentProps } from 'react-router';
import { Route, withRouter } from "react-router-dom";

//Type imports
import { iState as iRootState } from '../reducers/rootReducer';

//Component imports
import FiltersBar from '../containers/FiltersBar';
import ProductsList from '../containers/ProductsList';
import ProductDetail from '../containers/ProductDetail';

//Other imports
import { loadProducts, ProductsActionsTypes } from '../actions/productsActions';


export interface AppProps extends ProductsActionsTypes,  RouteComponentProps<any>, iRootState{

}

/**
 * The main component that renders the entire app.
 */
class App extends React.Component<AppProps> {


  /**
  * React componentDidMount lifecycle hook.
  *
  * @public
  */
  componentDidMount () {
    // Component has been mounted. Let's load the json 
    this.props.loadProducts('/data/products.json');
  }


  /**
  * React render lifecycle hook.
  *
  * @public
  */
  render () {
    return (
      [
        <Route path="/page/:pagenumber" component={FiltersBar}  key="1"/>,
        <Route path="/page/:pagenumber" component={ProductsList} key="2"/>,
        <Route path="/product/:productid" component={ProductDetail}  key="3"/>
      ]
    );
  }
}

const mapStateToProps =  (state: iRootState) => {
  return{
    products:state.products,
    filters:state.filters
  };
}

const mapDispatchToProps =  (dispatch: Dispatch) => {
  return bindActionCreators({loadProducts:loadProducts}, dispatch)
}

export default withRouter(connect (mapStateToProps, mapDispatchToProps)(App));

