import { createBrowserRouter } from "react-router-dom";
import App from "@p/App.jsx";
import Book from "@p/Book.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/:id",
    element: <Book/>
  }
]);

export default router;