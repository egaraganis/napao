import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import HeightIcon from '@material-ui/icons/Height';
import StoreIcon from '@material-ui/icons/Store';
import PhoneIcon from '@material-ui/icons/Phone';

class BasicInfo extends React.Component {
    render() {
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                <TextField
                id="marketname"
                label="1. Market's Name"
                placeholder="What's the market's name"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <StoreIcon color="primary" />
                        </InputAdornment>
                    ),
                }}/>
                <TextField
                id="marketel"
                label="2. Telephone"
                placeholder="What's the market's telephone"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <PhoneIcon color="primary" />
                        </InputAdornment>
                    ),
                }}/>
                <TextField
                id="marketsquaremeters"
                label="3. Square meters "
                placeholder="How many square meters is the market ?"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <HeightIcon color="primary" />
                        </InputAdornment>
                    ),
                }}/>
            </Grid>
        );
    }
}

export default BasicInfo;
