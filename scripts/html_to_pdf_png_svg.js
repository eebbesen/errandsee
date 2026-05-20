const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const htmlFile = process.argv[2];

if (!htmlFile) {
  console.error('Usage: node html_to_pdf_png_svg.js <file.html>');
  process.exit(1);
}

const outputDir = path.dirname(path.resolve(htmlFile));

const baseName = path.basename(path.dirname(path.dirname(path.resolve(htmlFile))));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1840, height: 1520 } });
  await page.goto('file://' + path.resolve(htmlFile));
  await page.evaluate(() => document.querySelectorAll('a.dl-link').forEach(el => el.remove()));
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
