import React, { Component } from 'react';
import Map from '../../containers/map/map';
import MarketsData from "../../SuperMarketsData.json";
import Backbutton from "../../components/backbutton/backbutton";
import CrowdIndicator from "../../components/crowdindicator/crowdindicator";
import Tooltip from '@material-ui/core/Tooltip';
import PhoneIcon from '@material-ui/icons/Phone';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import ChatIcon from '@material-ui/icons/Chat';
import LinkIcon from '@material-ui/icons/Link';
import img from '../../assets/img/store1.jpg';
import './resultpage.css';

class ResultPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            marketResulted:{
                name: "Couldn't find this supermarket",
                address: "Search again",
                tel: "",
                coords: null,
                photo:null,
                peopleIn:NaN,
                maxPeople:NaN
            }
        }
    }

    componentDidMount(){
        const marketData = MarketsData.find(market =>
            this.props.match.params.marketname.replace(/ .*/,'') === market.name);
        if(marketData)
            this.setState({marketResulted:marketData});
        console.log(marketData);
    }

    render() {
        return (
            <div>
                <Backbutton />
                <div className="resultPage">
                    <div className="Info"
                    style={{
                        backgroundImage: `url(${this.state.marketResulted.photo})`,
                        margin:'10',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'
                    }}>
                        <div className="marketBasicInfo">
                            <h2 style={{fontWeight:'bold'}}> {this.state.marketResulted.name} </h2>
                            <h3> {this.state.marketResulted.address} </h3>
                            <div className="actionsWrapper">
                                <div className="actionWrapper">
                                    <Tooltip title={this.state.marketResulted.tel}>
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
                     <div className="Meter">
                        <div className="marketBasicInfo">
                            <h3 style={{margin:'10px'}}> Crowd levels:</h3>
                            <CrowdIndicator
                            peopleIn={this.state.marketResulted.peopleIn}
                            maxPeople={this.state.marketResulted.maxPeople}/>
                        </div>
                     </div>
                     <div className="Map">
                        { this.state.marketResulted.coords
                            ?
                            <Map
                            latitude={this.state.marketResulted.coords[0]} longitude={this.state.marketResulted.coords[1]} />
                            :
                            <p> wait </p>
                        }
                    </div>
                </div>
             </div>
        );
    }
}

export default ResultPage;
