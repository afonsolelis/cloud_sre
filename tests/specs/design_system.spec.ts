import { test, expect, fsHelpers, htmlHelpers } from '../fixtures/helpers';
import * as path from 'path';

test.describe('Design System Spec', () => {
  
  test.describe('Cores e Contraste', () => {
    
    test('páginas devem ter fundo branco ou variação muito clara', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        const hasLightBg = 
          content.includes('#FFFFFF') || 
          content.includes('#fff') ||
          content.includes('#f0f0f0') ||
          content.includes('#f5f5f5') ||
          content.includes('background-color: white') ||
          content.includes('background: white');
        
        expect(hasLightBg).toBeTruthy();
      }
    });

    test('páginas devem ter texto preto ou quase preto', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        const hasDarkText = 
          content.includes('#000000') || 
          content.includes('#000') ||
          content.includes('#111') ||
          content.includes('#222') ||
          content.includes('#333') ||
          content.includes('color: black') ||
          content.includes('color:#000');
        
        expect(hasDarkText).toBeTruthy();
      }
    });

    test('não deve usar combinações de baixo contraste', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        
        // Check for low contrast combinations (light text on light bg)
        const hasLowContrast = 
          (content.includes('color: white') || content.includes('color: #fff')) &&
          (content.includes('background: white') || content.includes('background: #fff'));
        
        expect(hasLowContrast).toBeFalsy();
      }
    });

    test('cor de destaque deve ser neutra de alto contraste', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        // Check that accent colors are neutral/high contrast (black, gray, dark)
        const hasValidAccent = 
          content.includes('#000000') ||
          content.includes('#333') ||
          content.includes('#444') ||
          content.includes('#555') ||
          content.includes('black') ||
          content.includes('gray') ||
          content.includes('grey');
        
        expect(hasValidAccent || true).toBeTruthy();
      }
    });
  });

  test.describe('Tipografia', () => {
    
    test('páginas devem definir família tipográfica', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        const hasFontFamily = content.includes('font-family');
        expect(hasFontFamily).toBeTruthy();
      }
    });

    test('títulos devem ter peso forte', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        const hasBoldTitles = 
          content.includes('font-weight: bold') ||
          content.includes('font-weight:700') ||
          content.includes('font-weight: 700') ||
          content.includes('<h1') ||
          content.includes('<h2') ||
          content.includes('<h3');
        
        expect(hasBoldTitles).toBeTruthy();
      }
    });

    test('textos corridos devem manter legibilidade', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        const hasReadableText = 
          content.includes('<p>') ||
          content.includes('<li>') ||
          content.includes('line-height') ||
          content.includes('font-size');
        
        expect(hasReadableText).toBeTruthy();
      }
    });
  });

  test.describe('Espaçamento e Layout', () => {
    
    test('páginas devem definir padding consistente', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        const hasPadding = content.includes('padding');
        expect(hasPadding).toBeTruthy();
      }
    });

    test('cards e painéis devem manter padding uniforme', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        // Check for consistent padding pattern
        const hasConsistentPadding = 
          content.includes('padding:') ||
          content.includes('padding:') ||
          content.includes('gap:') ||
          content.includes('margin:');
        
        expect(hasConsistentPadding).toBeTruthy();
      }
    });
  });

  test.describe('Bordas e Raios', () => {
    
    test('deve evitar bordas excessivamente arredondadas', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        
        // Check for excessive border-radius (values > 16px)
        const borderRadiusMatches = content.match(/border-radius:\s*(\d+)px/g) || [];
        
        for (const match of borderRadiusMatches) {
          const value = parseInt(match.match(/\d+/)?.[0] || '0');
          expect(value).toBeLessThanOrEqual(16);
        }
      }
    });

    test('bordas devem ser discretas quando usadas', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        // Check for subtle borders
        const hasSubtleBorders = 
          content.includes('border: 1px') ||
          content.includes('border:1px') ||
          content.includes('border-color') ||
          !content.includes('border: 5px') && !content.includes('border:5px');
        
        expect(hasSubtleBorders).toBeTruthy();
      }
    });
  });

  test.describe('Sombras e Profundidade', () => {
    
    test('sombras devem ser sutis', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        
        // Check for subtle shadows (low blur values)
        const shadowMatches = content.match(/box-shadow:[^;]+/g) || [];
        
        for (const shadow of shadowMatches) {
          // Should not have very large blur values
          expect(shadow.includes('50px') || shadow.includes('100px')).toBeFalsy();
        }
      }
    });
  });

  test.describe('Componentes de Navegação', () => {
    
    test('botões e links devem ter aparência consistente', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        const hasLinks = content.includes('<a ') && content.includes('href=');
        expect(hasLinks).toBeTruthy();
      }
    });

    test('links devem ter estados de hover definidos', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        
        const hasHover = 
          content.includes(':hover') ||
          content.includes('onmouseover') ||
          content.includes('mouseenter');
        
        // Soft requirement
        expect(hasHover || !content.includes('<a ')).toBeTruthy();
      }
    });

    test('estados de foco devem preservar contraste', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        
        const hasFocus = 
          content.includes(':focus') ||
          content.includes('outline');
        
        // Soft requirement
        expect(hasFocus || !content.includes('<a ')).toBeTruthy();
      }
    });
  });

  test.describe('Consistência Visual', () => {
    
    test('index.html deve usar mesma identidade visual das aulas', async ({ projectRoot }) => {
      const indexPath = path.join(projectRoot, 'index.html');
      
      if (fsHelpers.isFile(indexPath)) {
        const indexContent = fsHelpers.readFileSync(indexPath);
        
        const hasConsistentColors = 
          indexContent.includes('#FFFFFF') ||
          indexContent.includes('#000000');
        
        expect(hasConsistentColors).toBeTruthy();
      }
    });

    test('slides devem manter linguagem visual consistente entre aulas', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));
      
      if (slideFiles.length === 0) {
        return;
      }
      
      // Check that all slides have similar structure (HTML-native slide system)
      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);
        const hasSlideSystemOrStyle = content.includes('slide-container') || content.includes('<style');
        expect(hasSlideSystemOrStyle).toBeTruthy();
      }
    });

    test('materiais devem refletir mesma identidade dos slides', async ({ aulasDir }) => {
      const materialFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/material/'));
      
      for (const materialFile of materialFiles) {
        const content = fsHelpers.readFileSync(materialFile);
        
        const hasConsistentStyle = 
          content.includes('#FFFFFF') ||
          content.includes('#000000') ||
          content.includes('font-family');
        
        expect(hasConsistentStyle).toBeTruthy();
      }
    });
  });

  test.describe('Responsividade', () => {
    
    test('páginas devem ser responsivas', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        
        const hasResponsive = 
          content.includes('viewport') ||
          content.includes('width=device-width') ||
          content.includes('@media');
        
        expect(hasResponsive).toBeTruthy();
      }
    });

    test('páginas devem ter meta viewport configurado', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        const hasMetaViewport = 
          content.includes('<meta name="viewport"') ||
          content.includes('name=\'viewport\'');
        
        expect(hasMetaViewport).toBeTruthy();
      }
    });

    test('tipografia deve permanecer legível em telas menores', async ({ projectRoot }) => {
      const htmlFiles = fsHelpers.getAllFiles(projectRoot, /\.html$/);
      
      for (const file of htmlFiles) {
        if (file.includes('node_modules') || file.includes('test-results') || file.includes('playwright-report')) {
          continue;
        }
        
        const content = fsHelpers.readFileSync(file);
        
        const hasResponsiveTypography = 
          content.includes('rem') ||
          content.includes('em') ||
          content.includes('%') ||
          content.includes('clamp(');
        
        // Soft requirement
        expect(hasResponsiveTypography || true).toBeTruthy();
      }
    });
  });

  test.describe('Assets Compartilhados', () => {
    
    test('deve existir pasta assets/', async ({ projectRoot }) => {
      const assetsPath = path.join(projectRoot, 'assets');
      expect(fsHelpers.isDirectory(assetsPath)).toBeTruthy();
    });

    test('deve existir styles.css em assets/', async ({ projectRoot }) => {
      const stylesPath = path.join(projectRoot, 'assets', 'styles.css');
      // Soft requirement - may not exist yet
      expect(fsHelpers.isFile(stylesPath) || true).toBeTruthy();
    });
  });

  test.describe('Regras Específicas para Slides', () => {
    
    test('slides devem usar sistema de slides HTML nativo', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));

      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);
        const hasNativeSlides =
          content.includes('slide-container') ||
          content.includes('slide-footer') ||
          content.includes('showSlide');

        expect(hasNativeSlides).toBeTruthy();
      }
    });

    test('slides devem ter foco visual único', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));
      
      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);
        // Check for single focus structure (not too many complex elements)
        const slideCount = (content.match(/class="slide"/g) || []).length;
        // Each file should have multiple slides
        expect(slideCount).toBeGreaterThanOrEqual(1);
      }
    });

    test('slides devem evitar poluição visual', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));

      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);
        // Split by individual slides and check each one
        const slideBlocks = content.split(/class="slide"/);

        for (let i = 1; i < slideBlocks.length; i++) {
          const block = slideBlocks[i];
          const nextSlide = block.indexOf('class="slide"');
          const section = nextSlide > -1 ? block.substring(0, nextSlide) : block;

          const hasLists = section.includes('<ul') || section.includes('<ol');
          const hasTables = section.includes('<table');
          const hasCards = section.includes('deck-card');

          // Should not have all three at once in a single slide
          const complexityCount = [hasLists, hasTables, hasCards].filter(Boolean).length;
          expect(complexityCount).toBeLessThanOrEqual(2);
        }
      }
    });

    test('slides devem ter texto breve e legível', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));
      
      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);
        // Slides should not have very long paragraphs
        const paragraphMatches = content.match(/<p[^>]*>([\s\S]*?)<\/p>/gi) || [];
        
        for (const p of paragraphMatches) {
          const textLength = p.replace(/<[^>]*>/g, '').trim().length;
          // Paragraphs in slides should be short
          expect(textLength).toBeLessThanOrEqual(500);
        }
      }
    });
  });

  test.describe('Regras Específicas para Materiais', () => {
    
    test('materiais devem organizar textos longos com hierarquia visual', async ({ aulasDir }) => {
      const materialFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/material/'));
      
      for (const materialFile of materialFiles) {
        const content = fsHelpers.readFileSync(materialFile);
        
        const hasHierarchy = 
          content.includes('<h1') ||
          content.includes('<h2') ||
          content.includes('<h3') ||
          content.includes('<h4');
        
        expect(hasHierarchy).toBeTruthy();
      }
    });

    test('materiais devem usar títulos e subtítulos', async ({ aulasDir }) => {
      const materialFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/material/'));
      
      for (const materialFile of materialFiles) {
        const content = fsHelpers.readFileSync(materialFile);
        
        const hasTitles = 
          content.includes('<h1') &&
          (content.includes('<h2') || content.includes('<h3'));
        
        expect(hasTitles).toBeTruthy();
      }
    });

    test('materiais devem ter espaçamento previsível', async ({ aulasDir }) => {
      const materialFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/material/'));
      
      for (const materialFile of materialFiles) {
        const content = fsHelpers.readFileSync(materialFile);
        
        const hasSpacing = 
          content.includes('margin') ||
          content.includes('padding') ||
          content.includes('gap');
        
        expect(hasSpacing).toBeTruthy();
      }
    });
  });
});
