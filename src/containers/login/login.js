import React from 'react';
import Button from '@material-ui/core/Button';
import Backbutton from '../../components/backbutton/backbutton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {Link} from "react-router-dom";
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';

class Login extends React.Component {
    render() {
        return (
            <div className="SecondaryPage">
                <Backbutton />
                    <form className="FormWrapper">
                        <h3> Σύνδεση Καταστήματος </h3>
                        <TextField
                        id="emailogin"
                        label="E-mail Καταστήματος"
                        placeholder="Ποιό είναι το email του καταστήματος"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}/>
                        <TextField
                        id="passwordlogin"
                        label="Κωδικός Σύνδεσης"
                        placeholder="Πληκτρολογήστε τον κωδικό σύνδεσης"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon color="primary" />
                                </InputAdornment>
                            ),
                        }}/>
                        <Link to="/storemanagement">
                            <Button style={{marginTop:'20px'}} variant="contained" color="primary">
                                ΣΥΝΔΕΣΗ
                            </Button>
                        </Link>
                </form>
            </div>
        );
    }
}

export default Login;
