import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './ContactUs.css';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        // Reset the form
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-us-container">
            <h1 className="contact-us-title">Contact Us</h1>
            <p className="contact-us-description">
                We would love to hear from you! Whether you have a question about our products, need assistance, or just want to give us feedback, please feel free to reach out to us.
            </p>
            <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Send Message</button>
            </form>
            <div className="contact-info">
                <h3>Contact Information</h3>
                <p><strong>Email:</strong> support@footwearstore.com</p>
                <p><strong>Phone:</strong> (123) 456-7890</p>
                <p><strong>Address:</strong> 123 Shoe Lane, Footwear City, FC 12345</p>
                <p><strong>Business Hours:</strong> Mon - Fri: 9am - 6pm, Sat: 10am - 4pm, Sun: Closed</p>
                <div className="social-media">
                    <h4>Follow Us</h4>
                    <a href="https://www.facebook.com/yourprofile" className="social-link" target="_blank" rel="noopener noreferrer">
                        <FaFacebook />
                    </a>
                    <a href="https://www.twitter.com/yourprofile" className="social-link" target="_blank" rel="noopener noreferrer">
                        <FaTwitter />
                    </a>
                    <a href="https://www.instagram.com/yourprofile" className="social-link" target="_blank" rel="noopener noreferrer">
                        <FaInstagram />
                    </a>
                </div>
            </div>
            <div className="faq-section">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-item">
                    <h4>What is your return policy?</h4>
                    <p>We offer a 30-day return policy for all unused footwear. Please contact our support team for more details.</p>
                </div>
                <div className="faq-item">
                    <h4>How do I track my order?</h4>
                    <p>After placing your order, you will receive a tracking number via email. Use this number to track your order on our website.</p>
                </div>
                <div className="faq-item">
                    <h4>Do you offer international shipping?</h4>
                    <p>Yes, we ship to most countries worldwide. Shipping fees and times vary based on the destination.</p>
                </div>
            </div>
            <div className="map-container">
                <h3>Our Location</h3>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.961107684936!2d-122.08424968469223!3d37.4219999798215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb24a5e8888d9%3A0x66f0c601f0a11b74!2sGoogleplex!5e0!3m2!1sen!2sus!4v1629382989161!5m2!1sen!2sus"
                    allowFullScreen=""
                    loading="lazy"
                    title="Google Map Location"
                ></iframe>
            </div>
        </div>
    );
};

export default ContactUs;
