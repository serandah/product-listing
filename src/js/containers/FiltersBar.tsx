//React imports
import * as React from 'react';
//Redux imports
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//React Router imports
import { Link } from "react-router-dom";
//MUI imports
import { withStyles, createStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { WithStyles } from '@material-ui/core';
//Component imports
//Other imports
import { filtersChanged, FiltersActionsTypes } from '../actions/filtersActions';

//Type imports
import { iState as iRootState } from '../reducers/rootReducer';

export interface FiltersBarProps extends iRootState, FiltersActionsTypes, WithStyles<typeof styles> {

}

const styles = createStyles({
  button: {
    minWidth: "40px",
    padding: "0",
    margin:"0 2px"
  },
  filterBar: {
    margin:"10px 0"
  }
});

/**
 * The main component that renders the entire app.
 */
class FiltersBar extends React.Component<FiltersBarProps> {

   constructor (props: FiltersBarProps) {
    // gain access to super class
    super(props);
    // set initial state
    /* this.state = {
      pageSize: 10,
    }; */

    // bind 'this' context to methods
    this.handleChange  = this.handleChange.bind(this);
  }
  
  handleChange (event: React.ChangeEvent<HTMLSelectElement>) {
    this.props.filtersChanged(Number((event.target as HTMLSelectElement).value));
  }
  
  render() {

    const numPages = Math.ceil(this.props.products.productList.length / this.props.filters.pageSize);
    /* let bot= [...Array(numPages)].map((element, index)=>{
      return `element is ${index}`;
    }); */

    let bot = [1,2,3,4].map((element, index)=>{
      return `element is ${index}`;
    });

    return (
      <div className={this.props.classes.filterBar}>
        <FormControl>
          <InputLabel>Page Size</InputLabel>
          <Select
              value={this.props.filters.pageSize}
              onChange={this.handleChange}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <div>
            {
              Array(numPages).fill("").map((element, index)=>{
                const pageNum = index + 1;
                return (
                  <Button key={pageNum} component={({ innerRef, ...props }) => <Link {...props} to={`/page/${pageNum}`} />} /* component={Link} to={`/page/${pageNum}`} */ className={this.props.classes.button} variant="outlined">
                    {pageNum}
                  </Button>
                );
              })
            }
            </div>
        </FormControl>        
      </div>
      
    );
  }
}

const mapStateToProps =  (state: FiltersBarProps) => {
    return{
      products:state.products,
      filters:state.filters
    };
}

const mapDispatchToProps =  (dispatch: Dispatch) => {
    return bindActionCreators({filtersChanged:filtersChanged}, dispatch);
}

//export default withRouter(connect (mapStateToProps, mapDispatchToProps))(  
export default connect(mapStateToProps, mapDispatchToProps)(
      withStyles(styles)(FiltersBar)
  );

