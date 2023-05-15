import React from 'react';
import './DogSection.css'

const DogSection = () => {
  return (
    <div className="section right-section">
      <div className="section-content">
        <div className="section-description">
          <h2>Understanding Your Canine Companion: Proven Strategies for Effective Dog Care</h2>
          <p>
            Thinking of getting a dog? Dogs are loyal and loving companions that bring joy and happiness to our lives. Here are some essential tips for raising a dog:
          </p>
          <ul>
            <li>Provide a safe and comfortable living space for your dog.</li>
            <li>Feed your dog a balanced diet appropriate for its age, size, and breed.</li>
            <li>Ensure your dog has access to fresh water at all times.</li>
            <li>Take your dog for regular walks and exercise to keep them physically fit.</li>
            <li>Schedule regular visits to the veterinarian for vaccinations and check-ups.</li>
            <li>Train your dog using positive reinforcement techniques to establish good behavior.</li>
            <li>Provide mental stimulation through interactive toys and games.</li>
            <li>Practice good grooming habits, including regular bathing and grooming sessions.</li>
            <li>Give your dog plenty of love, attention, and socialization to strengthen the bond.</li>
          </ul>
          <p>
            By following these guidelines, you can ensure a happy and healthy life for your canine friend.
          </p>
        </div>
        <div className="section-image">
          <img src="/images/raiseadog.jpg" alt="Raising a Dog" />
        </div>
      </div>
    </div>
  );
};

export default DogSection;
