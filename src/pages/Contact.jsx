import "./InfoPages.css";

function Contact({ theme = "light" }) {
  return (
    <main className={`info-page theme-${theme}`}>
      <div className="info-shell">
        <header className="info-topbar">
          <div className="info-brand">
            <a href="/">Convertnest</a>
            <span>Media format conversion for modern teams</span>
          </div>
          <nav className="info-nav" aria-label="Page navigation">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/privacy">Privacy</a>
            <a href="/contact" className="active">
              Contact
            </a>
          </nav>
        </header>

        <section className="info-hero">
          <div>
            <p className="info-kicker">Contact</p>
            <h1>
              Questions, feedback, or partnership ideas are always welcome.
            </h1>
            <p>
              Use this page as the main contact hub for users who need support,
              want to report an issue, or want to discuss how the converter can
              better support their media workflow.
            </p>
          </div>

          <aside className="info-card" aria-label="Support overview">
            <div>
              <strong>Support topics</strong>
              <span>Conversion issues, feature requests, and general help</span>
            </div>
            <div>
              <strong>Typical replies</strong>
              <span>Update this section with your real response window</span>
            </div>
            <div>
              <strong>Best next step</strong>
              <span>
                Include your production email, form link, or business address
                before launch.
              </span>
            </div>
          </aside>
        </section>

        <section className="contact-layout">
          <article className="contact-card">
            <h2>Reach the team</h2>
            <p>
              Replace the placeholder details below with your real support and
              business contact information when you are ready to publish.
            </p>
            <div className="contact-links">
              <a href="mailto:support@convertnest.com">
                support@convertnest.com
              </a>
              <a
                href="mailto:partnerships@convertnest.com"
                className="secondary"
              >
                partnerships@convertnest.com
              </a>
            </div>
          </article>

          <article className="contact-card">
            <h2>What to include in a message</h2>
            <ul className="contact-list">
              <li>The source file type and desired output format</li>
              <li>Any conversion or download error you encountered</li>
              <li>The browser and device you were using</li>
              <li>A short note describing what you expected to happen</li>
            </ul>
          </article>
        </section>

        <section className="contact-card">
          <h2>Business and product enquiries</h2>
          <p>
            This section can also be used for affiliate requests, integration
            discussions, custom media workflow needs, or licensing enquiries if
            the app grows into a commercial product.
          </p>
          <div className="contact-links">
            <a href="/">Return to converter</a>
          </div>
        </section>

        <footer className="info-footer">
          Contact details on this page are placeholders and should be replaced
          before launch.
        </footer>
      </div>
    </main>
  );
}

export default Contact;
