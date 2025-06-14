import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import ProfilePage from "../../pages/Profile/ui/ProfilePage";
import { NoteEditor } from "../../pages/Note/ui/NotePage";
import HomePage from "../../pages/Home/ui/HomePage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "note/:id", element: <NoteEditor /> },
    ],
  },
]);

export default router;
