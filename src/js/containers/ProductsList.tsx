//React imports
import * as React from 'react';

//Redux imports
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

//MUI imports
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { WithStyles } from '@material-ui/core';

//React Router imports
import { RouteComponentProps, Redirect } from 'react-router';
//import { Redirect } from "react-router-dom";

//Component imports
import ProductSingle from '../components/ProductSingle';

//Type imports
import { iState as iRootState } from '../reducers/rootReducer';


//Other imports
import { loadProducts, ProductsActionsTypes } from '../actions/productsActions';

export interface ProductsListProps extends ProductsActionsTypes, iRootState, WithStyles<typeof styles>, RouteComponentProps<any>{

}

const styles = {
  grid: {
    display: 'flex',
  }
};


/**
 * The main component that renders the entire app.
 */
class ProductsList extends React.Component<ProductsListProps> {

  
  constructor (props: ProductsListProps) {
    // gain access to super class
    super(props);

    // bind 'this' context to methods
    //this.loadData = this.loadData.bind(this);

  }


  /**
  * React render lifecycle hook.
  *
  * @public
  */
  render () {

    if (this.props.products.isFetching){
      return <LinearProgress />;
    }

    const lastIndex = this.props.filters.pageSize * this.props.match.params.pagenumber
    const firstIndex = lastIndex - this.props.filters.pageSize;
    const filteredProducts = this.props.products.productList.slice(firstIndex, lastIndex);

    // Redirect to first page if the current page number is not valid
    if(filteredProducts.length < 1){
      return <Redirect to="/page/1" />
    }
    
    return (
      <Grid container justify="center" spacing={16}>
        {filteredProducts.map(product => (
          <Grid key={product.ProductId}  className={this.props.classes.grid} item xs={12} md={6}  lg={3}>
            <ProductSingle {...product} />
          </Grid>
        ))}
      </Grid>
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

export default connect (mapStateToProps, mapDispatchToProps)(
    withStyles(styles)(ProductsList)
  );
