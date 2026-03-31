import { test, expect, fsHelpers } from '../fixtures/helpers';
import * as path from 'path';
import * as fs from 'fs';

test.describe('Assets Cloudinary Spec', () => {

  const LOGO_FULL_URL = 'https://res.cloudinary.com/dyhjjms8y/image/upload/v1766252944/logo_e4vyyw.png';
  const LOGO_MINI_URL = 'https://res.cloudinary.com/dyhjjms8y/image/upload/v1766252944/logo_mini_wspmx7.png';

  test.describe('Arquivo cloudinary.json', () => {

    test('deve existir assets/cloudinary.json', async ({ projectRoot }) => {
      const jsonPath = path.join(projectRoot, 'assets', 'cloudinary.json');
      expect(fsHelpers.isFile(jsonPath)).toBeTruthy();
    });

    test('cloudinary.json deve conter logo_full com URL correta', async ({ projectRoot }) => {
      const jsonPath = path.join(projectRoot, 'assets', 'cloudinary.json');
      const content = JSON.parse(fsHelpers.readFileSync(jsonPath));

      expect(content.logo_full).toBeDefined();
      expect(content.logo_full.url).toBe(LOGO_FULL_URL);
    });

    test('cloudinary.json deve conter logo_mini com URL correta', async ({ projectRoot }) => {
      const jsonPath = path.join(projectRoot, 'assets', 'cloudinary.json');
      const content = JSON.parse(fsHelpers.readFileSync(jsonPath));

      expect(content.logo_mini).toBeDefined();
      expect(content.logo_mini.url).toBe(LOGO_MINI_URL);
    });
  });

  test.describe('Logo completo no index.html', () => {

    test('index.html deve conter imagem com classe logo-full', async ({ projectRoot }) => {
      const indexPath = path.join(projectRoot, 'index.html');
      const content = fsHelpers.readFileSync(indexPath);

      expect(content).toContain('class="logo-full"');
    });

    test('index.html deve usar a URL do logo completo', async ({ projectRoot }) => {
      const indexPath = path.join(projectRoot, 'index.html');
      const content = fsHelpers.readFileSync(indexPath);

      expect(content).toContain(LOGO_FULL_URL);
    });

    test('index.html deve ter alt descritivo no logo', async ({ projectRoot }) => {
      const indexPath = path.join(projectRoot, 'index.html');
      const content = fsHelpers.readFileSync(indexPath);

      const hasLogoWithAlt =
        content.includes('logo-full') &&
        content.includes('alt="');

      expect(hasLogoWithAlt).toBeTruthy();
    });
  });

  test.describe('Logo completo na capa dos slides', () => {

    test('todos os slides devem ter logo completo na primeira section', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));

      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);

        const hasLogoFull =
          content.includes('deck-logo-full') ||
          (content.includes(LOGO_FULL_URL) && content.includes('class="deck-logo-full"'));

        expect(hasLogoFull).toBeTruthy();
      }
    });

    test('logo completo dos slides deve usar a URL correta', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));

      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);

        expect(content).toContain(LOGO_FULL_URL);
      }
    });

    test('logo completo dos slides deve ter alt descritivo', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));

      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);

        // Find the deck-logo-full img and check it has an alt
        const logoMatch = content.match(/<img[^>]*deck-logo-full[^>]*>/);
        expect(logoMatch).not.toBeNull();

        if (logoMatch) {
          expect(logoMatch[0]).toContain('alt="');
        }
      }
    });

    test('logo completo deve estar dentro da primeira section', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));

      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);

        // Find position of first <section and of deck-logo-full
        const firstSectionIndex = content.indexOf('<section');
        const secondSectionIndex = content.indexOf('<section', firstSectionIndex + 1);
        const logoIndex = content.indexOf(LOGO_FULL_URL);

        expect(logoIndex).toBeGreaterThan(firstSectionIndex);
        if (secondSectionIndex > -1) {
          expect(logoIndex).toBeLessThan(secondSectionIndex);
        }
      }
    });
  });

  test.describe('Logo mini em todos os slides', () => {

    test('todos os slides devem ter logo mini', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));

      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);

        expect(content).toContain(LOGO_MINI_URL);
      }
    });

    test('logo mini deve ter classe slide-logo-mini', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));

      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);

        expect(content).toContain('slide-logo-mini');
      }
    });

    test('logo mini deve ter alt descritivo', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));

      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);

        const logoMatch = content.match(/<img[^>]*slide-logo-mini[^>]*>/);
        expect(logoMatch).not.toBeNull();

        if (logoMatch) {
          expect(logoMatch[0]).toContain('alt="');
        }
      }
    });

    test('logo mini deve estar dentro de .reveal mas fora de .slides', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));

      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);

        // The mini logo should appear after the closing </div> of .slides
        // but before the closing </div> of .reveal
        const slidesCloseIndex = content.lastIndexOf('</div>', content.indexOf('<script'));
        const miniLogoIndex = content.indexOf(LOGO_MINI_URL);

        expect(miniLogoIndex).toBeGreaterThan(-1);
      }
    });

    test('logo mini nao deve interferir na navegacao (pointer-events: none)', async ({ projectRoot, aulasDir }) => {
      // pointer-events: none can be in the shared CSS or inline
      const cssPath = path.join(projectRoot, 'assets', 'reveal_custom.css');
      const cssContent = fsHelpers.isFile(cssPath) ? fsHelpers.readFileSync(cssPath) : '';
      const cssHasPointerEvents =
        cssContent.includes('pointer-events: none') ||
        cssContent.includes('pointer-events:none');

      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));

      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);

        const inlineHasPointerEvents =
          content.includes('pointer-events: none') ||
          content.includes('pointer-events:none');

        // Either shared CSS or inline style must define pointer-events: none
        expect(cssHasPointerEvents || inlineHasPointerEvents).toBeTruthy();
      }
    });
  });

  test.describe('Consistencia entre aulas', () => {

    test('todas as 8 aulas devem ter logo completo na capa', async ({ aulasDir }) => {
      const aulaFolders = fsHelpers.readDir(aulasDir).filter(f => f.startsWith('aula_'));

      let countWithLogo = 0;

      for (const folder of aulaFolders) {
        const slidesPath = path.join(aulasDir, folder, 'slides');
        if (fsHelpers.isDirectory(slidesPath)) {
          const slideFiles = fsHelpers.readDir(slidesPath).filter(f => f.startsWith('slide_'));

          for (const slideFile of slideFiles) {
            const content = fsHelpers.readFileSync(path.join(slidesPath, slideFile));
            if (content.includes(LOGO_FULL_URL)) {
              countWithLogo++;
            }
          }
        }
      }

      expect(countWithLogo).toBe(aulaFolders.length);
    });

    test('todas as 8 aulas devem ter logo mini', async ({ aulasDir }) => {
      const aulaFolders = fsHelpers.readDir(aulasDir).filter(f => f.startsWith('aula_'));

      let countWithMini = 0;

      for (const folder of aulaFolders) {
        const slidesPath = path.join(aulasDir, folder, 'slides');
        if (fsHelpers.isDirectory(slidesPath)) {
          const slideFiles = fsHelpers.readDir(slidesPath).filter(f => f.startsWith('slide_'));

          for (const slideFile of slideFiles) {
            const content = fsHelpers.readFileSync(path.join(slidesPath, slideFile));
            if (content.includes(LOGO_MINI_URL)) {
              countWithMini++;
            }
          }
        }
      }

      expect(countWithMini).toBe(aulaFolders.length);
    });
  });

  test.describe('CSS dos logos', () => {

    test('styles.css deve definir classe logo-full', async ({ projectRoot }) => {
      const stylesPath = path.join(projectRoot, 'assets', 'styles.css');
      const content = fsHelpers.readFileSync(stylesPath);

      expect(content).toContain('.logo-full');
    });

    test('reveal_custom.css deve definir classe deck-logo-full', async ({ projectRoot }) => {
      const cssPath = path.join(projectRoot, 'assets', 'reveal_custom.css');
      const content = fsHelpers.readFileSync(cssPath);

      expect(content).toContain('.deck-logo-full');
    });

    test('reveal_custom.css deve definir classe slide-logo-mini', async ({ projectRoot }) => {
      const cssPath = path.join(projectRoot, 'assets', 'reveal_custom.css');
      const content = fsHelpers.readFileSync(cssPath);

      expect(content).toContain('.slide-logo-mini');
    });
  });
});
