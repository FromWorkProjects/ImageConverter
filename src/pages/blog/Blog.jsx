import SiteHeader from "../../components/SiteHeader.jsx";
import "../InfoPages.css";
import "./css/Blog.css";

function Blog({ theme = "light" }) {
  return (
    <main className={`info-page theme-${theme}`}>
      <div className="info-shell">
        <SiteHeader activePath="/blog" />

        <article className="blog-container">
          <header className="blog-header">
            <h1>Complete Guide to Media Conversion (Images)</h1>
            <p className="blog-meta">
              Learn how to convert, optimize, and choose the right image formats
              for web and professional use.
            </p>
          </header>

          <section>
            <h2>What is Media Conversion?</h2>
            <p>
              Media conversion refers to the process of changing a file from one
              format to another. In the case of images, it involves converting
              formats like JPG, PNG, WEBP, SVG, and AVIF depending on your needs.
            </p>
            <p>
              Different formats serve different purposes. Choosing the right
              format can improve performance, reduce file size, and maintain image
              quality.
            </p>
          </section>

          <section>
            <h2>Why Image Conversion is Important</h2>
            <ul>
              <li>Reduce website loading time</li>
              <li>Improve SEO rankings</li>
              <li>Optimize images for mobile devices</li>
              <li>Maintain quality while reducing file size</li>
            </ul>
          </section>

          <section>
            <h2>Popular Image Formats Explained</h2>

            <h3>JPG (JPEG)</h3>
            <p>
              Best for photographs and realistic images. It offers high
              compression but may lose some quality.
            </p>

            <h3>PNG</h3>
            <p>
              Supports transparency and is ideal for logos, icons, and graphics.
            </p>

            <h3>WEBP</h3>
            <p>
              A modern format that provides better compression than JPG and PNG
              while maintaining high quality.
            </p>

            <h3>SVG</h3>
            <p>
              Vector-based format used for icons and scalable graphics without
              losing quality.
            </p>

            <h3>AVIF</h3>
            <p>
              Next-generation format with excellent compression and quality, ideal
              for modern web applications.
            </p>
          </section>

          <section>
            <h2>How to Convert Images Using Convertnest</h2>
            <ol>
              <li>Upload your image</li>
              <li>Select output format</li>
              <li>Adjust quality and size</li>
              <li>Apply watermark or background removal (optional)</li>
              <li>Click convert and download</li>
            </ol>
          </section>

          <section>
            <h2>Tips for Better Image Optimization</h2>
            <ul>
              <li>Use WEBP for websites to reduce loading time</li>
              <li>Keep JPG quality between 70–85%</li>
              <li>Resize large images before uploading</li>
              <li>Avoid unnecessary transparency</li>
            </ul>
          </section>

          <section>
            <h2>Is Online Image Conversion Safe?</h2>
            <p>
              Yes, if the tool processes files locally in your browser.
              Convertnest ensures that your files are not uploaded to any server,
              making it a secure option for image processing.
            </p>
          </section>

          <section>
            <h2>Start Converting Your Images</h2>
            <p>
              Ready to optimize your images? Use our free tool to convert and
              enhance your files instantly.
            </p>
            <a href="/" className="blog-cta">
              Go to Image Converter
            </a>
          </section>
        </article>
      </div>
    </main>
  );
}

export default Blog;
