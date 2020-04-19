import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BackButton from "../../components/backbutton/backbutton";
import EditButton from "../../components/editbutton/editbutton";
import MapGL,{Marker} from "react-map-gl";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { withStyles } from '@material-ui/core/styles';
import './managestore.css';

const styles = theme => ({
    input: {
        '& label.Mui-focused': {
            color: '#000',
        },
        borderRadius:'5px',
        backgroundColor:'#fff',
        width:'360px',
    },
    button: {
        '&:hover': {
            backgroundColor: '#4b5366',
            borderColor: '#4b5366',
            boxShadow: 'none',
        },
    }
});

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoic29jaWFsZGV2ZWxvcGVyIiwiYSI6ImNrOHljY2owajAwd2gzZW5xYnRqb3o1N24ifQ.M0p-MAwHIx43z-SRiUzpZw";

class ManageStore extends Component {
    constructor(props){
        super(props);
        this.state = {
            maxPeople: 10,
            peopleIn: 10,
            viewport: {
                longitude:23.7263,
                latitude:37.9186,
                zoom: 3.80,
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
                <div className="grid-container">
                    <div className="Photo">
                        <div class="Time">
                            <p> Τρέχον Ώρα: 4:02:32 μ.μ. </p>
                            <p> Ωράριο: 9:00 π.μ. - 9:00 μ.μ. </p>
                        </div>
                    </div>
                    <div className="StoreInfo">
                        <Grid container direction="column">
                            <h3> Σκλαβενίτης </h3>
                            <h4> Θεομήτορος 47</h4>
                            <p> 2109938654 </p>
                            <p> 410 τ.μ. </p>
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
                        <div className="manage-container">
                            <div class="Announcement">
                                <h4> Δημιουργία Ανακοίνωσης </h4>
                                <p style={{margin:11}}>
                                    Η ανακοίνωση θα αναρτηθεί στη σελίδα του καταστήματος
                                </p>
                                <TextField
                                className={classes.input}
                                id="title"
                                placeholder="Τίτλος ανακοίνωσης"
                                variant="outlined"/>
                                <TextField
                                className={classes.input}
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                placeholder="Περιεχόμενο της ανακοίνωσης"
                                variant="outlined"/>
                                <Button className={classes.button}>
                                    ΑΝΑΡΤΗΣΗ
                                </Button>
                            </div>
                            <div className="Graph">
                                <div className="img" />
                                <p style={{fontSize:'15px'}}> Αριθμός πελατών ανά τον χρόνο </p>
                                <div className="data">
                                    <p> • Μέσος Χρόνος Αναμονής Πελάτη: 13 λεπτά </p>
                                    <p> • Μέσος Χρόνος Ψωνίσματος: 16 λεπτά </p>
                                    <p> • Εκτιμώμενος Χρόνος ελεύθερης θέσης: 2 λεπτά </p>
                                </div>
                            </div>
                            <div class="People-Data">
                                <div>
                                    <h4> Μεγιστός Αριθμός Ατόμων: </h4>
                                    <p className="peopleCounter"> {this.state.maxPeople} </p>
                                </div>
                                { (this.state.peopleIn !== 0)
                                    ?   <div>
                                            <h4> Εντός Καταστήματος </h4>
                                            <p className="peopleCounter"> {this.state.peopleIn} </p>
                                        </div>
                                    :   <p style={{color:'green',fontSize:'18px',margin:'35px'}}>
                                            Το Κατάστημα είναι άδειο
                                        </p>
                                }
                                { (this.state.peopleIn !== this.state.maxPeople)
                                    ?   <div>
                                            <h4> Ελεύθερες Θέσεις: </h4>
                                            <p className="peopleCounter"> {this.state.maxPeople - this.state.peopleIn} </p>
                                        </div>
                                    :   <p style={{color:'red',fontSize:'18px',margin:'35px'}}>
                                            Το Κατάστημα δεν μπορεί να πάρει άλλο πελάτη
                                        </p>
                                }
                                <div className="buttonGroup">
                                    <div className="customerButton" onClick={this.customerIn}>
                                        <AddIcon style={{color:'#fff'}} />
                                    </div>
                                    <div className="customerButton" onClick={this.customerOut}>
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
