import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loading from "./Components/Loading";
import { ThemeProvider } from "./Components/ThemeContext";

const HomePage = lazy(() => import("./Pages/HomePage"));
const AboutPage = lazy(() => import("./Pages/AboutPage"));
const ProjectPage = lazy(() => import("./Components/ProjectPage"));
const Projects = lazy(() => import("./Components/Projects"));
const BlogPage = lazy(() => import("./Pages/BlogPage"));
const BlogDetailsPage = lazy(() => import("./Pages/BlogDetailsPage"));
const BookshelfPage = lazy(() => import("./Pages/BookshelfPage"));
const NotFoundPage = lazy(() => import("./Pages/NotFoundPage"));

const withSuspense = (element) => <Suspense fallback={<Loading />}>{element}</Suspense>;

const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(<HomePage />)
  },
  {
    path: "/about",
    element: withSuspense(<AboutPage />)
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
    path: '*',
    element: withSuspense(<NotFoundPage />)
  }
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
