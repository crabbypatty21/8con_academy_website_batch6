const { chromium } = require('./node_modules/playwright');

(async () => {
  const browser = await chromium.launch();

  // --- Desktop 1440px ---
  const pageDesktop = await browser.newPage();
  await pageDesktop.setViewportSize({ width: 1440, height: 900 });
  await pageDesktop.goto('http://localhost:5174', { waitUntil: 'networkidle' });

  const internshipDesktop = await pageDesktop.$('#internship');
  if (!internshipDesktop) {
    console.error('ERROR: #internship element not found at desktop');
    // List all section IDs to debug
    const ids = await pageDesktop.evaluate(() =>
      Array.from(document.querySelectorAll('[id]')).map(el => el.id)
    );
    console.log('Found IDs:', ids);
    await browser.close();
    process.exit(1);
  }

  await internshipDesktop.scrollIntoViewIfNeeded();
  await pageDesktop.waitForTimeout(800);

  await internshipDesktop.screenshot({
    path: 'screenshot-internship-1440.png'
  });
  console.log('Desktop 1440px screenshot saved.');

  // --- Tablet 768px ---
  const pageTablet = await browser.newPage();
  await pageTablet.setViewportSize({ width: 768, height: 1024 });
  await pageTablet.goto('http://localhost:5174', { waitUntil: 'networkidle' });

  const internshipTablet = await pageTablet.$('#internship');
  if (!internshipTablet) {
    console.error('ERROR: #internship element not found at tablet');
    await browser.close();
    process.exit(1);
  }

  await internshipTablet.scrollIntoViewIfNeeded();
  await pageTablet.waitForTimeout(800);

  await internshipTablet.screenshot({
    path: 'screenshot-internship-768.png'
  });
  console.log('Tablet 768px screenshot saved.');

  await browser.close();
  console.log('Done.');
})();
