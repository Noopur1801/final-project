// // src/components/Footer.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Footer.css';

// const Footer = () => {
//     return (
//         <footer className="footer-container">
//             <div className="footer-columns">
//                 <div className="footer-column">
//                     <h3>Products</h3>
//                     <ul className="footer-links">
//                         <li><Link to="/products/running-shoes">Running Shoes</Link></li>
//                         <li><Link to="/products/formal-shoes">Formal Shoes</Link></li>
//                         <li><Link to="/products/casual-shoes">Casual Shoes</Link></li>
//                         <li><Link to="/products/heels">Heels</Link></li>
//                         <li><Link to="/products/flats">Flats</Link></li>
//                         <li><Link to="/products/boots">Boots</Link></li>
//                         <li><Link to="/products/sneakers">Sneakers</Link></li>
//                         <li><Link to="/products/sandals">Sandals</Link></li>
//                     </ul>
//                 </div>
//                 <div className="footer-column">
//                     <h3>Categories</h3>
//                     <ul className="footer-links">
//                         <li><Link to="/collection/mens-footwear">Men's Footwear</Link></li>
//                         <li><Link to="/collection/womens-footwear">Women's Footwear</Link></li>
//                         <li><Link to="/collection/kids-footwear">Kids' Footwear</Link></li>
//                         <li><Link to="/collection/sports-footwear">Sports Footwear</Link></li>
//                     </ul>
//                 </div>
//                 <div className="footer-column">
//                     <h3>Collections</h3>
//                     <ul className="footer-links">
//                         <li><Link to="/collection/new-arrivals">New Arrivals</Link></li>
//                         <li><Link to="/collection/best-sellers">Best Sellers</Link></li>
//                         <li><Link to="/collection/seasonal-collection">Seasonal Collection</Link></li>
//                         <li><Link to="/collection/discounted">Discounted Items</Link></li>
//                     </ul>
//                 </div>
//                 <div className="footer-column">
//                     <h3>Contact Us</h3>
//                     <div className="footer-contact-info">
//                         <p><strong>Email:</strong> support@footwearstore.com</p>
//                         <p><strong>Phone:</strong> (123) 456-7890</p>
//                         <p><strong>Address:</strong> 123 Shoe Lane, Footwear City, FC 12345</p>
//                     </div>
//                     <div className="footer-social-icons">
//                         <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
//                             <i className="fab fa-facebook-f"></i>
//                         </a>
//                         <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
//                             <i className="fab fa-twitter"></i>
//                         </a>
//                         <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
//                             <i className="fab fa-instagram"></i>
//                         </a>
//                         <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
//                             <i className="fab fa-linkedin-in"></i>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//             <div className="footer-bottom">
//                 &copy; {new Date().getFullYear()} Footwear Store. All rights reserved.
//             </div>
//         </footer>
//     );
// };

// export default Footer;
// Footer.jsx

// Footer.jsx

// Footer.jsx

import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Subscribing ${email} to newsletter...`);
    // You can add your subscription logic here
    setEmail(''); // Clear input after submission (optional)
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="section">
          <h3>About Us</h3>
          <p>Sole Sneakers brings you the latest trends in footwear, combining comfort and style in every pair.</p>
        </div>
        <div className="section">
          <h3>Contact Us</h3>
          <p>Email: info@solesneakers.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Sole Street, Sneakerville, USA</p>
        </div>
        <div className="section">
          <h3>Categories</h3>
          <p><strong>Men:</strong> Stylish sneakers for men.</p>
          <p><strong>Women:</strong> Comfortable sandals for the summer.</p>
          <p><strong>Kids:</strong> Colorful sneakers for active kids.</p>
        </div>
        <div className="section">
          <div className="subscribe-form">
            <h3>Subscribe to Our Newsletter</h3>
            <p>Stay updated with the latest news and special offers.</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-pinterest"></i></a>
          </div>
        </div>
      </div>
      <p className="copyright">&copy; 2024 Sole Sneakers. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
