import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Backbutton from "../../components/backbutton/backbutton";
import Button from '@material-ui/core/Button';
import CrowdIndicator from "../../components/crowdindicator/crowdindicator";
import MapGL,{Marker} from "react-map-gl";
import Tooltip from '@material-ui/core/Tooltip';
import PhoneIcon from '@material-ui/icons/Phone';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import ChatIcon from '@material-ui/icons/Chat';
import LinkIcon from '@material-ui/icons/Link';
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
            name: null,
            tel:null,
            squaremeters:null,
            address: null,
            coords: null,
            photo:null,
            peopleIn:null,
            maxPeople:null
        },
        viewport: {
            longitude:23.7263,
            latitude:37.9186,
            zoom: 14.17,
            height: '100vh',
            width: '99vw',
        },
        anchorEl: null
    };

    mapRef = React.createRef();

    handleClick = (event,MarketData) => {
      this.setState({marketSelected:MarketData,anchorEl:event.currentTarget});
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
                      <MenuItem value={30}>MyMarket</MenuItem>
                      <MenuItem value={30}>Lidl</MenuItem>
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
                                onClick={(event) => this.handleClick(event,Market)}>
                                    <LocationOnIcon color="primary" fontSize="large" />
                                </IconButton>
                        </Marker>
                    )}
                </MapGL>
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
                        <div
                        className="marketPreviewPhoto"
                        style={{
                            backgroundImage: `url(${this.state.marketSelected.photo})`,
                            backgroundSize: 'cover'
                        }} />
                        <div className="marketPreviewInfo">
                            <h3> {this.state.marketSelected.name} </h3>
                            <h4> {this.state.marketSelected.address} </h4>
                            <div className="crowdIndicator">
                                <CrowdIndicator
                                peopleIn={this.state.marketSelected.peopleIn}
                                maxPeople={this.state.marketSelected.maxPeople}/>
                            </div>
                            <div className="actionsWrapper">
                                <div className="actionWrapper">
                                    <Tooltip title={this.state.marketSelected.tel}>
                                        <PhoneIcon color="primary"/>
                                    </Tooltip>
                                </div>
                                <div className="actionWrapper">
                                    <Tooltip title="Send me a notification when store has few people">
                                        <AddAlertIcon color="primary"/>
                                    </Tooltip>
                                </div>
                                <div className="actionWrapper">
                                    <Tooltip title="Store announcements">
                                        <ChatIcon color="primary"/>
                                    </Tooltip>
                                </div>
                                <div className="actionWrapper">
                                    <Tooltip title="sklavenitis.gr">
                                        <LinkIcon color="primary"/>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </Popover>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(FullMap);
