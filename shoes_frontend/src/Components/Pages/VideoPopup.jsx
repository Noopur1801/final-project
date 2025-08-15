// VideoPopup.jsx

import React from 'react';
import Modal from 'react-modal';

const VideoPopup = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="video-popup"
      overlayClassName="video-overlay"
      contentLabel="Video Popup"
    >
      <div className="video-container">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        <iframe
          title="Advertisement Video"
          width="560"
          height="315"
          src="video3.mp4"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </Modal>
  );
};

export default VideoPopup;
