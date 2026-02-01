import Main from "./pages/Main";
import { NotesProvider } from "./context/NotesContext";

function App() {
  return (
    <NotesProvider>
      <Main/>
    </NotesProvider>
  )
}

export default App
