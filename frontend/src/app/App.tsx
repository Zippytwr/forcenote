import React from "react";
import { ListNotes } from "../widgets/notes-list/ui/ListNotes";
import { NoteEditor } from "../pages/Note/ui/NotePage";
import { CreateNote } from "../features/create-note/ui/createNote";


const App: React.FC = (): React.JSX.Element => {
  return (
    <div className="app">
      <div className="button">
        <ListNotes />
        <CreateNote />
        <NoteEditor id="57557033-8a09-4245-aaa5-95df8a2d54f0" />
      </div>
    </div>
  )
}
export default App;
