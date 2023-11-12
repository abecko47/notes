import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import LoginPage from "./client/scenes/LoginPage";
import {AuthContextProvider} from "./ctx/auth/context";
import Home from "./client/scenes/Home";
import AuthRoute from "./client/components/AuthRoute";
import {ApiContextProvider} from "./ctx/api/context";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/home",
        element: <AuthRoute><Home /></AuthRoute>,
    },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <AuthContextProvider>
          <ApiContextProvider>
            <RouterProvider router={router} />
          </ApiContextProvider>
      </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
