const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

async function optimizeFile(filePath, options = {}) {
  const { maxWidth, maxHeight, quality = 85, isWatermark = false } = options;
  if (!fs.existsSync(filePath)) return;

  const originalSize = fs.statSync(filePath).size;
  let pipeline = sharp(filePath);

  if (maxWidth || maxHeight) {
    pipeline = pipeline.resize(maxWidth, maxHeight, {
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const ext = path.extname(filePath).toLowerCase();
  let buffer;

  if (ext === ".png") {
    buffer = await pipeline
      .png({
        quality: isWatermark ? 80 : quality,
        compressionLevel: 9,
        palette: isWatermark, // Palette mode for transparent watermarks gives massive savings
      })
      .toBuffer();
  } else if (ext === ".jpg" || ext === ".jpeg") {
    buffer = await pipeline
      .jpeg({
        quality,
        mozjpeg: true,
      })
      .toBuffer();
  }

  if (buffer && buffer.length < originalSize) {
    fs.writeFileSync(filePath, buffer);
    const savings = Math.round((originalSize - buffer.length) / 1024);
    const pct = Math.round(((originalSize - buffer.length) / originalSize) * 100);
    console.log(
      `✓ Optimized ${path.basename(filePath)}: ${Math.round(originalSize / 1024)}KB -> ${Math.round(buffer.length / 1024)}KB (Saved ${savings}KB, -${pct}%)`
    );
  }
}

async function run() {
  console.log("=== Optimizing Large Assets for Instant Page Loads ===");

  // 1. Watermarks (Displayed faintly at ~400px, previously 1.5MB+ each)
  const watermarkFiles = [
    "public/images/watermarks/wheat-stalks.png",
    "public/images/watermarks/spices-mix.png",
    "public/images/watermarks/herbal-leaves.png",
    "public/images/watermarks/about-leaf.png",
    "public/images/watermarks/about-2.png",
  ];
  for (const f of watermarkFiles) {
    await optimizeFile(f, { maxWidth: 650, maxHeight: 650, isWatermark: true });
  }

  // 2. Hero Products
  const heroFiles = [
    "public/images/hero/multigrain-flour.png",
    "public/images/hero/herbal-tea-v2.png",
    "public/images/hero/spices-jar-v2.png",
    "public/images/hero/flour-pouch.png",
    "public/images/hero/tea-pouch.png",
    "public/images/hero/spices-jar.png",
  ];
  for (const f of heroFiles) {
    await optimizeFile(f, { maxWidth: 900, maxHeight: 900, quality: 85 });
  }

  // 3. Products
  await optimizeFile("public/images/products/prod-4.png", { maxWidth: 850, maxHeight: 850, quality: 85 });

  console.log("Asset optimization complete!");
}

run().catch(console.error);
