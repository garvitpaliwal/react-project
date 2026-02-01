import React, { useState } from "react";
import "./DialogBox.css";

const DialogBox = ({ onCreate, onClose }) => {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#B38BFA"); // default purple

  const colors = [
    "#B38BFA", // purple
    "#FF79F2", // pink
    "#43E6FC", // cyan
    "#F19576", // orange
    "#0047FF", // blue
    "#6691FF"  // light blue
  ];

  const handleCreate = () => {
    onCreate(title, color);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  

  return (
    <div className="dialog-overlay" onClick={handleOverlayClick}>
      <div className="dialog-box">
        <h2>Create New group</h2>

        <div className="form-row">
          <label>Group Name</label>
          <input
            type="text"
            placeholder="Enter group name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Choose colour</label>
          <div className="color-picker">
            {colors.map((c) => (
              <div
                key={c}
                className={`color-circle ${color === c ? 'selected' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>

        <div className="dialog-buttons">
          <button className="create-btn" onClick={handleCreate}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogBox;