import "./InfoPages.css";

const stats = [
  {
    title: "Built for fast conversion",
    body: "Convert common media-ready image formats in a clean workflow with resize, quality, and watermark controls in one place.",
  },
  {
    title: "Focused on practical output",
    body: "The application is designed for creators, marketers, and web teams who need polished files for websites, campaigns, and content publishing.",
  },
  {
    title: "Simple by design",
    body: "Instead of a crowded editing interface, the product keeps the essentials visible so users can upload, convert, and download quickly.",
  },
];

function About() {
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
            <a href="/about" className="active">
              About
            </a>
            <a href="/privacy">Privacy</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>

        <section className="info-hero">
          <div>
            <p className="info-kicker">About the product</p>
            <h1>
              Built to make format conversion feel fast, clean, and reliable.
            </h1>
            <p>
              ImageConvert Pro helps users prepare visual media for delivery
              across websites, social channels, and internal workflows. The
              current experience focuses on image conversion while laying the
              foundation for a broader media toolkit.
            </p>
          </div>

          <aside className="info-card" aria-label="About highlights">
            <div>
              <strong>Supported output</strong>
              <span>JPG, PNG, WEBP, SVG, and AVIF</span>
            </div>
            <div>
              <strong>Core tools</strong>
              <span>Resize controls, compression tuning, and watermarking</span>
            </div>
            <div>
              <strong>Product goal</strong>
              <p>
                Reduce friction between upload and final delivery so teams can
                move from source asset to production-ready file without extra
                steps.
              </p>
            </div>
          </aside>
        </section>

        <section className="info-grid" aria-label="Product values">
          {stats.map((item) => (
            <article key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </section>

        <section className="contact-card">
          <h2>Who this application is for</h2>
          <p>
            This app is a good fit for small businesses, agencies, students,
            ecommerce teams, and creators who regularly need lighter, cleaner,
            or better-supported file formats. It is especially useful when speed
            matters more than advanced editing complexity.
          </p>
          <div className="contact-links">
            <a href="/">Start converting files</a>
            <a href="/contact" className="secondary">
              Get in touch
            </a>
          </div>
        </section>

        <footer className="info-footer">Powered by ImageConvert Pro</footer>
      </div>
    </main>
  );
}

export default About;
