import { readFileSync } from "node:fs";

import sharp from "sharp";

const latin = readFileSync("public/fonts/MinSans-Medium_0.woff2").toString("base64");
const symbols = readFileSync("public/fonts/MinSans-Medium_2.woff2").toString("base64");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @font-face {
        font-family: "Min Sans";
        src: url("data:font/woff2;base64,${latin}") format("woff2");
        font-weight: 500;
      }
      @font-face {
        font-family: "Min Sans Symbols";
        src: url("data:font/woff2;base64,${symbols}") format("woff2");
        font-weight: 500;
      }
    </style>
  </defs>
  <rect width="1200" height="630" fill="#f4f4f4"/>
  <circle cx="1040" cy="140" r="250" fill="#f24281" fill-opacity="0.16"/>
  <text x="72" y="268" font-size="28" font-weight="500">
    <tspan font-family="Min Sans Symbols" fill="#f24281">[</tspan><tspan font-family="Min Sans" fill="#1c1c1c">SMCHK</tspan><tspan font-family="Min Sans Symbols" fill="#f24281">]</tspan>
  </text>
  <text x="72" y="372" font-family="Min Sans" font-size="84" font-weight="500" fill="#1c1c1c">Julia Samchuk</text>
  <text x="72" y="440" font-family="Min Sans" font-size="36" font-weight="500" fill="#f24281">Graphic Designer</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9, palette: true, quality: 100, effort: 10 })
  .toFile("public/og.png");
console.log("wrote public/og.png");
