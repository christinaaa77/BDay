import React from 'react';
import './memories.css'
const Memories = () => {
    return (
        <div className="memories-page">
            <h2 className="memories-title">Memories</h2>
            <p className="memories-description">
    Ephesians 4:15 But speaking the truth in love, may grow up into him in all things, which is the head, even Christ.
</p>

            {/* Video Section */}
            <div className="memories-video-container">
                <video className="memories-video" controls>
                    <source src={`${process.env.PUBLIC_URL}/videos/videojpn.mp4`} type="video/mp4" />
                    Browser Anda tidak mendukung pemutar video.
                </video>
            </div>

            {/* Button Section */}
            <button className="memories-button" onClick={() => window.location.href = '/surprise'}>
                Next ⭐
            </button>
        </div>
    );
};

export default Memories;
