import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Backbutton from "../../components/backbutton/backbutton";
import Button from '@material-ui/core/Button';
import MapGL,{Marker} from "react-map-gl";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MarketsData from '../../SuperMarketsData.json';
import { withStyles } from '@material-ui/core/styles';
import './fullmap.css';

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic29jaWFsZGV2ZWxvcGVyIiwiYSI6ImNrOHljY2owajAwd2gzZW5xYnRqb3o1N24ifQ.M0p-MAwHIx43z-SRiUzpZw";

const styles = theme => ({
    searchFilters: {
        position:'fixed',
        right:'15px',
        zIndex:1,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:'5px',
        margin:'20px',
        backgroundColor:'rgb(244, 143, 58,0.8)',
    },
    input: {
        '& label.Mui-focused': {
            color: '#000',
        },
        borderRadius:'5px',
        backgroundColor:'#fff',
        width:'250px',
        marginBottom:'20px',
        marginLeft:'20px',
        marginRight:'20px',
        textAlign:'center'
    }
});

class FullMap extends Component {
    state = {
        marketSelected:{
            name: "Sklavenitis",
            tel:"2109932172",
            squaremeters:"340",
            address: "Theomitoros 43",
            coords: [23.7263,37.9186],
            photo:"photolink",
            peopleIn:"40",
            maxPeople:"200"
        },
        viewport: {
            longitude:23.7263,
            latitude:37.9186,
            zoom: 13.47,
            height: '100vh',
            width: '99vw',
        },
        anchorEl: null
    };

    mapRef = React.createRef();

    handleClick = (event) => {
      this.setState({anchorEl:event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl:null});
    };

    handleViewportChange = viewport => {
        this.setState({
            viewport: { ...this.state.viewport, ...viewport }
        });
    };

    handleGeocoderViewportChange = viewport => {
        const geocoderDefaultOverrides = { transitionDuration: 1000 };
        return this.handleViewportChange({
            ...viewport,
            ...geocoderDefaultOverrides
        });
    };

    render() {
        const { classes } = this.props;
        const { viewport } = this.state;
        const open = Boolean(this.state.anchorEl);
        const id = open ? 'simple-popover' : undefined;
        return (
            <div className="fullMapWrapper">
                <Backbutton />
                <div className={classes.searchFilters}>
                    <h3> Search for markets </h3>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="Age"
                      value={0}
                      className={classes.input}>
                      <MenuItem value={0}>
                        All franchises
                      </MenuItem>
                      <MenuItem value={10}>Sklavenitis</MenuItem>
                      <MenuItem value={20}>AB Vasilopoulos</MenuItem>
                      <MenuItem value={30}>Cretekos</MenuItem>
                    </Select>
                    <Button color="primary" style={{color:'black'}}>
                        Search
                    </Button>
                </div>
                <MapGL
                ref={this.mapRef}
                {...viewport}
                onViewportChange={this.handleViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11">
                    {MarketsData.map( Market =>
                            <Marker
                            longitude={Market.coords[0]}
                            latitude={Market.coords[1]}>
                                <IconButton
                                aria-describedby={id}
                                onClick={this.handleClick}>
                                    <LocationOnIcon color="primary" fontSize="large" />
                                </IconButton>
                            </Marker>
                        )}
                        <Popover
                        id={id}
                        open={open}
                        anchorEl={this.state.anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}>
                            <div className="marketPreview">
                                <div className="marketPreviewPhoto" />
                                <div className="marketPreviewInfo">
                                    <h3> {this.state.marketSelected.name} </h3>
                                    <h4> {this.state.marketSelected.address} </h4>
                                    <h3 style={{color:'green'}}>
                                        Few people in the store right now !
                                    </h3>
                                </div>
                            </div>
                        </Popover>
                </MapGL>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(FullMap);
