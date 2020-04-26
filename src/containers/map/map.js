import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import React, { Component } from "react";
import MapGL,{Marker} from "react-map-gl";
import LocationOnIcon from '@material-ui/icons/LocationOn';

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic29jaWFsZGV2ZWxvcGVyIiwiYSI6ImNrOHljY2owajAwd2gzZW5xYnRqb3o1N24ifQ.M0p-MAwHIx43z-SRiUzpZw";

class Map extends Component {
    state = {
        viewport: {
            longitude:this.props.latitude,
            latitude:this.props.longitude,
            zoom: 16.47,
            height: '100vh',
            width: '66vw',
        },
    };

    mapRef = React.createRef();

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
        const { viewport } = this.state;
        return (
            <div>
                <MapGL
                ref={this.mapRef}
                {...viewport}
                onViewportChange={this.handleViewportChange}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11">
                    <Marker
                      longitude={this.props.latitude}
                      latitude={this.props.longitude}>
                          <LocationOnIcon color="primary" fontSize="large" />
                    </Marker>
                </MapGL>
            </div>
        );
    }
}

export default Map;
