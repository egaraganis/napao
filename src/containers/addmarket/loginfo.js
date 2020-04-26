import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';

class LogInfo extends React.Component {
    render() {
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                <TextField
                id="signupmail"
                label="5.Market's E-mail"
                placeholder="Give the market's e-mail"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <MailIcon color="primary" />
                        </InputAdornment>
                    ),
                }}/>
                <TextField
                id="signupassword"
                label="6.Password"
                placeholder="What's the store's password"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon color="primary" />
                        </InputAdornment>
                    ),
                }}/>
            </Grid>
        );
    }
}

export default LogInfo;
