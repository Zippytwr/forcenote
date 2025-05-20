import React from "react";
import { CreateNote } from "../features/create-note/ui/CreateNote";
import { ListNotes } from "../widgets/notes-list/ui/ListNotes";

const App: React.FC = (): React.JSX.Element => {
  return (
    <div className="app">
      <div className="button">
        <ListNotes />
        <CreateNote />
      </div>
    </div>
  )
}
export default App;
