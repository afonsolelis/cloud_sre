import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

/**
 * Visual validation of Aula 03 material.
 * - Mermaid diagram must render to <svg>
 * - No element should overflow the viewport horizontally
 * - Captures full-page screenshots in 3 viewports for review
 */

const MATERIAL_FILE = path.resolve(
  __dirname,
  '../../aulas/aula_03_fontes_de_dados_bancos_relacionais_e_nosql/material/material_aula_03_fontes_de_dados_bancos_relacionais_e_nosql.html'
);

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../test-results/aula03-material');

test.describe('Aula 03 - material visual validation', () => {
  test.beforeAll(() => {
    if (!fs.existsSync(SCREENSHOTS_DIR)) {
      fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
    }
  });

  const VIEWPORTS = [
    { name: '1440x900', width: 1440, height: 900 },
    { name: '1280x800', width: 1280, height: 800 },
    { name: '768x1024', width: 768, height: 1024 },
  ];

  for (const vp of VIEWPORTS) {
    test(`material renders cleanly at ${vp.name}`, async ({ page }) => {
      test.setTimeout(120000);
      await page.setViewportSize({ width: vp.width, height: vp.height });

      const fileUrl = 'file:///' + MATERIAL_FILE.replace(/\\/g, '/');
      await page.goto(fileUrl);
      await page.waitForLoadState('networkidle');

      // 1. Mermaid: o <pre class="mermaid"> deve ter virado <svg>
      await page.waitForFunction(
        () => {
          const wrap = document.querySelector('.m03-mermaid');
          if (!wrap) return true; // sem mermaid no material -> ok
          return !!wrap.querySelector('svg');
        },
        { timeout: 8000 }
      );

      const hasSvg = await page.evaluate(() => {
        const wrap = document.querySelector('.m03-mermaid');
        return !!wrap && !!wrap.querySelector('svg');
      });
      expect(hasSvg, 'Mermaid deveria ter renderizado um <svg>').toBe(true);

      // 2. Overflow horizontal por elemento (codeblocks, tabelas, .m03-mermaid)
      const hOverflows = await page.evaluate(() => {
        const offenders: Array<{ tag: string; cls: string; rectRight: number; vw: number }> = [];
        const vw = document.documentElement.clientWidth;
        const candidates = document.querySelectorAll('pre, table, .m03-mermaid, .m03-callout');
        candidates.forEach((el) => {
          const rect = (el as HTMLElement).getBoundingClientRect();
          if (rect.right > vw + 1) {
            offenders.push({
              tag: el.tagName.toLowerCase(),
              cls: (el as HTMLElement).className || '',
              rectRight: Math.round(rect.right),
              vw,
            });
          }
        });
        return offenders;
      });

      // 3. Screenshot acima da dobra (viewport) e full-page
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `material_${vp.name}_top.png`),
        fullPage: false,
      });
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `material_${vp.name}.png`),
        fullPage: true,
      });

      // Screenshot da região do diagrama Mermaid (seção 10.8) e da tabela RNF (seção 3)
      const mermaidEl = await page.locator('.m03-mermaid').first();
      if (await mermaidEl.count()) {
        await mermaidEl.scrollIntoViewIfNeeded();
        await page.waitForTimeout(300);
        await page.screenshot({
          path: path.join(SCREENSHOTS_DIR, `material_${vp.name}_mermaid.png`),
          fullPage: false,
        });
      }

      fs.writeFileSync(
        path.join(SCREENSHOTS_DIR, `h_overflow_${vp.name}.json`),
        JSON.stringify(hOverflows, null, 2)
      );

      expect(
        hOverflows,
        `elementos com overflow horizontal em ${vp.name}:\n${hOverflows
          .map((o) => `  ${o.tag}.${o.cls} -> right=${o.rectRight} > vw=${o.vw}`)
          .join('\n')}`
      ).toEqual([]);
    });
  }
});
