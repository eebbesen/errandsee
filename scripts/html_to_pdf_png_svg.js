const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

function resolveHtmlFile(area) {
  return path.join(__dirname, '..', 'artifacts', area, 'public', 'index.html');
}

function resolveBaseName(htmlFile) {
  return path.basename(path.dirname(path.dirname(path.resolve(htmlFile))));
}

if (require.main === module) {
  const area = process.argv[2];

  if (!area) {
    console.error('Usage: node html_to_pdf_png_svg.js <geographic-area>');
    console.error('Example: node html_to_pdf_png_svg.js snel-west-rand-uni');
    process.exit(1);
  }

  const htmlFile = resolveHtmlFile(area);

  if (!fs.existsSync(htmlFile)) {
    console.error(`Area "${area}" not found. Expected file at: ${htmlFile}`);
    process.exit(1);
  }

  const outputDir = path.dirname(htmlFile);
  const baseName = resolveBaseName(htmlFile);

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
}

module.exports = { resolveHtmlFile, resolveBaseName };
