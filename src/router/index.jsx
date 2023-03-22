import { createBrowserRouter } from "react-router-dom";
import App from "@c/App.jsx";
import BookInfo from "@c/BookInfo/BookInfo.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/:id",
    element: <BookInfo/>
  }
]);

export default router;