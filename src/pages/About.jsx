import "./InfoPages.css";

const stats = [
  {
    title: "How to convert JPG to PNG",
    body: "Upload your JPG image, choose PNG as the output format, and click convert. PNG is ideal when you need lossless quality, transparent backgrounds, or clean graphics for websites, logos, and design assets.",
  },
  {
    title: "Best image formats explained",
    body: "JPG is best for photos and smaller file sizes, PNG is best for transparency and sharp graphics, WEBP offers strong web compression with good quality, AVIF provides modern high-efficiency output, and SVG is ideal for scalable vector visuals.",
  },
  {
    title: "Why use ImageConvert Pro",
    body: "ImageConvert Pro combines conversion, resize controls, compression tuning, watermarking, background cleanup, and orientation tools in one workflow so creators and teams can prepare production-ready images faster.",
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
              ImageConvert Pro helps you convert and optimize images for real
              web use.
            </h1>
            <p>
              This application is built for people who work with images every
              day and need practical output quickly. From JPG to PNG conversion
              to quality tuning and live previews, the goal is to reduce time
              between upload and final download while keeping output clean.
            </p>
          </div>

          <aside className="info-card" aria-label="About highlights">
            <div>
              <strong>Supported output</strong>
              <span>JPG, PNG, WEBP, SVG, and AVIF</span>
            </div>
            <div>
              <strong>Core tools</strong>
              <span>
                Resize, compression, watermark, background remover, rotate and
                mirror
              </span>
            </div>
            <div>
              <strong>Main benefit</strong>
              <p>
                Keep image conversion simple for creators, ecommerce teams,
                students, and agencies who need better format control without
                complex editing software.
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
            ImageConvert Pro is useful for bloggers, developers, marketers,
            ecommerce sellers, students, and content creators who frequently
            prepare product images, social posts, banners, and website assets.
            It is designed for quick results and consistent quality in
            day-to-day workflows.
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
