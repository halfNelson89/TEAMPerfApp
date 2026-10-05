import { CoursesPage, MainApp } from "./pages";
import {
  AboutPage,
  OrganizationsPage,
  PricingPage,
  VerifyPage,
} from "./publicPages";
import { AdminPortal } from "./adminPortal";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path.startsWith("/portal/admin")) {
    return <AdminPortal path={path} />;
  }
  switch (path) {
    case "/portal":
      return (
        <MainApp
          initialView="portal"
          initialRole={new URLSearchParams(window.location.search).get("role") === "coach" ? "coach" : "parent"}
        />
      );
    case "/courses":
    case "/Learn":
      return <CoursesPage />;
    case "/organizations":
      return <OrganizationsPage />;
    case "/pricing":
      return <PricingPage />;
    case "/about":
      return <AboutPage />;
    case "/verify":
      return <VerifyPage />;
    default:
      return <MainApp initialView="home" />;
  }
}
