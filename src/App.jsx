import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./Components/Loading";

const HomePage = lazy(() => import("./Pages/HomePage"));
const ProjectPage = lazy(() => import("./Components/ProjectPage"));
const Projects = lazy(() => import("./Components/Projects"));
const BlogPage = lazy(() => import("./Pages/BlogPage"));
const BlogDetailsPage = lazy(() => import("./Pages/BlogDetailsPage"));
const BookshelfPage = lazy(() => import("./Pages/BookshelfPage"));
const PaperShelfPage = lazy(() => import("./Pages/PaperShelfPage"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));

const withSuspense = (element) => <Suspense fallback={<Loading />}>{element}</Suspense>;

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<HomePage />)
  },
  {
    path: "/projects",
    element: withSuspense(<Projects />)
  },
  {
    path: "/projects/:category",
    element: withSuspense(<ProjectPage />)
  },
  {
    path: "/blog",
    element: withSuspense(<BlogPage />)
  },
  {
    path: "/blog/:slug",
    element: withSuspense(<BlogDetailsPage />)
  },
  {
    path: "/bookshelf",
    element: withSuspense(<BookshelfPage />)
  },
  {
    path: "/papershelf",
    element: withSuspense(<PaperShelfPage />)
  },
  {
    path: '*',
    element: withSuspense(<NotFoundPage />)
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
