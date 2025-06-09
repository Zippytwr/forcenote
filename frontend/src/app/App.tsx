import React from "react";
import { ListNotes } from "../widgets/notes-list/ui/ListNotes";
import { CreateNote } from "../features/create-note/ui/createNote";


const App: React.FC = (): React.JSX.Element => {
  return (
    <div className="app">
      <div className="button">
        <CreateNote />
        <ListNotes />

      </div>
    </div>
  )
}
export default App;
