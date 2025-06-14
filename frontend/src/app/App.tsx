import React from "react";
import { ListNotes } from "../widgets/notes-list/ui/ListNotes";
import { CreateNote } from "../features/create-note/ui/createNote";
import { RouterProvider } from "react-router";
import router from "./routes/router";


const App: React.FC = (): React.JSX.Element => {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  )
}
export default App;
