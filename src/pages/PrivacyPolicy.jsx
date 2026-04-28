import "./InfoPages.css";

function PrivacyPolicy() {
  return (
    <main className="info-page">
      <div className="info-shell">
        <header className="info-topbar">
          <div className="info-brand">
            <a href="/">ImageConvert Pro</a>
            <span>Media format conversion for modern teams</span>
          </div>
          <nav className="info-nav" aria-label="Page navigation">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/privacy" className="active">
              Privacy
            </a>
            <a href="/contact">Contact</a>
          </nav>
        </header>

        <section className="info-hero">
          <div>
            <p className="info-kicker">Privacy policy</p>
            <h1>
              Your files and personal information should be handled clearly.
            </h1>
            <p>
              This page explains the privacy expectations for ImageConvert Pro.
              Update the contact details and legal language here if you later
              connect the app to analytics, storage, or backend processing.
            </p>
          </div>

          <aside className="info-card" aria-label="Privacy summary">
            <div>
              <strong>File handling</strong>
              <span>
                Conversions currently happen in the browser session of the user.
              </span>
            </div>
            <div>
              <strong>Personal data</strong>
              <span>
                Basic contact details may be collected only when users reach out
                directly.
              </span>
            </div>
            <div>
              <strong>Future integrations</strong>
              <span>
                Add disclosures here before enabling analytics, cloud storage,
                or account features.
              </span>
            </div>
          </aside>
        </section>

        <section className="privacy-layout">
          <article className="privacy-card">
            <h2>What we collect</h2>
            <ul className="privacy-list">
              <li>Uploaded files are used only for the conversion workflow.</li>
              <li>
                Contact information is only provided when a user voluntarily
                sends a support request.
              </li>
              <li>
                Usage data should not be collected unless analytics tools are
                intentionally added to the app.
              </li>
            </ul>
          </article>

          <article className="privacy-card">
            <h2>How files are processed</h2>
            <p>
              The current converter processes supported image files inside the
              browser. That means files are not intended to be permanently
              stored by the application during normal use.
            </p>
          </article>
        </section>

        <section className="privacy-layout">
          <article className="privacy-card">
            <h2>How information is used</h2>
            <ul className="privacy-list">
              <li>To provide format conversion and related output controls.</li>
              <li>To respond to support questions or product feedback.</li>
              <li>
                To improve the service if users explicitly share bug reports or
                suggestions.
              </li>
            </ul>
          </article>

          <article className="privacy-card">
            <h2>Policy maintenance</h2>
            <p>
              If the app later adds accounts, email collection, payment flows,
              server uploads, or third-party advertising, this policy should be
              revised before those features go live.
            </p>
          </article>
        </section>

        <footer className="info-footer">
          For privacy questions, use the contact page.
        </footer>
      </div>
    </main>
  );
}

export default PrivacyPolicy;
