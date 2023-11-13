import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./client/scenes/LoginPage";
import { AuthContextProvider } from "./ctx/auth/context";
import Home from "./client/scenes/Home";
import AuthRoute from "./client/components/AuthRoute";
import { ApiContextProvider } from "./ctx/api/context";
import { SearchContextProvider } from "./ctx/search/context";
import NoteEditor from "./client/scenes/NoteEditor";
import { NoteEditorContextProvider } from "./ctx/note-editor/context";
import { TagContextProvider } from "./ctx/tag-update/context";
import { Helmet } from "react-helmet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: (
      <AuthRoute>
        <SearchContextProvider>
          <Home />
        </SearchContextProvider>
      </AuthRoute>
    ),
  },
  {
    path: "/note/:noteId?",
    element: (
      <AuthRoute>
        <NoteEditorContextProvider>
          <NoteEditor />
        </NoteEditorContextProvider>
      </AuthRoute>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <AuthContextProvider>
    <ApiContextProvider>
      <TagContextProvider>
        <Helmet>
          <title>Notes</title>
        </Helmet>
        <RouterProvider router={router} />
      </TagContextProvider>
    </ApiContextProvider>
  </AuthContextProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
