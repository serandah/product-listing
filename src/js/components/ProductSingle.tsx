//React imports
import * as React from 'react';

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

//React Router imports
import { Link } from "react-router-dom";

//Types
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


export interface ProductSingleProps extends iProduct {
  classes: any;
}

/**
 * The main component that renders the entire app.
 */
class ProductSingle extends React.Component<ProductSingleProps> {
  
  constructor (props: ProductSingleProps) {
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
      
        <Card className={classes.card}>
          <CardMedia
            className={classes.media}
            image={`/${this.props.ProductPicUrl}`}
            title={this.props.Name}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h3">
              {this.props.Name}
            </Typography>
            <Typography component="p">
              {this.props.Description}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions}>
            <IconButton aria-label="Add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="Share">
              <ShareIcon />
            </IconButton>
            <Button component={({ innerRef, ...props }) => <Link {...props} to={`/product/${this.props.ProductId}`} />} size="small" color="primary">
            Learn More
            </Button>      
          </CardActions>
        </Card>
      
    );
  }

}

export default withStyles(styles)(ProductSingle);
