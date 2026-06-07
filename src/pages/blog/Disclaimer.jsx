import SiteHeader from "../../components/SiteHeader.jsx";
import "../InfoPages.css";
import "./css/Blog.css";

function Disclaimer({ theme = "light" }) {
  return (
    <main className={`info-page theme-${theme}`}>
      <div className="info-shell">
        <SiteHeader activePath="/disclaimer" />

        <article className="blog-container">
          <header className="blog-header">
            <h1>Disclaimer</h1>
            <p className="blog-meta">
              Important information about how you should use Convertnest and
              what limitations apply to the service.
            </p>
          </header>

          <section>
            <h2>General information</h2>
            <p>
              The information and tools provided on Convertnest are offered for
              general image conversion and optimization purposes. While we aim
              to deliver reliable results, we make no guarantees that every
              conversion will meet your specific quality, compatibility, or
              production requirements.
            </p>
          </section>

          <section>
            <h2>No professional advice</h2>
            <p>
              Content on this website, including blog articles and help
              material, is provided for informational purposes only. It does
              not constitute legal, design, or technical advice. You should
              evaluate output files independently before using them in
              commercial, legal, or mission-critical workflows.
            </p>
          </section>

          <section>
            <h2>Accuracy of results</h2>
            <p>
              Image conversion outcomes may vary depending on source file
              quality, browser capabilities, selected settings, and output
              format. Convertnest is not responsible for unexpected color
              shifts, compression artifacts, transparency issues, metadata
              loss, or file size differences that may occur during conversion.
            </p>
          </section>

          <section>
            <h2>User responsibility</h2>
            <ul>
              <li>You are responsible for the files you upload and convert.</li>
              <li>
                You must ensure you have the right to process and use any image
                you submit to the tool.
              </li>
              <li>
                You should keep backups of original files before applying
                compression, resizing, watermarking, or background removal.
              </li>
              <li>
                You are responsible for verifying converted files before
                publishing or distributing them.
              </li>
            </ul>
          </section>

          <section>
            <h2>External links</h2>
            <p>
              This website may contain links to third-party websites or
              resources. Convertnest does not control and is not responsible for
              the content, policies, or practices of any external site or
              service linked from this application.
            </p>
          </section>

          <section>
            <h2>Service availability</h2>
            <p>
              We may update, modify, suspend, or discontinue any part of the
              service at any time without prior notice. We are not liable for
              temporary unavailability, maintenance windows, browser
              incompatibilities, or interruptions caused by factors outside our
              reasonable control.
            </p>
          </section>

          <section>
            <h2>Limitation of liability</h2>
            <p>
              To the fullest extent permitted by applicable law, Convertnest and
              its operators shall not be liable for any direct, indirect,
              incidental, special, or consequential damages arising from your use
              of the website, including loss of data, loss of business, or
              inability to use converted files.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              If you have questions about this disclaimer, please visit our
              contact page for support information.
            </p>
            <a href="/contact" className="blog-cta">
              Contact us
            </a>
          </section>
        </article>

        <footer className="blog-footer">Last updated: June 7, 2026</footer>
      </div>
    </main>
  );
}

export default Disclaimer;
