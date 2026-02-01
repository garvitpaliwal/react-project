import React, { useContext, useState } from "react";
import "./RightPanel.css";
import { NotesContext } from "../context/NotesContext";

const RightPanel = () => {
  const { groups, setGroups, groupidx, setGroupidx } = useContext(NotesContext);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [newNote, setNewNote] = useState("");

  // No group selected - show empty state
  if (groupidx === null || !groups[groupidx]) {
  return (
    <div className="rp-container rp-empty">
      <div className="empty-state">
        <img 
          src="/bg-img.png" 
          alt="Pocket Notes" 
          className="empty-image"
        />
        <h1 className="empty-title">Pocket Notes</h1>
        <p className="empty-description">
          Send and receive messages without keeping your phone online.<br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>
      <div className="empty-footer">
        <span className="lock-icon">🔒</span>
        <span>end-to-end encrypted</span>
      </div>
    </div>
  );
}

  const group = groups[groupidx];

  // -------------------------------- DELETE GROUP -------------------------------
  const handleDeleteGroup = () => {
    const updated = [...groups];
    updated.splice(groupidx, 1);
    setGroups(updated);
    setGroupidx(null);
    setSelectedNoteIndex(null);
    setNewNote("");
  };

  // -------------------------------- ADD / EDIT NOTE -----------------------------
  const handleAddOrEdit = () => {
    if (!newNote.trim()) return;

    const updated = [...groups];

    // EDIT existing note
    if (selectedNoteIndex !== null) {
      if (typeof updated[groupidx].notes[selectedNoteIndex] === 'object') {
        updated[groupidx].notes[selectedNoteIndex].text = newNote.trim();
      } else {
        updated[groupidx].notes[selectedNoteIndex] = newNote.trim();
      }
      setGroups(updated);
      setSelectedNoteIndex(null);
      setNewNote("");
      return;
    }

    // ADD NEW note with timestamp
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
    const timeStr = now.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });

    updated[groupidx].notes.push({
      text: newNote.trim(),
      date: dateStr,
      time: timeStr
    });

    setGroups(updated);
    setNewNote("");
  };

  // -------------------------------- DELETE NOTE --------------------------------
  const handleDeleteNote = (index) => {
    const updated = [...groups];
    updated[groupidx].notes.splice(index, 1);
    setGroups(updated);
    setSelectedNoteIndex(null);
    setNewNote("");
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddOrEdit();
    }
  };

  return (
    <div className="rp-container">
      {/* HEADER */}
      <div className="rp-header">
        <h2>{group.title}</h2>
        <button className="delete-group-btn" onClick={handleDeleteGroup}>
          Delete Group
        </button>
      </div>

      {/* NOTES LIST */}
      <div className="notes-list">
        {group.notes.length === 0 ? (
          <p className="no-notes">No notes yet. Start typing below!</p>
        ) : (
          group.notes.map((note, index) => (
            <div
              key={index}
              className={`note-item ${selectedNoteIndex === index ? "selected" : ""}`}
              onClick={() => {
                setSelectedNoteIndex(index);
                setNewNote(typeof note === 'string' ? note : note.text);
              }}
            >
              <p className="note-text">
                {typeof note === 'string' ? note : note.text}
              </p>
              
              {typeof note === 'object' && note.date && note.time && (
                <p className="note-timestamp">
                  {note.date} • {note.time}
                </p>
              )}
              
              {selectedNoteIndex === index && (
                <div className="note-actions">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(index);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* ADD NOTE AREA */}
      <div className="add-note-area">
        <textarea
          placeholder="Enter your text here..........."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="send-btn"
          onClick={handleAddOrEdit}
          disabled={!newNote.trim()}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default RightPanel;