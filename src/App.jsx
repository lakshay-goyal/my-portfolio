import HomePage from "./Pages/HomePage";
import ProjectPage from "./Components/ProjectPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Projects from './Components/Projects'
import BlogPage from './Pages/BlogPage'
import BlogDetailsPage from './Pages/BlogDetailsPage'
import BookshelfPage from './Pages/BookshelfPage'
import PaperShelfPage from './Pages/PaperShelfPage'
import NotFoundPage from './Pages/NotFoundPage';

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
  {
    path: "/blog",
    element: <BlogPage />
  },
  {
    path: "/blog/:slug",
    element: <BlogDetailsPage />
  },
  {
    path: "/bookshelf",
    element: <BookshelfPage />
  },
  {
    path: "/papershelf",
    element: <PaperShelfPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
