import HomePage from "./Pages/HomePage";
import ProjectPage from "./Components/ProjectPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Projects from './Components/Projects'

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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
