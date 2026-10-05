import { createBrowserRouter } from "react-router";
import { CoursesPage, MainApp } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainApp,
  },
  {
    path: "/courses",
    Component: CoursesPage,
  },
  {
    path: "/Learn",
    Component: CoursesPage,
  },
]);
