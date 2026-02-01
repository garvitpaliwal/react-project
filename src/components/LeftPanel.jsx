import React, { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
import "./LeftPanel.css";

const LeftPanel = ({ openDialog, onGroupSelect }) => {
  const { groups, groupidx, setGroupidx } = useContext(NotesContext);

  // Function for EXACT 2-letter initials
  const getInitials = (title) => {
    const words = title.trim().split(" ");

    // Case 1: one word → take first 2 letters
    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    // Case 2: multiple words → take first letter of first 2 words
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  const handleGroupClick = (index) => {
    setGroupidx(index);
    if (onGroupSelect) {
      onGroupSelect(index);
    }
  };

  return (
    <div className="lp-container">
      <div className="lp-header">
        <h1>Pocket Notes</h1>
      </div>

      <div className="lp-list">
        {groups.map((group, index) => {
          const initials = getInitials(group.title);

          return (
            <button
              key={index}
              onClick={() => handleGroupClick(index)}
              className={`group-item ${groupidx === index ? 'active' : ''}`}
            >
              <div
                className="avatar"
                style={{ backgroundColor: group.color }}
              >
                {initials}
              </div>

              <span>{group.title}</span>
            </button>
          );
        })}
      </div>

      <div className="lp-footer">
        <button onClick={openDialog}>+</button>
      </div>
    </div>
  );
};

export default LeftPanel;