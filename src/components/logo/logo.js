import React from 'react';
import {ReactComponent as ShoppingCart} from '../../assets/svg/shopping-cart.svg';
import { makeStyles } from '@material-ui/core/styles';
import './logo.css';

const useStyles = makeStyles((theme) => ({
    root: {
        color: '#F48F3A',
        textAlign:'center',
        display:'flex',
    },
    svgIcon: {
        fill:'#F48F3A',
        height:'15vh',
        width:'10vw',
        paddingTop:'10px',
        paddingRight:'10px'
    }
}));

export default function Logo() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ShoppingCart className={classes.svgIcon}/>
            <div className="textWrapper">
                <p className="headline"> napao ? </p>
                <hr className="logoline" />
                <p className="subline"> <span>BE</span> <span>SAFE</span>. <span>DON'T</span> <span>WAIT</span>.</p>
            </div>
        </div>
    )
}
