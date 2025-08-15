import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import LoginIcon from "../Pages/LoginIcon";

const Header = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");
  const [isMenuActive, setIsMenuActive] = useState(false);
  const navigate = useNavigate();

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    localStorage.setItem("searchQuery", searchInput);
    if (window.location.href.split("/").includes("SearchedCollection")) {
      window.location.reload();
    } else {
      navigate("/SearchedCollection");
      setSearchInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const closeMenu = () => {
    setIsMenuActive(false);
  };

  return (
    <>
      <header className="header">
        <div className="header__logo">
          <img src="./logo.png" style={{ height: "80px" }} alt="Logo" />
          <a href="/">SOLE SNEAKERS</a>
        </div>
        <nav className="header__nav">
          <ul>
            <li>
              <Link to="/home">HOME</Link>
            </li>
            <li>
              <Link to="/collections">COLLECTIONS</Link>
            </li>
            <li>
              <Link to="/aboutus">ABOUT US</Link>
            </li>
            <li>
              <Link to="/contactus">CONTACT US</Link>
            </li>
          </ul>
        </nav>
        <div className="header__search">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyPress={handleKeyPress}
          />
          <button type="submit" onClick={handleSearch}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="header__icons">
          <div>
            <div
              className={`ham-menu ${isMenuActive ? "active" : ""}`}
              onClick={toggleMenu}>
              <div className="line line-1"></div>
              <div className="line line-2"></div>
              <div className="line line-3"></div>
            </div>
            <span
              className={`ham-bg ${isMenuActive ? "active" : ""}`}
              onClick={toggleMenu}></span>
            <div className={`mobile-menu ${isMenuActive ? "active" : ""}`}>
              <span className="mobile-close-x">
                <span className="mobile-close-x-i" onClick={toggleMenu}>
                  <div className={`ham-menu active`} onClick={toggleMenu}>
                    <div className="line line-1"></div>
                    <div className="line line-2"></div>
                    <div className="line line-3"></div>
                  </div>
                </span>
              </span>
              <nav className="header__nav">
                <ul>
                  <li>
                    <Link to="/home" onClick={closeMenu}>
                      HOME
                    </Link>
                  </li>
                  <li>
                    <Link to="/collections" onClick={closeMenu}>
                      COLLECTIONS
                    </Link>
                  </li>
                  <li>
                    <Link to="/aboutus" onClick={closeMenu}>
                      ABOUT US
                    </Link>
                  </li>
                  <li>
                    <Link to="/contactus" onClick={closeMenu}>
                      CONTACT US
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="header__search">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleKeyPress}
                />
                <button type="submit" onClick={handleSearch}>
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </div>
          <LoginIcon />
        </div>
      </header>
    </>
  );
};

export default Header;
