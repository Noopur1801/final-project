import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Contactus.css'; // Import your CSS file for ContactUs styling

const Contactus = () => {
    return (
        <Container>
            <div className="contact-us">
                <h2>Contact Us</h2>
                <div className="contact-info">
                    <p>
                        <FontAwesomeIcon icon={faPhone} /> Phone: +1 123 456 7890
                    </p>
                    <p>
                        <FontAwesomeIcon icon={faEnvelope} /> Email: info@example.com
                    </p>
                </div>
            </div>
        </Container>
    );
};

export default Contactus;
