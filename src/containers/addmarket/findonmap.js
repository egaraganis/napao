import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import MapGL,{Marker} from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic29jaWFsZGV2ZWxvcGVyIiwiYSI6ImNrOHljY2owajAwd2gzZW5xYnRqb3o1N24ifQ.M0p-MAwHIx43z-SRiUzpZw";

class FindStoreInMap extends Component {
    state = {
        viewport: {
            longitude:23.7263,
            latitude:37.9186,
            zoom: 10.90,
            height: '34.2vh',
            width: '45vw',
        },
    };

    mapRef = React.createRef();

    handleViewportChange = viewport => {
        var lng = viewport.longitude.toFixed(4);
        var lat = viewport.latitude.toFixed(4);
        console.log(lng + " " + lat);
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
        const { viewport } = this.state;
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                <TextField
                style={{width:'400px',marginBottom:'20px'}}
                id="input-with-icon-textfield"
                label="4. Market's address"
                placeholder="What's the markets address"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <LocationOnIcon color="primary" />
                        </InputAdornment>
                    ),
                }}/>
                <div style={{width:'40vw',textAlign:'center',color:'#545454'}}>
                    <h4>
                        Please locate the store on map, zooming in and centering it.
                    </h4>
                </div>
                <MapGL
                ref={this.mapRef}
                {...viewport}
                onViewportChange={this.handleViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11">
                    <Geocoder
                     mapRef={this.mapRef}
                     onResult={this.handleOnResult}
                     onViewportChange={this.handleGeocoderViewportChange}
                     mapboxApiAccessToken={MAPBOX_TOKEN}
                     position='top-left'/>
                     <Marker
                       latitude={this.state.viewport.latitude}
                       longitude={this.state.viewport.longitude}>
                           <GpsFixedIcon color="primary" fontSize="large" />
                     </Marker>
                </MapGL>
            </Grid>
        );
    }
}

export default FindStoreInMap;
