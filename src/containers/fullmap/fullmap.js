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
        backgroundColor: theme.palette.primary.main,
        borderRadius:'15px',
        margin:'20px'
    },
    button: {
        '&:hover': {
            backgroundColor: '#4b5366',
            borderColor: '#4b5366',
            boxShadow: 'none',
        },
        marginBottom:'20px'
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
            name: "Σκλαβενίτης",
            tel:"2109932172",
            squaremeters:"340",
            address: "Θεομήτορος 43",
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
                    <h4> Αναζήτηση Καταστημάτων </h4>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="Age"
                      value={0}
                      className={classes.input}>
                      <MenuItem value={0}>
                        Όλα τα καταστήματα
                      </MenuItem>
                      <MenuItem value={10}>Σκλαβενίτης</MenuItem>
                      <MenuItem value={20}>ΑΒ Βασιλόπουλος</MenuItem>
                      <MenuItem value={30}>Κρητικός</MenuItem>
                    </Select>
                    <Button className={classes.button}>
                        ΑΝΑΖΗΤΗΣΗ
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
                            <div>
                                <div className="marketPreview" />
                                <div className="marketPreviewInfo">
                                    <h3> {this.state.marketSelected.name} </h3>
                                    <h4> {this.state.marketSelected.address} </h4>
                                    <p style={{color:'green'}}>
                                        Αυτή την στιγμή το κατάστημα έχει λίγο κόσμο
                                    </p>
                                </div>
                            </div>
                        </Popover>
                </MapGL>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(FullMap);
