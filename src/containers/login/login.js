import React from 'react';
import {Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import Backbutton from '../../components/backbutton/backbutton';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';

class Login extends React.Component {
    render() {
        return (
            <div className="SecondaryPage">
                <Backbutton />
                <form className="FormWrapper">
                    <h2> Login Page </h2>
                    <h3> Give your store's credentials to get access to the admin page</h3>
                    <TextField
                    id="emailogin"
                    label="E-mail"
                    placeholder="Store's email"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}/>
                    <TextField
                    id="passwordlogin"
                    label="Password"
                    type="password"
                    placeholder="Store's Password"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}/>
                    <Link to="/storemanagement">
                        <Button style={{marginTop:'20px'}} color="primary">
                            Login
                        </Button>
                    </Link>
                    <Link to="/addmarket">
                        <Button style={{marginTop:'20px'}} color="primary">
                            Sign up your store now
                        </Button>
                    </Link>
                </form>
            </div>
        );
    }
}

export default Login;
