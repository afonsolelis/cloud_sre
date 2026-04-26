import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Visual validation of Aula 04 slide deck.
 * For each slide, navigate via showSlide(i), measure overflow on the active
 * slide container, and capture a screenshot. Fails if any slide content
 * extends beyond its visible area (scrollHeight > clientHeight + 1).
 */

const SLIDE_FILE = path.resolve(
  __dirname,
  '../../aulas/aula_04_ingestao_e_processamento_near_real_time_streaming/slides/slide_aula_04_ingestao_e_processamento_near_real_time_streaming.html'
);

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../test-results/aula04-slides');

test.describe('Aula 04 - visual overflow per slide', () => {
  test.beforeAll(() => {
    if (!fs.existsSync(SCREENSHOTS_DIR)) {
      fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
    }
  });

  const VIEWPORTS = [
    { name: '1920x1080', width: 1920, height: 1080 },
    { name: '1440x900', width: 1440, height: 900 },
    { name: '1366x768', width: 1366, height: 768 },
    { name: '1280x800', width: 1280, height: 800 },
  ];

  for (const vp of VIEWPORTS) {
    test(`every slide fits within ${vp.name}`, async ({ page }) => {
      test.setTimeout(180000);
      await page.setViewportSize({ width: vp.width, height: vp.height });

      const fileUrl = 'file:///' + SLIDE_FILE.replace(/\\/g, '/');
      await page.goto(fileUrl);
      await page.waitForLoadState('networkidle');

      const totalSlides = await page.evaluate(() => {
        return document.querySelectorAll('.slide').length;
      });

      expect(totalSlides).toBeGreaterThan(0);

      const overflowReport: Array<{
        index: number;
        title: string;
        overflowPx: number;
      }> = [];

      for (let i = 0; i < totalSlides; i++) {
        await page.evaluate((idx) => {
          // @ts-ignore
          window.showSlide(idx);
        }, i);

        // wait for animation; longer if slide has mermaid that needs to render
        const hasMermaid = await page.evaluate(() => {
          const active = document.querySelector('.slide.active');
          return !!active && !!active.querySelector('pre.mermaid, .a04-mermaid svg');
        });
        await page.waitForTimeout(hasMermaid ? 1500 : 200);

        const metrics = await page.evaluate(() => {
          const active = document.querySelector('.slide.active') as HTMLElement | null;
          if (!active) return null;
          const shell = active.querySelector('.deck-shell') as HTMLElement | null;
          const footer = document.querySelector('.slide-footer') as HTMLElement | null;
          if (!shell) return null;
          const titleEl = active.querySelector('.deck-title');
          const shellRect = shell.getBoundingClientRect();
          const footerHeight = footer ? footer.getBoundingClientRect().height : 0;
          // available area = viewport height - footer height
          const usableBottom = window.innerHeight - footerHeight;
          // shell.scrollHeight reflects full content height even if visually clipped
          const shellBottomIfNotClipped = shellRect.top + shell.scrollHeight;
          return {
            title: titleEl ? (titleEl.textContent || '').trim() : '(no title)',
            shellTop: shellRect.top,
            shellScrollHeight: shell.scrollHeight,
            shellClientHeight: shell.clientHeight,
            usableBottom,
            shellBottomIfNotClipped,
          };
        });
        if (!metrics) continue;

        const overflowPx = Math.round(metrics.shellBottomIfNotClipped - metrics.usableBottom);
        const safe = `slide_${vp.name}_${String(i + 1).padStart(2, '0')}`;
        await page.screenshot({
          path: path.join(SCREENSHOTS_DIR, `${safe}.png`),
          fullPage: false,
        });

        if (overflowPx > 2) {
          overflowReport.push({
            index: i + 1,
            title: metrics.title,
            overflowPx,
          });
        }
      }

      if (overflowReport.length > 0) {
        console.log(`\n=== SLIDES WITH OVERFLOW (${vp.name}) ===`);
        for (const r of overflowReport) {
          console.log(`  slide ${r.index}: "${r.title}" - overflow ${r.overflowPx}px`);
        }
        console.log('=========================================\n');
      }

      fs.writeFileSync(
        path.join(SCREENSHOTS_DIR, `overflow_report_${vp.name}.json`),
        JSON.stringify(overflowReport, null, 2)
      );

      expect(
        overflowReport,
        `slides com overflow vertical em ${vp.name}:\n${overflowReport
          .map((r) => `  #${r.index} "${r.title}" +${r.overflowPx}px`)
          .join('\n')}`
      ).toEqual([]);
    });
  }
});
