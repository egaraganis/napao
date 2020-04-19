import React from 'react';
import {Link} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        position:'absolute',
        top:'25px',
        left:'25px',
        zIndex:'1',
        background:'#F48F3A',
        borderRadius:'50%',
    },
    icon: {
        color:'#fff'
    }
}));

export default function BackButton() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Link to="/">
                <IconButton component="span">
                        <ArrowBackIcon className={classes.icon}/>
                </IconButton>
            </Link>
        </div>
    )
}
