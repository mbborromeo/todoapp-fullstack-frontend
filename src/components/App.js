import "./App.css";

import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

/* React routes */
const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Root element</div>,
  },
  {
    path: "/add",
    element: <div>Add component</div>,
  },
  {
    path: "/deleteall",
    element: <div>Delete All component</div>,
  },
  {
    path: "/search",
    element: <div>Search component</div>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
