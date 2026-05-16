const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const htmlFile = process.argv[2];
const outputDir = process.argv[3];

if (!htmlFile || !outputDir) {
  console.error('Usage: node html_to_pdf_png.js <file.html> <output_dir>');
  process.exit(1);
}

const baseName = path.basename(htmlFile, '.html');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1840, height: 1520 } });
  await page.goto('file://' + path.resolve(htmlFile));
  await page.screenshot({ path: `${outputDir}/${baseName}.png`, fullPage: true, omitBackground: false });
  await page.pdf({ path: `${outputDir}/${baseName}.pdf`, width: '1840px', height: '1520px', printBackground: true });

  const svgContent = await page.evaluate(() => document.querySelector('svg')?.outerHTML ?? '');
  if (svgContent) {
    fs.writeFileSync(`${outputDir}/${baseName}.svg`, svgContent);
  } else {
    console.warn('No SVG element found in page, skipping SVG output.');
  }

  await browser.close();
})();
