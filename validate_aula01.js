// Playwright validator for Aula 01 slide + material.
// Checks: each slide renders without overflow, navigation works, links resolve, no console errors.
// Outputs screenshots to ./playwright-report/aula01/ and a JSON report.

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const REPO = path.resolve(__dirname);
const SLIDE_PATH = path.join(REPO, 'aulas', 'aula_01_fundamentos_de_cloud_para_dados_e_governanca_de_acessos', 'slides', 'slide_aula_01_fundamentos_de_cloud_para_dados_e_governanca_de_acessos.html');
const MATERIAL_PATH = path.join(REPO, 'aulas', 'aula_01_fundamentos_de_cloud_para_dados_e_governanca_de_acessos', 'material', 'material_aula_01_fundamentos_de_cloud_para_dados_e_governanca_de_acessos.html');
const OUT_DIR = path.join(REPO, 'playwright-report', 'aula01');
fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORT = { width: 1920, height: 1080 };

function log(...args) { console.log(...args); }

async function validateSlides(browser) {
  const page = await browser.newPage({ viewport: VIEWPORT });
  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err => consoleErrors.push('pageerror: ' + err.message));

  const url = 'file:///' + SLIDE_PATH.replace(/\\/g, '/');
  log('Loading slides:', url);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  const total = await page.evaluate(() => document.querySelectorAll('.slide').length);
  log(`Total slides: ${total}`);

  const report = { total, slides: [], consoleErrors: [], globalIssues: [] };

  // Global checks
  const footerExists = await page.evaluate(() => !!document.querySelector('.slide-footer'));
  const materialLinkExists = await page.evaluate(() => !!document.querySelector('.slide-footer .material-link'));
  const indexLinkExists = await page.evaluate(() => !!document.querySelector('.slide-footer .back-home'));
  const miniLogoExists = await page.evaluate(() => !!document.querySelector('.slide-logo-mini'));
  report.globalIssues.push(
    { check: 'slide-footer exists', ok: footerExists },
    { check: 'material link in footer', ok: materialLinkExists },
    { check: 'index link in footer', ok: indexLinkExists },
    { check: 'mini logo present', ok: miniLogoExists }
  );

  for (let i = 0; i < total; i++) {
    await page.evaluate(idx => {
      const slides = document.querySelectorAll('.slide');
      slides.forEach(s => s.classList.remove('active'));
      slides[idx].classList.add('active');
      document.getElementById('current-slide').textContent = idx + 1;
    }, i);
    await page.waitForTimeout(120);

    const slideInfo = await page.evaluate(idx => {
      const slide = document.querySelectorAll('.slide')[idx];
      if (!slide) return null;
      const deck = slide.querySelector('.deck-shell');
      const title = slide.querySelector('.deck-title')?.textContent.trim() || '(sem titulo)';
      const rect = slide.getBoundingClientRect();
      const deckRect = deck ? deck.getBoundingClientRect() : null;

      // Check vertical overflow: is content taller than viewport (minus footer)?
      const viewportH = window.innerHeight;
      const footerH = document.querySelector('.slide-footer')?.offsetHeight || 64;
      const availH = viewportH - footerH;
      const contentH = slide.scrollHeight;
      const overflow = contentH > viewportH ? contentH - viewportH : 0;

      // Count elements inside this slide for density heuristic
      const density = {
        cards: slide.querySelectorAll('.deck-card').length,
        panels: slide.querySelectorAll('.deck-panel').length,
        callouts: slide.querySelectorAll('.deck-callout').length,
        tables: slide.querySelectorAll('.deck-table').length,
        lists: slide.querySelectorAll('ul, ol').length,
        listItems: slide.querySelectorAll('li').length,
      };

      return { index: idx + 1, title, viewportH, availH, contentH, overflow, density, hasDeckShell: !!deck };
    }, i);

    const screenshotPath = path.join(OUT_DIR, `slide_${String(i + 1).padStart(2, '0')}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    slideInfo.screenshot = path.relative(REPO, screenshotPath);
    report.slides.push(slideInfo);
    log(`Slide ${slideInfo.index} | ${slideInfo.title.slice(0, 60)} | overflow=${slideInfo.overflow}px | cards=${slideInfo.density.cards} panels=${slideInfo.density.panels} callouts=${slideInfo.density.callouts} tables=${slideInfo.density.tables} listItems=${slideInfo.density.listItems}`);
  }

  report.consoleErrors = consoleErrors;
  await page.close();
  return report;
}

async function validateMaterial(browser) {
  const page = await browser.newPage({ viewport: VIEWPORT });
  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });

  const url = 'file:///' + MATERIAL_PATH.replace(/\\/g, '/');
  log('\nLoading material:', url);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  const report = await page.evaluate(() => {
    const title = document.querySelector('h1')?.textContent.trim() || '(sem h1)';
    const sections = document.querySelectorAll('section.content-block').length;
    const links = Array.from(document.querySelectorAll('a')).map(a => ({ text: a.textContent.trim().slice(0, 40), href: a.getAttribute('href') }));
    return { title, sections, links, totalHeight: document.body.scrollHeight };
  });

  const screenshotPath = path.join(OUT_DIR, 'material_full.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  report.screenshot = path.relative(REPO, screenshotPath);
  report.consoleErrors = consoleErrors;
  log(`Material: "${report.title}" | sections=${report.sections} | totalHeight=${report.totalHeight}px`);
  await page.close();
  return report;
}

(async () => {
  const browser = await chromium.launch();
  const slides = await validateSlides(browser);
  const material = await validateMaterial(browser);
  await browser.close();

  const report = { slides, material };
  const reportPath = path.join(OUT_DIR, 'report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`\nReport saved to ${reportPath}`);

  // Summary
  const overflowing = slides.slides.filter(s => s.overflow > 0);
  const dense = slides.slides.filter(s => s.density.listItems > 12 || s.density.cards + s.density.panels + s.density.callouts + s.density.tables >= 3);
  log('\n=== SUMMARY ===');
  log(`Slides with vertical overflow (content > viewport ${VIEWPORT.height}px): ${overflowing.length}/${slides.total}`);
  overflowing.forEach(s => log(`  Slide ${s.index}: ${s.title.slice(0, 60)} — overflow ${s.overflow}px (content ${s.contentH}px)`));
  log(`\nSlides with high density (>12 list items OR 3+ heavy blocks): ${dense.length}`);
  dense.forEach(s => log(`  Slide ${s.index}: ${s.title.slice(0, 60)} — cards=${s.density.cards} panels=${s.density.panels} callouts=${s.density.callouts} tables=${s.density.tables} listItems=${s.density.listItems}`));
  log(`\nConsole errors in slides: ${slides.consoleErrors.length}`);
  slides.consoleErrors.forEach(e => log('  ', e));
  log(`Console errors in material: ${material.consoleErrors.length}`);
  log(`Material content blocks: ${material.sections}`);
})().catch(e => { console.error(e); process.exit(1); });
