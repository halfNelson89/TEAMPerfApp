import { CoursesPage, MainApp } from "./pages";
import {
  AboutPage,
  OrganizationsPage,
  PricingPage,
  VerifyPage,
} from "./publicPages";
import { AdminPortal } from "./adminPortal";
import {
  AccountPage,
  JoinPage,
  SignInPage,
  WelcomePage,
} from "./authPages";
import { StaffEmailsPage, StaffPage } from "./staffPages";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path.startsWith("/portal/admin")) {
    return <AdminPortal path={path} />;
  }
  if (path === "/portal/account") {
    return <AccountPage />;
  }
  if (path.startsWith("/join/")) {
    return <JoinPage code={decodeURIComponent(path.slice("/join/".length))} />;
  }
  if (path === "/staff/emails") {
    return <StaffEmailsPage />;
  }
  if (path === "/staff") {
    return <StaffPage />;
  }
  switch (path) {
    case "/portal":
      return (
        <MainApp
          initialView="portal"
          initialRole={new URLSearchParams(window.location.search).get("role") === "coach" ? "coach" : "parent"}
          initialPage={new URLSearchParams(window.location.search).get("screen") === "learn" ? "learn" : "overview"}
        />
      );
    case "/sign-in":
      return <SignInPage />;
    case "/welcome":
      return <WelcomePage />;
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
