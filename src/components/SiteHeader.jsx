import "./SiteHeader.css";

const NAV_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms Conditions" },
  { href: "/blog", label: "Blog" },
  { href: "/disclaimer", label: "Disclaimer" },
];

function ThemeIcon({ theme }) {
  if (theme === "dark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 3a1 1 0 0 1 1 1v1.07A7.002 7.002 0 0 1 19.93 11H21a1 1 0 1 1 0 2h-1.07A7.002 7.002 0 0 1 13 19.93V21a1 1 0 1 1-2 0v-1.07A7.002 7.002 0 0 1 4.07 13H3a1 1 0 1 1 0-2h1.07A7.002 7.002 0 0 1 11 4.07V4a1 1 0 0 1 1-1Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1.07A7.002 7.002 0 0 1 4.07 15H3a1 1 0 1 1 0-2h1.07A7.002 7.002 0 0 1 11 5.07V4a1 1 0 0 1 2 0v1.07A7.002 7.002 0 0 1 19.93 13H21a1 1 0 1 1 0 2h-1.07A7.002 7.002 0 0 1 13 19.93V21a1 1 0 0 1-1 1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SiteHeader({
  activePath = "",
  theme = "light",
  onToggleTheme,
  showThemeToggle = false,
}) {
  return (
    <header className="site-header">
      <div className="site-brand">
        <a href="/" className="site-brand-link">
          <img
            src="/logo.png"
            alt=""
            className="site-brand-logo"
            aria-hidden="true"
          />
          <span className="site-brand-name">CONVERTNEST</span>
        </a>
        <span className="site-brand-tag">
          Professional image tools for web teams
        </span>
      </div>

      <nav className="site-nav" aria-label="Main navigation">
        <ul className="site-nav-links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className={activePath === href ? "active" : undefined}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {showThemeToggle && onToggleTheme ? (
        <button
          type="button"
          className="site-theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <ThemeIcon theme={theme} />
          <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </button>
      ) : null}
    </header>
  );
}

export default SiteHeader;
