import React, { Component } from 'react';
import Map from '../../containers/map/map';
import MarketsData from "../../SuperMarketsData.json";
import Backbutton from "../../components/backbutton/backbutton";
import Tooltip from '@material-ui/core/Tooltip';
import PhoneIcon from '@material-ui/icons/Phone';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import ChatIcon from '@material-ui/icons/Chat';
import LinkIcon from '@material-ui/icons/Link';
import './resultpage.css';

class ResultPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "Couldn't find this supermarket",
            address: "Search again",
            tel: "",
            maxPeople: NaN,
            currentPeople: NaN
        }
    }

    componentDidMount(){
        const marketData = MarketsData.find(market => this.props.match.params.marketname === market.name);
        if(marketData)
            this.setState(marketData);
    }


    render() {
        return (
            <div>
                <Backbutton />
                <div className="resultPage">
                    <div className="Info">
                        <div className="marketBasicInfo">
                            <p style={{fontWeight:'bold'}}> {this.state.name} </p>
                            <p> {this.state.address} </p>
                            <div className="actionsWrapper">
                                <div className="actionWrapper">
                                    <Tooltip title={this.state.tel}>
                                        <PhoneIcon color="primary"/>
                                    </Tooltip>
                                </div>
                                <div className="actionWrapper">
                                    <Tooltip title="Προσθήκη ειδοποίησης, όταν αδειάσει από κόσμο">
                                        <AddAlertIcon color="primary"/>
                                    </Tooltip>
                                </div>
                                <div className="actionWrapper">
                                    <Tooltip title="Δεν υπάρχει κάποια ανακοίνωση απο το κατάστημα">
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
                     <div className="Meter">
                        <div className="marketBasicInfo">
                            <p style={{margin:'10px'}}> Αυτή τη στιγμή το κατάστημα έχει:</p>
                            <p style={{color:'green',fontWeight:'bold'}}> Λίγο Κόσμο </p>
                        </div>
                     </div>
                     <div className="Map">
                        <Map latitude={this.state.address[0]} longitude={this.state.address[1]} />
                    </div>
                </div>
             </div>
        );
    }
}

export default ResultPage;
