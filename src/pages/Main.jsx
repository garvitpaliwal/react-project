import React, { useState, useContext } from "react";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
import DialogBox from "../components/DialogBox";
import { NotesContext } from "../context/NotesContext";
import "./main.css";

const Main = () => {
  const { groups, setGroups, groupidx, setGroupidx } = useContext(NotesContext);
  const [showDialog, setShowDialog] = useState(false);
  const [showMobilePanel, setShowMobilePanel] = useState("left"); // 'left' or 'right'

  const handleCreateGroup = (title, color) => {
    if (!title.trim()) return;
    
    const newGroup = {
      title: title.trim(),
      color,
      notes: []
    };
    
    setGroups([...groups, newGroup]);
    setShowDialog(false);
  };

  const handleGroupSelect = (index) => {
    setGroupidx(index);
    // On mobile, switch to right panel when group is selected
    if (window.innerWidth <= 768) {
      setShowMobilePanel("right");
    }
  };

  const handleBackToGroups = () => {
    setShowMobilePanel("left");
  };

  return (
    <>
      <div className="main-container">
        {/* Left Panel - visible based on mobile state */}
        <div className={`left-section ${showMobilePanel === "left" ? "mobile-visible" : "mobile-hidden"}`}>
          <LeftPanel 
            openDialog={() => setShowDialog(true)}
            onGroupSelect={handleGroupSelect}
          />
        </div>

        {/* Right Panel - visible based on mobile state */}
        <div className={`right-section ${showMobilePanel === "right" ? "mobile-visible" : "mobile-hidden"}`}>
          {/* Back button for mobile */}
          {groupidx !== null && (
            <button className="mobile-back-btn" onClick={handleBackToGroups}>
              ← Back to Groups
            </button>
          )}
          <RightPanel />
        </div>
      </div>

      {showDialog && (
        <DialogBox
          onCreate={handleCreateGroup}
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  );
};


export default Main;
