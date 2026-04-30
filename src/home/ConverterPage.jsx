import { useEffect, useRef, useState } from "react";
import "./css/ConverterPage.css";

const MIME_BY_FORMAT = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  svg: "image/svg+xml",
  avif: "image/avif",
};

const normalizeFormat = (value) => {
  if (!value) {
    return "png";
  }

  const format = value.toLowerCase().replace("image/", "");
  if (format === "jpeg") {
    return "jpg";
  }

  return MIME_BY_FORMAT[format] ? format : "png";
};

const detectFileFormat = (file) => {
  const fromType = normalizeFormat(file.type);
  if (fromType !== "png" || file.type) {
    return fromType;
  }

  const extension = file.name.split(".").pop();
  return normalizeFormat(extension);
};

const loadImageFromUrl = (src) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to load selected image."));
    image.src = src;
  });

const canvasToBlob = (canvas, mimeType, qualityValue) =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(
            new Error("Your browser could not generate the converted file."),
          );
          return;
        }

        resolve(blob);
      },
      mimeType,
      qualityValue,
    );
  });

const removeLightBackground = (context, width, height, sensitivity) => {
  const imageData = context.getImageData(0, 0, width, height);
  const { data } = imageData;
  const threshold = 210 - Math.round((sensitivity / 100) * 80);

  for (let index = 0; index < data.length; index += 4) {
    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const alpha = data[index + 3];

    if (alpha === 0) {
      continue;
    }

    const maxChannel = Math.max(red, green, blue);
    const minChannel = Math.min(red, green, blue);
    const isNeutralTone = maxChannel - minChannel <= 32;
    const brightness = 0.2126 * red + 0.7152 * green + 0.0722 * blue;

    if (isNeutralTone && brightness >= threshold) {
      const fadeStrength = Math.min(1, (brightness - threshold + 18) / 70);
      data[index + 3] = Math.round(alpha * (1 - fadeStrength));
    }
  }

  context.putImageData(imageData, 0, 0);
};

const rotateAndMirrorCanvas = (sourceCanvas, rotation, mirrorEnabled) => {
  if (rotation === 0 && !mirrorEnabled) {
    return sourceCanvas;
  }

  const radians = (rotation * Math.PI) / 180;
  const swapAxis = Math.abs(rotation) % 180 === 90;
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = swapAxis ? sourceCanvas.height : sourceCanvas.width;
  outputCanvas.height = swapAxis ? sourceCanvas.width : sourceCanvas.height;

  const outputContext = outputCanvas.getContext("2d");
  if (!outputContext) {
    throw new Error("Canvas transformation is not available in this browser.");
  }

  outputContext.translate(outputCanvas.width / 2, outputCanvas.height / 2);
  outputContext.rotate(radians);
  outputContext.scale(mirrorEnabled ? -1 : 1, 1);
  outputContext.drawImage(
    sourceCanvas,
    -sourceCanvas.width / 2,
    -sourceCanvas.height / 2,
  );

  return outputCanvas;
};

const drawWatermark = (context, width, height, watermarkText) => {
  const fontSize = Math.max(18, Math.round(width * 0.035));
  context.save();
  context.font = `600 ${fontSize}px system-ui`;
  context.textAlign = "right";
  context.fillStyle = "rgba(255, 255, 255, 0.78)";
  context.strokeStyle = "rgba(17, 24, 39, 0.3)";
  context.lineWidth = 3;
  context.strokeText(watermarkText, width - 24, height - 24);
  context.fillText(watermarkText, width - 24, height - 24);
  context.restore();
};

const buildSvgBlob = ({ href, width, height, watermarkText }) => {
  const escapedText = watermarkText
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  const svgMarkup = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <image href="${href}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" />
  ${
    watermarkText
      ? `<text x="${width - 24}" y="${height - 24}" text-anchor="end" font-family="system-ui" font-size="${Math.max(
          18,
          Math.round(width * 0.035),
        )}" font-weight="600" fill="rgba(255,255,255,0.78)">${escapedText}</text>`
      : ""
  }
</svg>`;

  return new Blob([svgMarkup], { type: MIME_BY_FORMAT.svg });
};

const ThemeIcon = ({ theme }) => {
  if (theme === "dark") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="theme-icon"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7.2 7.2 0 0 0 9.8 9.8Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className="theme-icon"
    >
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 1.8v3.1M12 19.1v3.1M22.2 12h-3.1M4.9 12H1.8M19.2 4.8l-2.2 2.2M7 17l-2.2 2.2M19.2 19.2 17 17M7 7 4.8 4.8" />
    </svg>
  );
};

const ConverterPage = ({ theme = "light", onToggleTheme }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState("");
  const [backgroundPreviewUrl, setBackgroundPreviewUrl] = useState("");
  const [transformPreviewUrl, setTransformPreviewUrl] = useState("");
  const [combinedPreviewUrl, setCombinedPreviewUrl] = useState("");
  const [detectedFormat, setDetectedFormat] = useState("auto");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [convertProgress, setConvertProgress] = useState(0);
  const [isConverting, setIsConverting] = useState(false);
  const [fromFormat, setFromFormat] = useState("auto");
  const [toFormat, setToFormat] = useState("png");
  const [resizeWidth, setResizeWidth] = useState(1920);
  const [resizeHeight, setResizeHeight] = useState(1080);
  const [quality, setQuality] = useState(85);
  const [addWatermark, setAddWatermark] = useState(false);
  const [watermarkText, setWatermarkText] = useState("Convertnest");
  const [removeBackground, setRemoveBackground] = useState(false);
  const [backgroundSensitivity, setBackgroundSensitivity] = useState(55);
  const [rotation, setRotation] = useState(0);
  const [mirrorHorizontal, setMirrorHorizontal] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [downloadName, setDownloadName] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }
      if (selectedPreviewUrl) {
        URL.revokeObjectURL(selectedPreviewUrl);
      }
      if (backgroundPreviewUrl) {
        URL.revokeObjectURL(backgroundPreviewUrl);
      }
      if (transformPreviewUrl) {
        URL.revokeObjectURL(transformPreviewUrl);
      }
      if (combinedPreviewUrl) {
        URL.revokeObjectURL(combinedPreviewUrl);
      }
    };
  }, [
    downloadUrl,
    selectedPreviewUrl,
    backgroundPreviewUrl,
    transformPreviewUrl,
    combinedPreviewUrl,
  ]);

  useEffect(() => {
    if (!selectedFile) {
      if (backgroundPreviewUrl) {
        URL.revokeObjectURL(backgroundPreviewUrl);
        setBackgroundPreviewUrl("");
      }
      if (transformPreviewUrl) {
        URL.revokeObjectURL(transformPreviewUrl);
        setTransformPreviewUrl("");
      }
      if (combinedPreviewUrl) {
        URL.revokeObjectURL(combinedPreviewUrl);
        setCombinedPreviewUrl("");
      }
      return;
    }

    let isCancelled = false;
    let sourceImageUrl = "";

    const generateLivePreviews = async () => {
      try {
        sourceImageUrl = URL.createObjectURL(selectedFile);
        const image = await loadImageFromUrl(sourceImageUrl);
        const width = Math.max(1, Number(resizeWidth) || image.width);
        const height = Math.max(1, Number(resizeHeight) || image.height);

        const baseCanvas = document.createElement("canvas");
        baseCanvas.width = width;
        baseCanvas.height = height;
        const baseContext = baseCanvas.getContext("2d");

        if (!baseContext) {
          return;
        }

        baseContext.clearRect(0, 0, width, height);
        baseContext.drawImage(image, 0, 0, width, height);

        const bgCanvas = document.createElement("canvas");
        bgCanvas.width = width;
        bgCanvas.height = height;
        const bgContext = bgCanvas.getContext("2d");
        if (!bgContext) {
          return;
        }
        bgContext.clearRect(0, 0, width, height);
        bgContext.drawImage(baseCanvas, 0, 0);
        if (removeBackground) {
          removeLightBackground(
            bgContext,
            width,
            height,
            backgroundSensitivity,
          );
        }

        const transformCanvas = rotateAndMirrorCanvas(
          baseCanvas,
          rotation,
          mirrorHorizontal,
        );
        const combinedCanvas = rotateAndMirrorCanvas(
          bgCanvas,
          rotation,
          mirrorHorizontal,
        );

        const [bgBlob, transformBlob, combinedBlob] = await Promise.all([
          canvasToBlob(bgCanvas, MIME_BY_FORMAT.png),
          canvasToBlob(transformCanvas, MIME_BY_FORMAT.png),
          canvasToBlob(combinedCanvas, MIME_BY_FORMAT.png),
        ]);

        if (isCancelled) {
          return;
        }

        const nextBackgroundUrl = URL.createObjectURL(bgBlob);
        const nextTransformUrl = URL.createObjectURL(transformBlob);
        const nextCombinedUrl = URL.createObjectURL(combinedBlob);

        setBackgroundPreviewUrl((previousUrl) => {
          if (previousUrl) {
            URL.revokeObjectURL(previousUrl);
          }
          return nextBackgroundUrl;
        });
        setTransformPreviewUrl((previousUrl) => {
          if (previousUrl) {
            URL.revokeObjectURL(previousUrl);
          }
          return nextTransformUrl;
        });
        setCombinedPreviewUrl((previousUrl) => {
          if (previousUrl) {
            URL.revokeObjectURL(previousUrl);
          }
          return nextCombinedUrl;
        });
      } catch {
        // Keep existing previews if real-time generation fails.
      } finally {
        if (sourceImageUrl) {
          URL.revokeObjectURL(sourceImageUrl);
        }
      }
    };

    generateLivePreviews();

    return () => {
      isCancelled = true;
      if (sourceImageUrl) {
        URL.revokeObjectURL(sourceImageUrl);
      }
    };
  }, [
    selectedFile,
    resizeWidth,
    resizeHeight,
    removeBackground,
    backgroundSensitivity,
    rotation,
    mirrorHorizontal,
  ]);

  const simulateProgress = (setter, onStart, onDone) => {
    onStart();
    setter(0);

    let progressValue = 0;
    const interval = setInterval(() => {
      const step = Math.floor(Math.random() * 16) + 8;
      progressValue = Math.min(progressValue + step, 100);
      setter(progressValue);

      if (progressValue >= 100) {
        clearInterval(interval);
        onDone();
      }
    }, 250);
  };

  const handleChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
    }
    if (selectedPreviewUrl) {
      URL.revokeObjectURL(selectedPreviewUrl);
    }
    if (backgroundPreviewUrl) {
      URL.revokeObjectURL(backgroundPreviewUrl);
      setBackgroundPreviewUrl("");
    }
    if (transformPreviewUrl) {
      URL.revokeObjectURL(transformPreviewUrl);
      setTransformPreviewUrl("");
    }
    if (combinedPreviewUrl) {
      URL.revokeObjectURL(combinedPreviewUrl);
      setCombinedPreviewUrl("");
    }

    setSelectedFile(file);
    setSelectedPreviewUrl(URL.createObjectURL(file));
    setDetectedFormat(detectFileFormat(file));
    setDownloadUrl("");
    setDownloadName("");
    setConvertProgress(0);
    setStatusMessage("File selected. Ready for conversion.");
    setErrorMessage("");
    simulateProgress(
      setUploadProgress,
      () => setIsUploading(true),
      () => setIsUploading(false),
    );
  };

  const handleConvert = async () => {
    if (!selectedFile || isConverting || isUploading) {
      return;
    }

    const sourceFormat = fromFormat === "auto" ? detectedFormat : fromFormat;
    const targetFormat = normalizeFormat(toFormat);
    const qualityValue = Math.min(Math.max(quality, 30), 100) / 100;

    setIsConverting(true);
    setConvertProgress(10);
    setStatusMessage("Preparing image for conversion...");
    setErrorMessage("");

    let imageUrl = "";

    try {
      imageUrl = URL.createObjectURL(selectedFile);
      const image = await loadImageFromUrl(imageUrl);

      setConvertProgress(32);
      setStatusMessage("Applying selected options...");

      const width = Math.max(1, Number(resizeWidth) || image.width);
      const height = Math.max(1, Number(resizeHeight) || image.height);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Canvas is not available in this browser.");
      }

      if (targetFormat === "jpg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, width, height);
      } else {
        context.clearRect(0, 0, width, height);
      }

      context.drawImage(image, 0, 0, width, height);
      setConvertProgress(58);

      if (removeBackground) {
        removeLightBackground(context, width, height, backgroundSensitivity);
      }

      const transformedCanvas = rotateAndMirrorCanvas(
        canvas,
        rotation,
        mirrorHorizontal,
      );
      const outputContext = transformedCanvas.getContext("2d");
      if (!outputContext) {
        throw new Error("Output canvas is not available in this browser.");
      }

      if (addWatermark && watermarkText.trim()) {
        drawWatermark(
          outputContext,
          transformedCanvas.width,
          transformedCanvas.height,
          watermarkText.trim(),
        );
      }

      let convertedBlob;
      if (targetFormat === "svg") {
        setConvertProgress(78);
        convertedBlob = buildSvgBlob({
          href: transformedCanvas.toDataURL("image/png"),
          width: transformedCanvas.width,
          height: transformedCanvas.height,
          watermarkText: addWatermark ? watermarkText.trim() : "",
        });
      } else {
        setConvertProgress(78);
        convertedBlob = await canvasToBlob(
          transformedCanvas,
          MIME_BY_FORMAT[targetFormat],
          targetFormat === "png" || targetFormat === "svg"
            ? undefined
            : qualityValue,
        );
      }

      if (downloadUrl) {
        URL.revokeObjectURL(downloadUrl);
      }

      const nextUrl = URL.createObjectURL(convertedBlob);
      const baseName =
        selectedFile.name.replace(/\.[^.]+$/, "") || "converted-image";

      setDownloadUrl(nextUrl);
      setDownloadName(`${baseName}.${targetFormat}`);
      setConvertProgress(100);
      setStatusMessage(
        `Converted ${sourceFormat.toUpperCase()} to ${targetFormat.toUpperCase()} successfully.`,
      );
    } catch (error) {
      setConvertProgress(0);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Conversion failed unexpectedly.",
      );
      setStatusMessage("");
    } finally {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      setIsConverting(false);
    }
  };

  return (
    <main className={`converter-page theme-${theme}`}>
      <header className="top-menu">
        <div className="brand-block">
          <div className="brand">Convertnest</div>
          <span className="brand-tag">
            Professional image tools for web teams
          </span>
        </div>
        <nav aria-label="Main navigation">
          <ul className="menu-links">
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <ThemeIcon theme={theme} />
          <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
        </button>
      </header>

      <section className="hero-content">
        <div>
          <p className="kicker">Fast and reliable image conversion</p>
          <h1>Convert, optimize, and prepare images with a cleaner workflow</h1>
          <p className="hero-copy">
            Upload your image, choose a format, adjust output settings, and get
            polished results with a professional tool experience.
          </p>
        </div>
        <div className="hero-panel">
          <div className="hero-stat">
            <strong>Formats</strong>
            <span>JPG, PNG, WEBP, SVG, AVIF</span>
          </div>
          <div className="hero-stat">
            <strong>Utilities</strong>
            <span>Resize, compression, watermark</span>
          </div>
          <div className="hero-stat">
            <strong>Status</strong>
            <span>Live upload and conversion progress</span>
          </div>
        </div>
      </section>

      <section className="converter-card" aria-label="Image converter tools">
        <div className="dropzone">
          <p>{selectedFile ? selectedFile.name : "Drop image here or"}</p>
          {selectedFile && (
            <small className="file-meta">
              Detected format: {detectedFormat.toUpperCase()}
            </small>
          )}
          <button type="button" onClick={handleChooseFile}>
            {selectedFile ? "Choose Another File" : "Choose File"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden-input"
            onChange={handleFileChange}
          />
        </div>

        <section className="adsense-slot" aria-label="Advertisement section">
          <p>AdSense Space</p>
          <small>Place your Google AdSense script/banner here.</small>
        </section>

        <div className="controls-row">
          <label className="field">
            <span>Convert from</span>
            <select
              value={fromFormat}
              onChange={(event) => setFromFormat(event.target.value)}
            >
              <option value="auto">Auto Detect</option>
              <option value="jpg">JPG</option>
              <option value="png">PNG</option>
              <option value="webp">WEBP</option>
              <option value="svg">SVG</option>
            </select>
          </label>

          <label className="field">
            <span>Convert to</span>
            <select
              value={toFormat}
              onChange={(event) => setToFormat(event.target.value)}
            >
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="webp">WEBP</option>
              <option value="svg">SVG</option>
              <option value="avif">AVIF</option>
            </select>
          </label>
        </div>

        <div className="progress-blocks">
          <div className="progress-row">
            <div className="progress-label">
              <span>Upload Progress</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            {!selectedFile && (
              <small className="hint">Select an image to start upload.</small>
            )}
            {isUploading && (
              <small className="hint">Uploading image file...</small>
            )}
          </div>

          <div className="progress-row">
            <div className="progress-label">
              <span>Conversion Progress</span>
              <span>{convertProgress}%</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill conversion"
                style={{ width: `${convertProgress}%` }}
              />
            </div>
            {!selectedFile && (
              <small className="hint">Upload first, then click convert.</small>
            )}
            {selectedFile && !isConverting && convertProgress === 100 && (
              <small className="hint success">
                Conversion finished to {toFormat.toUpperCase()}.
              </small>
            )}
            {statusMessage && (
              <small className="hint success">{statusMessage}</small>
            )}
            {errorMessage && (
              <small className="hint error">{errorMessage}</small>
            )}
          </div>
        </div>

        <div className="extra-features">
          <h2>Advanced Options</h2>
          <div className="feature-grid">
            <div className="feature-item">
              <span>Custom Resize (px)</span>
              <label className="field">
                <span>Width</span>
                <input
                  type="number"
                  min="1"
                  max="7680"
                  value={resizeWidth}
                  onChange={(event) =>
                    setResizeWidth(Number(event.target.value))
                  }
                />
              </label>
              <label className="field">
                <span>Height</span>
                <input
                  type="number"
                  min="1"
                  max="7680"
                  value={resizeHeight}
                  onChange={(event) =>
                    setResizeHeight(Number(event.target.value))
                  }
                />
              </label>
            </div>

            <label className="feature-item">
              <span>Compression Quality ({quality}%)</span>
              <input
                type="range"
                min="30"
                max="100"
                value={quality}
                onChange={(event) => setQuality(Number(event.target.value))}
              />
            </label>

            <div className="feature-item">
              <label className="checkbox-field">
                <input
                  type="checkbox"
                  checked={addWatermark}
                  onChange={(event) => setAddWatermark(event.target.checked)}
                />
                <span>Add Text Watermark</span>
              </label>
              <input
                type="text"
                value={watermarkText}
                onChange={(event) => setWatermarkText(event.target.value)}
                disabled={!addWatermark}
                placeholder="Enter watermark text"
              />
            </div>
          </div>
          <section
            className="feature-showcase"
            aria-label="Extended image toolkit features"
          >
            <div className="feature-header">
              <h3>Featured Toolkit</h3>
              <p>
                Use dedicated tools for background cleanup and orientation
                fixes.
              </p>
            </div>
            <div className="feature-showcase-grid">
              <article className="feature-card">
                <h4>Feature: Background Remover</h4>
                <p>
                  Makes bright neutral backgrounds transparent for product
                  shots, profile photos, and stickers.
                </p>
                <label className="checkbox-field">
                  <input
                    type="checkbox"
                    checked={removeBackground}
                    onChange={(event) =>
                      setRemoveBackground(event.target.checked)
                    }
                  />
                  <span>Enable Background Remover</span>
                </label>
                <label className="feature-slider">
                  <span>Sensitivity ({backgroundSensitivity}%)</span>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={backgroundSensitivity}
                    onChange={(event) =>
                      setBackgroundSensitivity(Number(event.target.value))
                    }
                    disabled={!removeBackground}
                  />
                </label>
              </article>

              <article className="feature-card">
                <h4>Feature: Rotate and Mirror</h4>
                <p>
                  Correct orientation quickly and mirror horizontally when
                  preparing social posts or profile banners.
                </p>
                <label className="field">
                  <span>Rotate Image</span>
                  <select
                    value={rotation}
                    onChange={(event) =>
                      setRotation(Number(event.target.value))
                    }
                  >
                    <option value={0}>No rotation</option>
                    <option value={90}>90° clockwise</option>
                    <option value={180}>180°</option>
                    <option value={270}>270° clockwise</option>
                  </select>
                </label>
                <label className="checkbox-field">
                  <input
                    type="checkbox"
                    checked={mirrorHorizontal}
                    onChange={(event) =>
                      setMirrorHorizontal(event.target.checked)
                    }
                  />
                  <span>Mirror Horizontally</span>
                </label>
              </article>
            </div>
            <br />
            <button
              type="button"
              className="convert-btn"
              onClick={handleConvert}
              disabled={!selectedFile || isUploading || isConverting}
            >
              {isConverting ? "Converting..." : "Convert Image"}
            </button>
          </section>

          {/* <p className="option-preview">
            Ready to convert from{" "}
            {(fromFormat === "auto"
              ? detectedFormat
              : fromFormat
            ).toUpperCase()}{" "}
            to {toFormat.toUpperCase()} at {quality}% quality
            {addWatermark ? ` with watermark "${watermarkText}".` : "."}
          </p> */}

          {(selectedPreviewUrl ||
            backgroundPreviewUrl ||
            transformPreviewUrl ||
            combinedPreviewUrl ||
            downloadUrl) && (
            <section
              className="preview-compare"
              aria-label="Image comparison preview"
            >
              <h3>Live Feature Preview Frames</h3>
              <div className="preview-grid">
                <article className="preview-card">
                  <h4>Original Upload</h4>
                  {selectedPreviewUrl ? (
                    <img
                      src={selectedPreviewUrl}
                      alt="Original uploaded file preview"
                    />
                  ) : (
                    <p className="preview-placeholder">
                      Upload an image to generate preview.
                    </p>
                  )}
                </article>
                <article className="preview-card">
                  <h4>Background Remover Output</h4>
                  {backgroundPreviewUrl ? (
                    <img
                      src={backgroundPreviewUrl}
                      alt="Background remover live preview"
                    />
                  ) : (
                    <p className="preview-placeholder">
                      Enable background remover to preview changes.
                    </p>
                  )}
                </article>
                <article className="preview-card">
                  <h4>Rotate and Mirror Output</h4>
                  {transformPreviewUrl ? (
                    <img
                      src={transformPreviewUrl}
                      alt="Rotate and mirror live preview"
                    />
                  ) : (
                    <p className="preview-placeholder">
                      Choose rotation or mirror options to preview.
                    </p>
                  )}
                </article>
                {/* <article className="preview-card">
                  <h4>Combined Live Output</h4>
                  {combinedPreviewUrl ? (
                    <img
                      src={combinedPreviewUrl}
                      alt="Combined feature preview"
                    />
                  ) : (
                    <p className="preview-placeholder">
                      Upload an image to view all selected features together.
                    </p>
                  )}
                </article> */}
                <article className="preview-card-final">
                  <h4>Final Converted Output</h4>
                  {downloadUrl ? (
                    <img
                      src={downloadUrl}
                      alt="Final converted output preview"
                    />
                  ) : (
                    <p className="preview-placeholder">
                      Click convert to generate downloadable output.
                    </p>
                  )}
                  {downloadUrl && (
                    <a
                      className="download-btn"
                      href={downloadUrl}
                      download={downloadName}
                    >
                      Download Result
                    </a>
                  )}
                </article>
              </div>
            </section>
          )}
        </div>
      </section>

      <section
        className="adsense-slot secondary"
        aria-label="Secondary advertisement section"
      >
        <p>AdSense Space - Feature Highlight Zone</p>
        <small>Use this additional slot for in-content responsive ads.</small>
      </section>

      <section className="benefits">
        <article>
          <h2>Quality First</h2>
          <p>Balanced compression and sharp output for web and print usage.</p>
        </article>
        <article>
          <h2>Secure Processing</h2>
          <p>Your files are handled safely during conversion sessions.</p>
        </article>
        <article>
          <h2>Simple Workflow</h2>
          <p>Clean interface that makes converting images effortless.</p>
        </article>
      </section>

      <footer className="page-footer">
        <p>
          Powered by <span>Convertnest</span>
        </p>
        <div className="footer-links">
          <a href="/about">About</a>
          <a href="/privacy">Privacy</a>
          <a href="/contact">Contact</a>
        </div>
      </footer>
    </main>
  );
};

export default ConverterPage;
