// Sidebar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox, faTags, faUsers, faCog } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li>
          <Link to="/">
            <FontAwesomeIcon icon={faHome} />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/products">
            <FontAwesomeIcon icon={faBox} />
            Products
          </Link>
        </li>
        <li>
          <Link to="/categories">
            <FontAwesomeIcon icon={faTags} />
            Categories
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <FontAwesomeIcon icon={faShoppingBag} />
            Orders
          </Link>
        </li>
        <li>
          <Link to="/users">
            <FontAwesomeIcon icon={faUsers} />
            Users
          </Link>
        </li>
        <li>
          <Link to="/settings">
            <FontAwesomeIcon icon={faCog} />
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
