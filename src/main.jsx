import './index.css'
import ErrorPage from './routes/PageNotFound.jsx'
import MainPage from './routes/MainPage.jsx'
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />, // Focus here
    errorElement: <ErrorPage />, // Focus here
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
