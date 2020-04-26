import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import BackButton from "../../components/backbutton/backbutton";
import EditButton from "../../components/editbutton/editbutton";
import MapGL,{Marker} from "react-map-gl";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import AlarmAddIcon from '@material-ui/icons/AlarmAdd';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AppsIcon from '@material-ui/icons/Apps';
import { withStyles } from '@material-ui/core/styles';
import graph from '../../assets/img/graph.png';
import './managestore.css';

const styles = theme => ({
    icon:{
        fontSize:40
    }
});

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic29jaWFsZGV2ZWxvcGVyIiwiYSI6ImNrOHljY2owajAwd2gzZW5xYnRqb3o1N24ifQ.M0p-MAwHIx43z-SRiUzpZw";

class ManageStore extends Component {
    constructor(props){
        super(props);
        this.state = {
            maxPeople: 60,
            peopleIn: 60,
            viewport: {
                longitude:23.7263,
                latitude:37.9186,
                zoom: 15.80,
                height: '33.3vh',
                width: '40vw',
            }
        }
    }

    customerIn = () => {
        var newPeople = this.state.peopleIn + 1;
        if(newPeople > this.state.maxPeople)
            return;
        this.setState({
            peopleIn: newPeople,
        })
    }

    customerOut = () => {
        var newPeople = this.state.peopleIn - 1;
        if(newPeople < 0)
            return;
        this.setState({
            peopleIn: newPeople,
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <BackButton />
                <EditButton />
                <div className="ManageStoreContainer">
                    <div className="Photo">
                        <div class="Time">
                            <h3> Current Time: 4:02:32 p.m. </h3>
                            <h3> Shedule: 9:00 a.m. - 9:00 p.m. </h3>
                        </div>
                    </div>
                    <div className="StoreInfo">
                        <Grid container direction="column">
                            <h3> YourMarket </h3>
                            <h4> Theomitoros 43</h4>
                            <p> 2109932172 </p>
                            <p> 340 s.m. </p>
                        </Grid>
                        <div>
                            <MapGL
                            {...this.state.viewport}
                            onViewportChange={this.handleViewportChange}
                            mapboxApiAccessToken={MAPBOX_TOKEN}
                            mapStyle="mapbox://styles/mapbox/streets-v11">
                                 <Marker
                                   latitude={this.state.viewport.latitude}
                                   longitude={this.state.viewport.longitude}>
                                       <LocationOnIcon color="primary" fontSize="large" />
                                 </Marker>
                            </MapGL>
                        </div>
                    </div>
                    <div class="Manage">
                        <div className="OperationsContainer">
                            <div className="Toolbar">
                                <RateReviewIcon color="primary" className={classes.icon} />
                                <AlarmAddIcon color="primary" className={classes.icon} />
                                <AppsIcon color="primary" className={classes.icon} />
                            </div>
                            <div className="Graph">
                                <img src={graph} alt="graph" style={{width:'50vw',height:'99%'}}/>
                                <div className="GraphData">
                                    <h3>
                                        • Mean waiting time:
                                        <h2> 13 min </h2>
                                    </h3>
                                    <h3>
                                        • Next customer in approx:
                                        <h2> 18 min </h2>
                                    </h3>
                                    <h3>
                                        • Stain' in store around:
                                        <h2> 9 min </h2>
                                    </h3>
                                </div>
                            </div>
                            <div class="PeopleData">
                                <div>
                                    <h3> Max People: </h3>
                                    <p className="PeopleCounter"> {this.state.maxPeople} </p>
                                </div>
                                { (this.state.peopleIn !== 0)
                                    ?   <div>
                                            <h3> In Store: </h3>
                                            <p className="PeopleCounter"> {this.state.peopleIn} </p>
                                        </div>
                                    :   <p style={{color:'green',fontSize:'25px',margin:'35px'}}>
                                            Store has no customers
                                        </p>
                                }
                                { (this.state.peopleIn !== this.state.maxPeople)
                                    ?   <div>
                                            <h3> Can serve : </h3>
                                            <p className="PeopleCounter"> {this.state.maxPeople - this.state.peopleIn} </p>
                                        </div>
                                    :   <p style={{color:'red',fontSize:'25px',margin:'35px'}}>
                                            The store cannot serve another customer
                                        </p>
                                }
                                <div className="ButtonGroup">
                                    <div className="CustomerButton" onClick={this.customerIn}>
                                        <AddIcon style={{color:'#fff'}} />
                                    </div>
                                    <div className="CustomerButton" onClick={this.customerOut}>
                                        <RemoveIcon style={{color:'#fff'}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ManageStore);
