import React from "react";
import './Dialogue.css'
function Dialogue({ message, onClose }) {
  return (
    <div className="dialog">
      <div className="dialog-content">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}
export default Dialogue;