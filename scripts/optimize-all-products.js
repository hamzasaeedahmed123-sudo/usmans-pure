const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const targetImages = [
  { path: "public/spices-jar.png", max: 900, isPng: true, palette: true },
  { path: "public/images/spices-jar.png", max: 900, isPng: true, palette: true },
  { path: "public/images/spices-cutout.png", max: 900, isPng: true, palette: true },
  { path: "public/images/spices-product.jpg", max: 900, isPng: false },
  { path: "public/images/products/prod-4.png", max: 850, isPng: true, palette: true },
  { path: "public/atta-bag.png", max: 900, isPng: true, palette: true },
  { path: "public/images/atta-bag.png", max: 900, isPng: true, palette: true },
  { path: "public/tea-pouch.png", max: 900, isPng: true, palette: true },
  { path: "public/images/tea-pouch.png", max: 900, isPng: true, palette: true },
  { path: "public/images/flour-product.jpg", max: 900, isPng: false },
  { path: "public/images/tea-product.jpg", max: 900, isPng: false },
  { path: "public/images/hero/wheat-1.png", max: 500, isPng: true, palette: true },
  { path: "public/images/hero/wheat-2.png", max: 500, isPng: true, palette: true },
  { path: "public/images/hero/cinnamon.png", max: 500, isPng: true, palette: true },
  { path: "public/images/hero/star-anise.png", max: 500, isPng: true, palette: true },
  { path: "public/images/hero/herbal-flatlay-bg.jpg", max: 1200, isPng: false },
  { path: "public/images/hero/flour-backdrop.jpg", max: 1200, isPng: false },
  { path: "public/images/hero/spices-fluid-bg.jpg", max: 1200, isPng: false },
  { path: "public/images/hero/spices-backdrop.jpg", max: 1200, isPng: false },
  { path: "public/images/hero/spices-backdrop-v2.jpg", max: 1200, isPng: false },
  { path: "public/images/hero/herbal-backdrop.jpg", max: 1200, isPng: false },
  { path: "public/images/hero/herbal-backdrop-v2.jpg", max: 1200, isPng: false },
];

async function run() {
  let totalOrig = 0;
  let totalNew = 0;

  for (const item of targetImages) {
    if (!fs.existsSync(item.path)) continue;
    const inputBuffer = fs.readFileSync(item.path);
    const orig = inputBuffer.length;
    totalOrig += orig;

    let p = sharp(inputBuffer).resize(item.max, item.max, {
      fit: "inside",
      withoutEnlargement: true,
    });

    let buf;
    if (item.isPng) {
      buf = await p.png({ quality: 85, palette: item.palette, compressionLevel: 9 }).toBuffer();
    } else {
      buf = await p.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
    }

    if (buf && buf.length < orig) {
      fs.writeFileSync(item.path, buf);
      totalNew += buf.length;
      console.log(
        `✓ ${item.path}: ${Math.round(orig / 1024)}KB -> ${Math.round(buf.length / 1024)}KB (-${Math.round(
          ((orig - buf.length) / orig) * 100
        )}%)`
      );
    } else {
      totalNew += orig;
    }
  }

  console.log("-----------------------------------------");
  console.log(`TOTAL BEFORE: ${Math.round(totalOrig / 1024)} KB`);
  console.log(`TOTAL AFTER:  ${Math.round(totalNew / 1024)} KB`);
  console.log(
    `SAVINGS:      ${Math.round((totalOrig - totalNew) / 1024)} KB (-${Math.round(
      ((totalOrig - totalNew) / totalOrig) * 100
    )}%)`
  );
}

run().catch(console.error);
