import SiteHeader from "../../components/SiteHeader.jsx";
import "../InfoPages.css";
import "./css/Blog.css";

function TermsCondition({ theme = "light" }) {
  return (
    <main className={`info-page theme-${theme}`}>
      <div className="info-shell">
        <SiteHeader activePath="/terms" />

        <article className="blog-container">
          <header className="blog-header">
            <h1>Terms and Conditions</h1>
            <p className="blog-meta">
              Please read these terms carefully before using Convertnest. By
              accessing or using the service, you agree to be bound by these
              terms.
            </p>
          </header>

          <section>
            <h2>1. Acceptance of terms</h2>
            <p>
              By using Convertnest, you confirm that you have read, understood,
              and agree to these Terms and Conditions. If you do not agree, you
              should not use the website or its tools.
            </p>
          </section>

          <section>
            <h2>2. Description of service</h2>
            <p>
              Convertnest provides online image conversion and optimization
              features such as format conversion, resizing, compression,
              watermarking, rotation, mirroring, and background cleanup. The
              service is intended for lawful personal and professional use.
            </p>
          </section>

          <section>
            <h2>3. User obligations</h2>
            <ul>
              <li>You must use the service only for lawful purposes.</li>
              <li>
                You must not upload content that infringes copyright,
                trademarks, privacy rights, or other legal rights.
              </li>
              <li>
                You must not attempt to disrupt, reverse engineer, or misuse
                the website or its functionality.
              </li>
              <li>
                You are responsible for maintaining backups of your original
                files and reviewing all converted output.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Intellectual property</h2>
            <p>
              You retain ownership of the images you upload and convert. You
              represent that you have the necessary rights to process those
              files. The Convertnest name, branding, interface, and site content
              remain the property of the service operator unless otherwise
              stated.
            </p>
          </section>

          <section>
            <h2>5. Privacy and data handling</h2>
            <p>
              Your use of the service is also governed by our Privacy Policy.
              Convertnest is designed to process images in the browser during
              your active session. Please review the Privacy Policy to
              understand how information may be handled.
            </p>
          </section>

          <section>
            <h2>6. Availability and changes</h2>
            <p>
              We may update features, limits, or supported formats at any time.
              We may also modify these terms by posting an updated version on
              this page. Continued use of the service after changes are posted
              constitutes acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2>7. Disclaimer of warranties</h2>
            <p>
              The service is provided on an &quot;as is&quot; and &quot;as
              available&quot; basis without warranties of any kind, whether
              express or implied, including fitness for a particular purpose,
              uninterrupted operation, or error-free conversion results.
            </p>
          </section>

          <section>
            <h2>8. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, Convertnest shall not be
              liable for any damages arising from your use of the service,
              including loss of files, business interruption, or reliance on
              converted output.
            </p>
          </section>

          <section>
            <h2>9. Termination</h2>
            <p>
              We reserve the right to restrict or terminate access to the
              service if we believe a user has violated these terms or engaged
              in abusive or unlawful behavior.
            </p>
          </section>

          <section>
            <h2>10. Contact information</h2>
            <p>
              For questions about these Terms and Conditions, please contact us
              through the Contact page.
            </p>
            <a href="/contact" className="blog-cta">
              Contact us
            </a>
          </section>
        </article>

        <footer className="blog-footer">Effective date: June 7, 2026</footer>
      </div>
    </main>
  );
}

export default TermsCondition;
