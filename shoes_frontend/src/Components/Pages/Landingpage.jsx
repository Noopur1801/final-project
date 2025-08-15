import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Modal from "react-modal";
import "./Landingpage.css";

const Landingpage = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    const reloadPage = localStorage.getItem("reloadPage");

    if (token && reloadPage === "true") {
      localStorage.removeItem("reloadPage");
      window.location.reload();
    }
  }, []);

  const openVideoPopup = () => {
    setIsVideoOpen(true);
  };

  const closeVideoPopup = () => {
    setIsVideoOpen(false);
  };

  return (
    <div className="landing-page">
      <body style={{ backgroundImage: `url(${"./banner.png"})` }}>
        <div className="main-box">
          <div className="main-title">
            <div className="title">
              <p>Welcome to</p>
              <p className="pa">Sole Sneakers</p>
              <div className="title-para-and-button">
                <p>Step into a World of Comfort and Style with Every Pair</p>
                <div className="title-button">
                  <Link to="/home">
                    <button>Buy Now</button>
                  </Link>
                  <button>See More...</button>
                  <button onClick={openVideoPopup}>Watch Advertisement</button>
                </div>
              </div>
            </div>
            <div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="buy__btn store__btn">
                <Link to="/collections">Visit Store</Link>
              </motion.button>
            </div>
          </div>
          <div className="title-image lpimage">
            <img
              src="./shoes.png"
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                top: "35px",
              }}
              alt="not find"
            />
          </div>
        </div>
      </body>

      {/* Video Popup Modal */}
      <Modal
        isOpen={isVideoOpen}
        onRequestClose={closeVideoPopup}
        className="video-popup"
        overlayClassName="video-overlay"
        contentLabel="Video Popup">
        <div className="video-container">
          <button className="close-btn" onClick={closeVideoPopup}>
            Close
          </button>
          <iframe
            title="Advertisement Video"
            width="560"
            height="315"
            src="./video3.mp4"
            frameBorder="0"
            allowFullScreen></iframe>
        </div>
      </Modal>
    </div>
  );
};

export default Landingpage;
