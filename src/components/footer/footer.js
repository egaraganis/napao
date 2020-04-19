import React from 'react';
import './footer.css';

export default function Footer() {
    return (
        <div class="footer-container">
            <div class="description">
                <h2> Τι είναι το Να Πάω; </h2>
                <p style={{color:'black',fontWeght:'bold',width:'30vw'}}>
                    Η πρώτη διαδικτυακή πλατφόρμα διαχείρισης και ενημέρωσης κόσμου, για τον αριθμό ατόμων στα supermarket.
                </p>
            </div>
            <div class="links">
                <h2> Χρήσιμοι Σύνδεσμοι </h2>
                <p> Όροι Χρήσης & Άλλα </p>
            </div>
        </div>
    )
}
