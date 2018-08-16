import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {AppContainer} from 'react-hot-loader';
import thunk from 'redux-thunk';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import App from './containers/App';
import rootReducer from './reducers/rootReducer';
import '../scss/main.scss';


//React Router imports
import { BrowserRouter } from "react-router-dom";

const store =  createStore(
    rootReducer,
    applyMiddleware(thunk)
  );

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    }
  },

});

/**
 * Entry point of the React app.
 * <AppContainer> wrapper is requied for HMR
*/
ReactDOM.render(
  <AppContainer>
    <Provider  store={store} >
    	<MuiThemeProvider theme={theme}>
        <BrowserRouter>
      	  <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>
  </AppContainer>,
  document.getElementById('app')
);
