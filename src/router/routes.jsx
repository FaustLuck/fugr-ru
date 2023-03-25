import App from "@p/App.jsx";
import Book from "@p/Book.jsx";

export const routes = [
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/:id",
    element: <Book/>
  }
];