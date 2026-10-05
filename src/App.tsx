import { CoursesPage, MainApp } from "./pages";
import {
  AboutPage,
  OrganizationsPage,
  PricingPage,
  VerifyPage,
} from "./publicPages";

export default function App() {
  switch (window.location.pathname.replace(/\/+$/, "") || "/") {
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
      return <MainApp />;
  }
}
