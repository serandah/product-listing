//React imports
import * as React from 'react';

//Redux imports
import { connect } from 'react-redux';

//MUI imports
import { withStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import Grid from '@material-ui/core/Grid';

//React Router imports
import { RouteComponentProps } from 'react-router';

//Type imports
import { iState as iRootState } from '../reducers/rootReducer';
import {iProduct} from '../reducers/productsReducer';

const styles = createStyles({
  card: {
    display: 'flex',
    'flexDirection': 'column',
    'flexGrow':1
  },
  media: {
    height: 200,
    backgroundSize: 'contain'
  },
  actions:{
    marginTop:'auto'
  }
});


export interface ProductDetailProps extends RouteComponentProps<any>{
  classes: any;
  product: iProduct;
}

/**
 * The component that renders the porduct details.
 */
class ProductDetail extends React.Component<ProductDetailProps> {
  
  constructor (props: ProductDetailProps) {
    // gain access to super class
    super(props);
    // set initial state
    /*this.state = {
      selectedPets: []
    };*/
    // bind 'this' context to methods
    //this.loadData = this.loadData.bind(this);

  }

  /**
  * React render lifecycle hook.
  *
  * @public
  */
  render () {

    const { classes } = this.props;

    return (

      <Grid container justify="center" spacing={16}>
        
          <Grid className={this.props.classes.grid} item xs={12} md={6}  lg={3}>
            
            {this.props.product && <Card className={classes.card}>
              <CardMedia
                className={classes.media}
                image={`/${this.props.product.ProductPicUrl}`}
                title={this.props.product.Name}
              />
              <CardContent>
                <Typography gutterBottom variant="headline" component="h3">
                  {this.props.product.Name}
                </Typography>
                <Typography component="p">
                  {this.props.product.Description}
                </Typography>
              </CardContent>
              <CardActions className={classes.actions}>
                <IconButton aria-label="Add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="Share">
                  <ShareIcon />
                </IconButton>     
              </CardActions>
            </Card>}

          </Grid>
        
      </Grid>
      
    );
  }
}

const mapStateToProps =  (state: iRootState, props: ProductDetailProps) => {

  let product: iProduct;

  for (let i = 0; i < state.products.productList.length; i++) {
    if(state.products.productList[i].ProductId === props.match.params.productid){
      product = state.products.productList[i];
      break;
    }
  }

  return{
    product:product,
  };
}

export default connect (mapStateToProps)(
  withStyles(styles)(ProductDetail)
);