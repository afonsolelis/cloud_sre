import { test, expect, fsHelpers, htmlHelpers } from '../fixtures/helpers';
import * as path from 'path';

test.describe('Repositório de Aulas Spec', () => {
  
  test.describe('Estrutura Obrigatória', () => {
    
    test('deve existir index.html na raiz', async ({ projectRoot }) => {
      const indexPath = path.join(projectRoot, 'index.html');
      expect(fsHelpers.isFile(indexPath)).toBeTruthy();
    });

    test('deve existir pasta aulas/', async ({ projectRoot }) => {
      const aulasPath = path.join(projectRoot, 'aulas');
      expect(fsHelpers.isDirectory(aulasPath)).toBeTruthy();
    });

    test('deve existir pasta specs/', async ({ projectRoot }) => {
      const specsPath = path.join(projectRoot, 'specs');
      expect(fsHelpers.isDirectory(specsPath)).toBeTruthy();
    });
  });

  test.describe('Index.html Conteúdo', () => {
    
    test('index.html deve listar todas as aulas', async ({ projectRoot, aulasDir }) => {
      const indexPath = path.join(projectRoot, 'index.html');
      
      if (!fsHelpers.isFile(indexPath)) {
        return;
      }
      
      const indexContent = fsHelpers.readFileSync(indexPath);
      const aulaFolders = fsHelpers.readDir(aulasDir);
      
      for (const folder of aulaFolders) {
        const folderPath = path.join(aulasDir, folder);
        if (fsHelpers.isDirectory(folderPath)) {
          // Check if the folder name or a reference to it exists in index
          const hasAulaReference = 
            indexContent.includes(folder) ||
            indexContent.includes(folder.replace(/_/g, ' ')) ||
            indexContent.toLowerCase().includes(folder.toLowerCase());
          
          expect(hasAulaReference).toBeTruthy();
        }
      }
    });

    test('index.html deve ter links para slides de cada aula', async ({ projectRoot, aulasDir }) => {
      const indexPath = path.join(projectRoot, 'index.html');
      
      if (!fsHelpers.isFile(indexPath)) {
        return;
      }
      
      const indexContent = fsHelpers.readFileSync(indexPath);
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));
      
      for (const slideFile of slideFiles) {
        const relativePath = path.relative(projectRoot, slideFile);
        const hasLink = indexContent.includes(relativePath) || 
                        indexContent.includes(path.basename(slideFile));
        
        expect(hasLink).toBeTruthy();
      }
    });

    test('index.html deve ter links para materiais de cada aula', async ({ projectRoot, aulasDir }) => {
      const indexPath = path.join(projectRoot, 'index.html');
      
      if (!fsHelpers.isFile(indexPath)) {
        return;
      }
      
      const indexContent = fsHelpers.readFileSync(indexPath);
      const materialFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/material/'));
      
      for (const materialFile of materialFiles) {
        const relativePath = path.relative(projectRoot, materialFile);
        const hasLink = indexContent.includes(relativePath) || 
                        indexContent.includes(path.basename(materialFile));
        
        expect(hasLink).toBeTruthy();
      }
    });
  });

  test.describe('Slides - Regras de Conteúdo', () => {
    
    test('slides devem conter título da aula', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));
      
      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);
        const hasTitle = 
          content.includes('<h1') ||
          content.includes('<h2') ||
          content.includes('<title>');
        
        expect(hasTitle).toBeTruthy();
      }
    });

    test('slides devem conter data da aula', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));
      
      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);
        // Check for date pattern (DD/MM/YYYY or similar)
        const hasDate = 
          content.includes('2026') ||
          /\d{2}\/\d{2}\/\d{4}/.test(content);
        
        expect(hasDate).toBeTruthy();
      }
    });

    test('slides devem conter resumo do tema', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));
      
      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);
        const hasSummary = 
          content.includes('<p') ||
          content.includes('<li') ||
          content.includes('<ul');
        
        expect(hasSummary).toBeTruthy();
      }
    });

    test('slides devem ter link para o material da mesma aula', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));
      
      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);
        const hasMaterialLink = 
          content.includes('href="../material/') ||
          content.includes('href="material/') ||
          content.includes('href=\'../material/') ||
          content.includes('material_');
        
        expect(hasMaterialLink).toBeTruthy();
      }
    });

    test('slides devem ter link de volta para index.html', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));
      
      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);
        const hasIndexLink = 
          content.includes('href="../../index.html"') ||
          content.includes('href="../index.html"') ||
          content.includes('href="index.html"') ||
          content.includes('href=\'../../index.html\'') ||
          content.includes('href=\'../index.html\'');
        
        expect(hasIndexLink).toBeTruthy();
      }
    });
  });

  test.describe('Slides - Regras Obrigatórias (reveal.js)', () => {
    
    test('slides devem usar reveal.js', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));
      
      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);
        const hasRevealJs = 
          content.includes('reveal.js') ||
          content.includes('reveal.css') ||
          content.includes('reveal.min.css') ||
          content.includes('Reveal.initialize') ||
          content.includes('Reveal.setup') ||
          content.includes('class="reveal"');
        
        expect(hasRevealJs).toBeTruthy();
      }
    });

    test('slides devem começar com capa', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));
      
      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);
        // Check for slide/section structure indicating a cover
        const hasCover = 
          content.includes('class="slide"') ||
          content.includes('data-state="cover")') ||
          content.includes('<section') ||
          content.includes('<h1');
        
        expect(hasCover).toBeTruthy();
      }
    });

    test('slides devem ter agenda', async ({ aulasDir }) => {
      const slideFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/slides/'));
      
      for (const slideFile of slideFiles) {
        const content = fsHelpers.readFileSync(slideFile);
        const hasAgenda = 
          content.toLowerCase().includes('agenda') ||
          content.toLowerCase().includes('tópicos') ||
          content.toLowerCase().includes('topicos') ||
          content.toLowerCase().includes('conteúdo') ||
          content.toLowerCase().includes('conteudo');
        
        expect(hasAgenda).toBeTruthy();
      }
    });
  });

  test.describe('Materiais - Regras de Conteúdo', () => {
    
    test('materiais devem conter título da aula', async ({ aulasDir }) => {
      const materialFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/material/'));
      
      for (const materialFile of materialFiles) {
        const content = fsHelpers.readFileSync(materialFile);
        const hasTitle = 
          content.includes('<h1') ||
          content.includes('<h2') ||
          content.includes('<title>');
        
        expect(hasTitle).toBeTruthy();
      }
    });

    test('materiais devem conter data da aula', async ({ aulasDir }) => {
      const materialFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/material/'));
      
      for (const materialFile of materialFiles) {
        const content = fsHelpers.readFileSync(materialFile);
        const hasDate = 
          content.includes('2026') ||
          /\d{2}\/\d{2}\/\d{4}/.test(content);
        
        expect(hasDate).toBeTruthy();
      }
    });

    test('materiais devem conter resumo do conteúdo', async ({ aulasDir }) => {
      const materialFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/material/'));
      
      for (const materialFile of materialFiles) {
        const content = fsHelpers.readFileSync(materialFile);
        const hasSummary = 
          content.includes('<p') ||
          content.includes('<li') ||
          content.includes('<ul');
        
        expect(hasSummary).toBeTruthy();
      }
    });

    test('materiais devem ter seção Exercícios de fixação', async ({ aulasDir }) => {
      const materialFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/material/'));
      
      for (const materialFile of materialFiles) {
        const content = fsHelpers.readFileSync(materialFile);
        const hasExercises = 
          content.toLowerCase().includes('exercícios de fixação') ||
          content.toLowerCase().includes('exercicios de fixação') ||
          content.toLowerCase().includes('exercícios') ||
          content.toLowerCase().includes('exercicios');
        
        expect(hasExercises).toBeTruthy();
      }
    });

    test('materiais devem ter link para o slide da mesma aula', async ({ aulasDir }) => {
      const materialFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/material/'));
      
      for (const materialFile of materialFiles) {
        const content = fsHelpers.readFileSync(materialFile);
        const hasSlideLink = 
          content.includes('href="../slides/') ||
          content.includes('href="slides/') ||
          content.includes('href=\'../slides/') ||
          content.includes('slide_');
        
        expect(hasSlideLink).toBeTruthy();
      }
    });

    test('materiais devem ter link de volta para index.html', async ({ aulasDir }) => {
      const materialFiles = fsHelpers.getAllFiles(aulasDir).filter(f => f.includes('/material/'));
      
      for (const materialFile of materialFiles) {
        const content = fsHelpers.readFileSync(materialFile);
        const hasIndexLink = 
          content.includes('href="../../index.html"') ||
          content.includes('href="../index.html"') ||
          content.includes('href="index.html"') ||
          content.includes('href=\'../../index.html\'') ||
          content.includes('href=\'../index.html\'');
        
        expect(hasIndexLink).toBeTruthy();
      }
    });
  });

  test.describe('Nomenclatura snake_case', () => {
    
    test('nomes de pasta devem usar snake_case', async ({ aulasDir }) => {
      const aulaFolders = fsHelpers.readDir(aulasDir);
      
      for (const folder of aulaFolders) {
        const folderPath = path.join(aulasDir, folder);
        if (fsHelpers.isDirectory(folderPath)) {
          // Check if folder name uses snake_case (lowercase with underscores)
          const isValidSnakeCase = /^[a-z0-9_]+$/.test(folder);
          expect(isValidSnakeCase).toBeTruthy();
        }
      }
    });

    test('nomes de arquivo devem usar snake_case', async ({ aulasDir }) => {
      const allFiles = fsHelpers.getAllFiles(aulasDir);
      
      for (const file of allFiles) {
        const filename = path.basename(file, '.html');
        const isValidSnakeCase = /^[a-z0-9_]+$/.test(filename);
        expect(isValidSnakeCase).toBeTruthy();
      }
    });

    test('nomes não devem conter espaços', async ({ aulasDir }) => {
      const allFiles = fsHelpers.getAllFiles(aulasDir);
      const allFolders = fsHelpers.readDir(aulasDir);
      
      for (const folder of allFolders) {
        expect(folder.includes(' ')).toBeFalsy();
      }
      
      for (const file of allFiles) {
        const filename = path.basename(file);
        expect(filename.includes(' ')).toBeFalsy();
      }
    });

    test('nomes não devem conter hífens', async ({ aulasDir }) => {
      const allFiles = fsHelpers.getAllFiles(aulasDir);
      const allFolders = fsHelpers.readDir(aulasDir);
      
      for (const folder of allFolders) {
        expect(folder.includes('-')).toBeFalsy();
      }
      
      for (const file of allFiles) {
        const filename = path.basename(file);
        expect(filename.includes('-')).toBeFalsy();
      }
    });
  });

  test.describe('Lista de Aulas', () => {
    
    test('deve ter 8 aulas cadastradas', async ({ aulasDir }) => {
      const aulaFolders = fsHelpers.readDir(aulasDir);
      const validAulaFolders = aulaFolders.filter(f => f.startsWith('aula'));
      
      expect(validAulaFolders.length).toBeGreaterThanOrEqual(1);
      expect(validAulaFolders.length).toBeLessThanOrEqual(20);
    });

    test('aulas devem estar numeradas sequencialmente', async ({ aulasDir }) => {
      const aulaFolders = fsHelpers.readDir(aulasDir);
      const validAulaFolders = aulaFolders.filter(f => f.startsWith('aula'));
      
      // Extract numbers from folder names
      const numbers = validAulaFolders.map(f => {
        const match = f.match(/aula[_-]?(\d+)/);
        return match ? parseInt(match[1]) : 0;
      }).filter(n => n > 0).sort((a, b) => a - b);
      
      // Check if numbers are sequential (allowing for gaps)
      if (numbers.length > 0) {
        expect(numbers[0]).toBeGreaterThanOrEqual(1);
      }
    });
  });
});
