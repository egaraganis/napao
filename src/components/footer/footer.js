import React from 'react';
import './footer.css';
import {ReactComponent as InformedIcon} from '../../assets/svg/medical-mask.svg';
import {ReactComponent as ButHowIcon} from '../../assets/svg/work.svg';

export default function Footer() {
    return (
        <div class="footer-container">
            <div className="description">
                <h2>
                    what's napao ?
                </h2>
                <h3>
                    napao is a live-tracking crowd management platform. Search for grocery stores,
                    see how many people are now and decide whether you wanna go or nah.
                </h3>
            </div>
            <div className="links">
                <h3>
                    How napao works ?
                </h3>
                <ButHowIcon style={{height:'10vh',width:'5vw'}}/>
            </div>
            <div className="links">
                <h3>
                    Get informed about Covid-19
                </h3>
                <InformedIcon style={{height:'10vh',width:'5vw'}}/>
            </div>
        </div>
    )
}
