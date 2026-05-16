const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1840, height: 1520 } });
  await page.goto('file://' + require('path').resolve('saint_paul_tube_map.html'));
  await page.screenshot({ path: 'map.png', fullPage: true, omitBackground: false });
  await page.pdf({ path: 'map.pdf', width: '1840px', height: '1520px', printBackground: true });
  await browser.close();
})();
