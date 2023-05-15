import React from 'react';
import './BirdSection.css'
const BirdSection = () => {
  return (
    <div className="section left-section">
      <div className="section-content">
        <div className="section-image">
          <img src="/images/raiseabird.jpeg" alt="Raising a Bird" />
        </div>
        <div className="section-description">
          <h2>The Melodies of Bird Parenthood: Essential Care and Training Advice</h2>
          <p>
            Planning to have a pet bird? Birds can bring beauty and joy to your home. Here are some important tips for raising a bird:
          </p>
          <ul>
            <li>Provide a spacious and safe cage for your bird with appropriate perches and toys.</li>
            <li>Offer a balanced and varied diet consisting of seeds, pellets, fresh fruits, and vegetables.</li>
            <li>Ensure your bird has access to clean water for drinking and bathing.</li>
            <li>Give your bird regular exercise and flying opportunities outside the cage in a safe environment.</li>
            <li>Provide mental stimulation through interactive toys and social interaction.</li>
            <li>Establish a routine for cleaning the cage and maintaining good hygiene.</li>
            <li>Learn about the specific needs and behaviors of your bird's species for proper care.</li>
            <li>Monitor your bird's health and seek veterinary care if any signs of illness are observed.</li>
            <li>Offer love, patience, and positive reinforcement to build a bond of trust with your bird.</li>
          </ul>
          <p>
            Remember, each bird species has unique care requirements, so research and learn about your specific bird's needs to provide the best care possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirdSection;
