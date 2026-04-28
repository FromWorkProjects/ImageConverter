import { useEffect, useMemo, useState } from "react";
import "./App.css";
import ConverterPage from "./home/ConverterPage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
};

const getCurrentPath = () => normalizePath(window.location.pathname);

function App() {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    const syncPath = () => setPath(getCurrentPath());

    window.addEventListener("popstate", syncPath);
    window.addEventListener("locationchange", syncPath);

    return () => {
      window.removeEventListener("popstate", syncPath);
      window.removeEventListener("locationchange", syncPath);
    };
  }, []);

  const page = useMemo(() => {
    switch (path) {
      case "/about":
        return <About />;
      case "/privacy":
        return <PrivacyPolicy />;
      case "/contact":
        return <Contact />;
      default:
        return <ConverterPage />;
    }
  }, [path]);

  return page;
}

export default App;
