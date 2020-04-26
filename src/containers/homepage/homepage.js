import React from 'react';
import {Link} from "react-router-dom";
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import MapIcon from '@material-ui/icons/Map';
import IconButton from '@material-ui/core/IconButton';
import Logo from '../../components/logo/logo';
import { withStyles } from '@material-ui/core/styles';
import './homepage.css';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: '2px 4px',
        width: '50vw',
        minWidth:'300px',
        marginTop:'30px'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontWeight:'900'
    },
});

class Homepage extends React.Component {
    state = { inputGiven: null };

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.state.inputGiven)
            this.props.history.push('/result/' + this.state.inputGiven);
    }

    inputChangedHandler = (event) => {
        this.setState({inputGiven:event.target.value});
    }

    render(){
        const { classes } = this.props;
        return (
            <div className="homePage">
                <div className="moreWrapper">
                    <Link to="/login" className={classes.link}>
                        <h3 className="homeMore">
                            Log In
                        </h3>
                    </Link>
                    <Link to="/addmarket" className={classes.link}>
                        <h3 className="homeMore">
                            Add your store
                        </h3>
                    </Link>
                </div>
                <Logo className={classes.logo}/>
                <Paper component="form" className={classes.root} onSubmit={this.handleSubmit}>
                    <InputBase
                    autoComplete='true'
                    className={classes.input}
                    placeholder="Type grocery's store name, address, other..."
                    onChange = {(event) => this.inputChangedHandler(event)}/>
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider className={classes.divider} orientation="vertical" />
                    <Link to='/fullmap'>
                        <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                            <MapIcon />
                        </IconButton>
                    </Link>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Homepage);
