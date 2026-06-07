import { useEffect, useMemo, useState } from "react";
import "./App.css";
import ConverterPage from "./home/ConverterPage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Blog from "./pages/blog/Blog.jsx";
import Disclaimer from "./pages/blog/Disclaimer.jsx";
import TermsCondition from "./pages/blog/TermsCondition.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";

const normalizePath = (pathname) => {
  if (!pathname || pathname === "/") {
    return "/";
  }

  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
};

const getCurrentPath = () => normalizePath(window.location.pathname);
const THEME_STORAGE_KEY = "convertnest-theme";

function App() {
  const [path, setPath] = useState(getCurrentPath);
  const [theme, setTheme] = useState(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

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
        return <About theme={theme} />;
      case "/privacy":
        return <PrivacyPolicy theme={theme} />;
      case "/contact":
        return <Contact theme={theme} />;
      case "/blog":
        return <Blog theme={theme} />;
      case "/disclaimer":
        return <Disclaimer theme={theme} />;
      case "/terms":
        return <TermsCondition theme={theme} />;
      default:
        return (
          <ConverterPage
            theme={theme}
            onToggleTheme={() =>
              setTheme((currentTheme) =>
                currentTheme === "light" ? "dark" : "light",
              )
            }
          />
        );
    }
  }, [path, theme]);

  return page;
}

export default App;
