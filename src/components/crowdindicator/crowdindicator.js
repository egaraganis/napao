import React from 'react';

export default function CrowdIndicator(props) {
    let percent = props.peopleIn/props.maxPeople;
    var crowdIndicator,color;
    if(percent <= 0.4){
        crowdIndicator = 'There are few customers';
        color='green';
    }
    else if(percent <= 0.8){
        crowdIndicator = 'There are quite many customers ';
        color='orange';
    }
    else if(percent < 1){
        crowdIndicator = 'There are many customers';
        color='red';
    }
    else{
        crowdIndicator = 'The store is full';
        color='red';
    }
    return (
        <h3 style={{color:color,fontWeight:'bold'}}> {crowdIndicator} </h3>
    )
}
