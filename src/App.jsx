import { useState } from "react";
import HomePage from "./Pages/HomePage";
import ProjectPage from "./Components/ProjectPage";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { useNavigate, Routes, Route } from 'react-router-dom';
import Projects from './Components/Projects'

function App() {


  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/projects",
      element: <Projects />
    },
    {
      path: "/projects/:category",
      element: <ProjectPage />
    },
  ]);

  return (
    <>
    {/* <h1>Hello</h1> */}
    <RouterProvider router={router} />
    </>
  );
}

export default App;
