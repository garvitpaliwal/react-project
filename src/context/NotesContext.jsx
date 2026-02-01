import { createContext, useState, useEffect } from "react";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {

  const [groups, setGroups] = useState(() => {
    const savedGroups = localStorage.getItem('pocketNotesGroups');
    return savedGroups ? JSON.parse(savedGroups) : [];
  });
  
  const [groupidx, setGroupidx] = useState(null);

  useEffect(() => {
    localStorage.setItem('pocketNotesGroups', JSON.stringify(groups));
  }, [groups]);

  return (
    <NotesContext.Provider value={{ 
      groups, 
      setGroups,
      groupidx, 
      setGroupidx
    }}>
      {children}
    </NotesContext.Provider>
  );
};