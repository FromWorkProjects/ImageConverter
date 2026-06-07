import SiteHeader from "../components/SiteHeader.jsx";
import "./InfoPages.css";

function PrivacyPolicy({ theme = "light" }) {
  return (
    <main className={`info-page theme-${theme}`}>
      <div className="info-shell">
        <SiteHeader activePath="/privacy" />

        <section className="info-hero">
          <div>
            <p className="info-kicker">Privacy policy</p>
            <h1>Your privacy matters at Convertnest.</h1>
            <p>
              This Privacy Policy explains what information is processed when
              you use Convertnest, how we use it, and what choices you have. By
              using the service, you agree to this policy.
            </p>
          </div>

          <aside className="info-card" aria-label="Privacy summary">
            <div>
              <strong>File handling</strong>
              <span>
                Image conversions are processed in your browser session.
              </span>
            </div>
            <div>
              <strong>Uploaded images</strong>
              <span>
                We do not intentionally store uploaded images on our servers for
                normal converter use.
              </span>
            </div>
            <div>
              <strong>Contact data</strong>
              <span>
                If you contact us, we only use your details to respond and
                support your request.
              </span>
            </div>
          </aside>
        </section>

        <section className="privacy-layout">
          <article className="privacy-card">
            <h2>1. Information we process</h2>
            <ul className="privacy-list">
              <li>
                Image files you upload are processed to provide conversion and
                editing features such as resize, quality, watermark, rotate, and
                background removal.
              </li>
              <li>
                Basic technical information may be collected automatically by
                your browser or hosting provider (for example IP address, device
                type, browser version, and timestamps) for security and
                reliability.
              </li>
              <li>
                If you submit a support query, we may process your name, email
                address, and the message content you provide.
              </li>
            </ul>
          </article>

          <article className="privacy-card">
            <h2>2. How your information is used</h2>
            <ul className="privacy-list">
              <li>To deliver image conversion and optimization features.</li>
              <li>
                To maintain service performance, availability, and security.
              </li>
              <li>To answer support requests and improve user experience.</li>
              <li>To comply with legal obligations when required by law.</li>
            </ul>
          </article>
        </section>

        <section className="privacy-layout">
          <article className="privacy-card">
            <h2>3. How image files are handled</h2>
            <p>
              Convertnest is designed so that file processing happens inside the
              browser during your active session. Converted files are generated
              for download and are not intended to be permanently stored by us
              as part of normal operation.
            </p>
          </article>
          <article className="privacy-card">
            <h2>4. Cookies, ads, and analytics</h2>
            <p>
              We may use cookies or similar technologies for essential site
              behavior, ad delivery, and measurement. Advertising partners such
              as Google AdSense may use cookies to personalize ads based on your
              visit and other websites. You can manage cookie preferences in
              your browser settings.
            </p>
          </article>
        </section>

        <section className="privacy-layout">
          <article className="privacy-card">
            <h2>5. Data sharing</h2>
            <p>
              We do not sell your personal information. We may share limited
              data with trusted service providers (for hosting, security,
              analytics, or advertising) only as needed to operate the service
              and subject to applicable legal requirements.
            </p>
          </article>
          <article className="privacy-card">
            <h2>6. Data retention</h2>
            <p>
              We retain personal data only for as long as necessary to provide
              services, resolve disputes, enforce agreements, and meet legal
              obligations. Support emails and related records may be retained
              for operational and compliance purposes.
            </p>
          </article>
        </section>

        <section className="privacy-layout">
          <article className="privacy-card">
            <h2>7. Your rights</h2>
            <p>
              Depending on your location, you may have rights to access,
              correct, or delete personal information, object to certain
              processing, or request data portability. To make a request,
              contact us through the Contact page.
            </p>
          </article>
          <article className="privacy-card">
            <h2>8. Children&apos;s privacy</h2>
            <p>
              Convertnest is not intended for children under 13. We do not
              knowingly collect personal data from children. If you believe a
              child provided personal information, please contact us so we can
              take appropriate action.
            </p>
          </article>
        </section>

        <section className="privacy-layout">
          <article className="privacy-card">
            <h2>9. Changes to this policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we do,
              we will update this page and revise the effective date below.
              Continued use of the service after updates means you accept the
              revised policy.
            </p>
          </article>
          <article className="privacy-card">
            <h2>10. Contact us</h2>
            <p>
              For privacy-related questions or requests, please use the Contact
              page in this application. We recommend adding your official
              support email and business address before production launch.
            </p>
          </article>
        </section>

        <footer className="info-footer">Effective date: April 30, 2026</footer>
      </div>
    </main>
  );
}

export default PrivacyPolicy;
