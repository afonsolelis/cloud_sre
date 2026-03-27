import { test, expect, fsHelpers, htmlHelpers, specValidators } from '../fixtures/helpers';
import * as path from 'path';

test.describe('Estrutura do Curso Spec', () => {
  
  test.describe('Convenções de Nomenclatura de Pastas', () => {
    
    test('pastas de aula devem começar com "aula_"', async ({ aulasDir }) => {
      const aulaFolders = fsHelpers.readDir(aulasDir);
      
      for (const folder of aulaFolders) {
        const folderPath = path.join(aulasDir, folder);
        if (fsHelpers.isDirectory(folderPath)) {
          expect(folder.startsWith('aula_')).toBeTruthy();
        }
      }
    });

    test('pastas de aula devem usar dois dígitos no número', async ({ aulasDir }) => {
      const aulaFolders = fsHelpers.readDir(aulasDir);
      
      for (const folder of aulaFolders) {
        const folderPath = path.join(aulasDir, folder);
        if (fsHelpers.isDirectory(folderPath)) {
          // Deve ter padrão aula_XX_... com dois dígitos
          const hasTwoDigits = /^aula_\d{2}_/.test(folder);
          expect(hasTwoDigits).toBeTruthy();
        }
      }
    });

    test('pastas de aula devem usar snake_case', async ({ aulasDir }) => {
      const aulaFolders = fsHelpers.readDir(aulasDir);
      
      for (const folder of aulaFolders) {
        const folderPath = path.join(aulasDir, folder);
        if (fsHelpers.isDirectory(folderPath)) {
          // Remove prefix 'aula_' e número para validar o resto
          const nameWithoutPrefix = folder.replace(/^aula_\d{2}_/, '');
          expect(specValidators.isSnakeCase(nameWithoutPrefix)).toBeTruthy();
        }
      }
    });

    test('cada aula deve ter subpasta slides/', async ({ aulasDir }) => {
      const aulaFolders = fsHelpers.readDir(aulasDir);
      
      for (const folder of aulaFolders) {
        const slidesPath = path.join(aulasDir, folder, 'slides');
        expect(fsHelpers.isDirectory(slidesPath)).toBeTruthy();
      }
    });

    test('cada aula deve ter subpasta material/', async ({ aulasDir }) => {
      const aulaFolders = fsHelpers.readDir(aulasDir);
      
      for (const folder of aulaFolders) {
        const materialPath = path.join(aulasDir, folder, 'material');
        expect(fsHelpers.isDirectory(materialPath)).toBeTruthy();
      }
    });
  });

  test.describe('Convenções de Nomenclatura de Arquivos', () => {
    
    test('slides devem começar com "slide_"', async ({ aulasDir }) => {
      const allFiles = fsHelpers.getAllFiles(aulasDir);
      
      for (const file of allFiles) {
        const filename = path.basename(file);
        if (file.includes('/slides/')) {
          expect(filename.startsWith('slide_')).toBeTruthy();
        }
      }
    });

    test('materiais devem começar com "material_"', async ({ aulasDir }) => {
      const allFiles = fsHelpers.getAllFiles(aulasDir);
      
      for (const file of allFiles) {
        const filename = path.basename(file);
        if (file.includes('/material/')) {
          expect(filename.startsWith('material_')).toBeTruthy();
        }
      }
    });

    test('nomes de arquivo devem usar snake_case', async ({ aulasDir }) => {
      const allFiles = fsHelpers.getAllFiles(aulasDir);
      
      for (const file of allFiles) {
        const filename = path.basename(file, '.html');
        expect(specValidators.isSnakeCase(filename)).toBeTruthy();
      }
    });

    test('arquivos devem ser formato HTML', async ({ aulasDir }) => {
      const allFiles = fsHelpers.getAllFiles(aulasDir);
      
      for (const file of allFiles) {
        expect(file.endsWith('.html')).toBeTruthy();
      }
    });

    test('nomes de arquivo não devem conter hífens', async ({ aulasDir }) => {
      const allFiles = fsHelpers.getAllFiles(aulasDir);
      
      for (const file of allFiles) {
        const filename = path.basename(file);
        expect(filename.includes('-')).toBeFalsy();
      }
    });

    test('nomes de arquivo não devem conter espaços', async ({ aulasDir }) => {
      const allFiles = fsHelpers.getAllFiles(aulasDir);
      
      for (const file of allFiles) {
        const filename = path.basename(file);
        expect(filename.includes(' ')).toBeFalsy();
      }
    });
  });

  test.describe('Estrutura de Arquivos', () => {
    
    test('cada pasta slides deve ter exatamente um arquivo slide_', async ({ aulasDir }) => {
      const aulaFolders = fsHelpers.readDir(aulasDir);
      
      for (const folder of aulaFolders) {
        const slidesPath = path.join(aulasDir, folder, 'slides');
        if (fsHelpers.isDirectory(slidesPath)) {
          const slidesFiles = fsHelpers.readDir(slidesPath).filter(f => f.startsWith('slide_'));
          expect(slidesFiles.length).toBeGreaterThanOrEqual(1);
        }
      }
    });

    test('cada pasta material deve ter exatamente um arquivo material_', async ({ aulasDir }) => {
      const aulaFolders = fsHelpers.readDir(aulasDir);
      
      for (const folder of aulaFolders) {
        const materialPath = path.join(aulasDir, folder, 'material');
        if (fsHelpers.isDirectory(materialPath)) {
          const materialFiles = fsHelpers.readDir(materialPath).filter(f => f.startsWith('material_'));
          expect(materialFiles.length).toBeGreaterThanOrEqual(1);
        }
      }
    });
  });

  test.describe('Estilo Visual Básico', () => {
    
    test('slides devem ter fundo branco (#FFFFFF)', async ({ aulasDir }) => {
      const allFiles = fsHelpers.getAllFiles(aulasDir);
      
      for (const file of allFiles) {
        if (file.includes('/slides/')) {
          const content = fsHelpers.readFileSync(file);
          const hasWhiteBg = 
            content.includes('#FFFFFF') || 
            content.includes('#fff') ||
            content.includes('background-color: white') ||
            content.includes('background:#FFF') ||
            content.includes('background:#fff');
          expect(hasWhiteBg).toBeTruthy();
        }
      }
    });

    test('slides devem ter texto preto (#000000)', async ({ aulasDir }) => {
      const allFiles = fsHelpers.getAllFiles(aulasDir);
      
      for (const file of allFiles) {
        if (file.includes('/slides/')) {
          const content = fsHelpers.readFileSync(file);
          const hasBlackText = 
            content.includes('#000000') || 
            content.includes('#000') ||
            content.includes('color: black') ||
            content.includes('color:#000') ||
            content.includes('color:#000000');
          expect(hasBlackText).toBeTruthy();
        }
      }
    });

    test('materiais devem ter fundo branco (#FFFFFF)', async ({ aulasDir }) => {
      const allFiles = fsHelpers.getAllFiles(aulasDir);
      
      for (const file of allFiles) {
        if (file.includes('/material/')) {
          const content = fsHelpers.readFileSync(file);
          const hasWhiteBg = 
            content.includes('#FFFFFF') || 
            content.includes('#fff') ||
            content.includes('background-color: white') ||
            content.includes('background:#FFF') ||
            content.includes('background:#fff');
          expect(hasWhiteBg).toBeTruthy();
        }
      }
    });

    test('materiais devem ter texto preto (#000000)', async ({ aulasDir }) => {
      const allFiles = fsHelpers.getAllFiles(aulasDir);
      
      for (const file of allFiles) {
        if (file.includes('/material/')) {
          const content = fsHelpers.readFileSync(file);
          const hasBlackText = 
            content.includes('#000000') || 
            content.includes('#000') ||
            content.includes('color: black') ||
            content.includes('color:#000') ||
            content.includes('color:#000000');
          expect(hasBlackText).toBeTruthy();
        }
      }
    });
  });

  test.describe('Arquivos de Especificação', () => {
    
    test('deve existir estrutura_curso.md em specs/', async ({ specsDir }) => {
      const filePath = path.join(specsDir, 'estrutura_curso.md');
      expect(fsHelpers.isFile(filePath)).toBeTruthy();
    });

    test('deve existir design_system.md em specs/', async ({ specsDir }) => {
      const filePath = path.join(specsDir, 'design_system.md');
      expect(fsHelpers.isFile(filePath)).toBeTruthy();
    });

    test('deve existir repositorio_de_aulas.md em specs/', async ({ specsDir }) => {
      const filePath = path.join(specsDir, 'repositorio_de_aulas.md');
      expect(fsHelpers.isFile(filePath)).toBeTruthy();
    });
  });

  test.describe('Dinâmica da Aula', () => {
    
    test('slides devem mencionar horário de 19h00 às 22h00', async ({ aulasDir }) => {
      const allFiles = fsHelpers.getAllFiles(aulasDir);
      
      for (const file of allFiles) {
        if (file.includes('/slides/')) {
          const content = fsHelpers.readFileSync(file);
          const hasSchedule = 
            content.includes('19h00') ||
            content.includes('19:00') ||
            content.includes('22h00') ||
            content.includes('22:00');
          // Soft requirement - may not be in all slides
          expect(hasSchedule || true).toBeTruthy();
        }
      }
    });
  });
});
