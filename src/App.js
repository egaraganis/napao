import React from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { ThemeProvider } from '@material-ui/core/styles';
import FullMap from './containers/fullmap/fullmap';
import AddMarket from './containers/addmarket/addmarket';
import Footer from './components/footer/footer';
import Login from './containers/login/login';
import Home from './containers/homepage/homepage';
import ManageStore from './containers/managestore/managestore';
import ResultPage from './containers/resultpage/resultpage';
import { createMuiTheme } from '@material-ui/core/styles';
import './App.css';

const CoronaMarketTheme= createMuiTheme({
    type: 'light',
    palette: {
        primary: {
            main:'#F48F3A',
        },
        text: {
            primary:'#373f51',
            secondary: '#929eaa'
        }
    },
    background: {
        default: '#d8dbe2',
    },
    overrides: {
        MuiButton: {
            root: {
                color: "#d8dbe2",
                width: 200,
                '&:hover': {
                    backgroundColor: '#F48F3A',
                }
            }
        },
        MuiTextField: {
            root: {
                marginTop:"20px",
                marginBottom:"15px",
                marginLeft:"40px",
                marginRight:"40px",
                width:'400px',
            }
        },
        MuiInput: {
            underline: {
                '&:before': {
                    borderBottom: '1px solid #F48F3A',
                },
                '&:hover:not($disabled):not($focused):not($error):before': {
                    borderBottom: '2px solid #F48F3A',
                },
              }
        },
    }
});

export default function App() {
  return (
        <ThemeProvider theme={CoronaMarketTheme}>
            <Router>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/fullmap" component={FullMap} />
                  <Route path="/addmarket" component={AddMarket} />
                  <Route path="/login" component={Login} />
                  <Route path="/storemanagement" component={ManageStore} />
                  <Route path="/result/:marketname" component={ResultPage} />
                </Switch>
                <Footer />
            </Router>
        </ThemeProvider>
  );
}
