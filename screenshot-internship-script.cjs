const { chromium } = require('./node_modules/playwright');

(async () => {
  const browser = await chromium.launch();

  // Helper: capture section as it naturally appears (respects overflow:hidden)
  async function captureSection(page, url, width, height, outPath) {
    await page.setViewportSize({ width, height });
    await page.goto(url);
    await page.waitForSelector('#internship', { timeout: 15000 });

    // Scroll to section
    await page.evaluate(() => {
      document.querySelector('#internship').scrollIntoView({ behavior: 'instant' });
    });
    await page.waitForTimeout(800);

    // Force fade-in elements visible
    await page.evaluate(() => {
      document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'none';
      });
    });
    await page.waitForTimeout(300);

    // Measure section in document coordinates
    const box = await page.evaluate(() => {
      const el = document.querySelector('#internship');
      const rect = el.getBoundingClientRect();
      return {
        x: Math.round(rect.left + window.scrollX),
        y: Math.round(rect.top + window.scrollY),
        width: Math.round(rect.width),
        height: Math.round(rect.height)
      };
    });
    console.log(`${width}px section bounds:`, box);

    await page.screenshot({
      path: outPath,
      fullPage: true,
      clip: { x: box.x, y: box.y, width: box.width, height: box.height }
    });
    console.log(`Saved: ${outPath}`);
  }

  // Desktop 1440x900 — natural view (section is 100vh = 900px, overflow hidden)
  const page1440 = await browser.newPage();
  await captureSection(page1440, 'http://localhost:5174', 1440, 900, 'screenshot-internship-1440.png');

  // Desktop 1440 — override overflow to show full section
  const page1440full = await browser.newPage();
  await page1440full.setViewportSize({ width: 1440, height: 900 });
  await page1440full.goto('http://localhost:5174');
  await page1440full.waitForSelector('#internship', { timeout: 15000 });
  await page1440full.evaluate(() => {
    document.querySelector('#internship').scrollIntoView({ behavior: 'instant' });
  });
  await page1440full.waitForTimeout(800);
  // Remove overflow:hidden and height constraint so all cards show
  await page1440full.evaluate(() => {
    const section = document.querySelector('#internship');
    section.style.height = 'auto';
    section.style.overflow = 'visible';
    section.style.minHeight = '100vh';
    document.querySelectorAll('.fade-in').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'none';
    });
  });
  await page1440full.waitForTimeout(400);
  const box1440full = await page1440full.evaluate(() => {
    const el = document.querySelector('#internship');
    const rect = el.getBoundingClientRect();
    return {
      x: Math.round(rect.left + window.scrollX),
      y: Math.round(rect.top + window.scrollY),
      width: Math.round(rect.width),
      height: Math.round(rect.height)
    };
  });
  console.log('1440px full (no overflow) bounds:', box1440full);
  await page1440full.screenshot({
    path: 'screenshot-internship-1440-full.png',
    fullPage: true,
    clip: { x: box1440full.x, y: box1440full.y, width: box1440full.width, height: box1440full.height }
  });
  console.log('Saved: screenshot-internship-1440-full.png');

  // Tablet 768px
  const page768 = await browser.newPage();
  await captureSection(page768, 'http://localhost:5174', 768, 1024, 'screenshot-internship-768.png');

  await browser.close();
  console.log('All done.');
})();
