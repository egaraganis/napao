import React from 'react';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import {Link} from "react-router-dom";
import {ReactComponent as VirusIcon} from '../../assets/svg/virus.svg';
import { withStyles } from '@material-ui/core/styles';
import './homepage.css';

const styles = theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        padding: '2px 4px',
        width: 600,
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
    icon: {
        fill:'#000',
        width:'5vw',
        paddingBottom: '20px',
        marginRight:'10px',
    }
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
                        <p className="homeMore">
                            Συνδεθείτε
                        </p>
                    </Link>
                    <Link to="/addmarket" className={classes.link}>
                        <p className="homeMore">
                            Προσθέστε το κατάστημά σας
                        </p>
                    </Link>
                </div>
                <div className="logo">
                    <VirusIcon className={classes.icon} />
                    <h1 className="homeHeader"> να πάω ; </h1>
                </div>
                <Paper component="form" className={classes.root} onSubmit={this.handleSubmit}>
                    <InputBase
                    className={classes.input}
                    placeholder="Όνομα καταστήματος, διεύθυνση, άλλο"
                    onChange = {(event) => this.inputChangedHandler(event)}/>
                    <IconButton type="submit" className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <Divider className={classes.divider} orientation="vertical" />
                    <Link to='/fullmap'>
                        <IconButton color="primary" className={classes.iconButton} aria-label="directions">
                            <DirectionsIcon />
                        </IconButton>
                    </Link>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Homepage);
