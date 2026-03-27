import { test as base, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

// Base test fixture with project root
export const test = base.extend<{
  projectRoot: string;
  specsDir: string;
  aulasDir: string;
  assetsDir: string;
}>({
  projectRoot: async ({}, use) => {
    const root = path.resolve(__dirname, '../..');
    await use(root);
  },
  specsDir: async ({ projectRoot }, use) => {
    const specsDir = path.join(projectRoot, 'specs');
    await use(specsDir);
  },
  aulasDir: async ({ projectRoot }, use) => {
    const aulasDir = path.join(projectRoot, 'aulas');
    await use(aulasDir);
  },
  assetsDir: async ({ projectRoot }, use) => {
    const assetsDir = path.join(projectRoot, 'assets');
    await use(assetsDir);
  },
});

export { expect };

// Helper functions for file system operations
export const fsHelpers = {
  readFileSync: (filePath: string): string => {
    return fs.readFileSync(filePath, 'utf-8');
  },

  fileExists: (filePath: string): boolean => {
    return fs.existsSync(filePath);
  },

  readDir: (dirPath: string): string[] => {
    return fs.readdirSync(dirPath);
  },

  isFile: (filePath: string): boolean => {
    return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
  },

  isDirectory: (dirPath: string): boolean => {
    return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  },

  getAllFiles: (dirPath: string, pattern?: RegExp): string[] => {
    const files: string[] = [];
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        files.push(...fsHelpers.getAllFiles(fullPath, pattern));
      } else if (!pattern || pattern.test(entry.name)) {
        files.push(fullPath);
      }
    }
    
    return files;
  },
};

// Helper functions for HTML parsing
export const htmlHelpers = {
  hasElement: (html: string, selector: string): boolean => {
    const regex = new RegExp(`<${selector}[^>]*>`, 'i');
    return regex.test(html);
  },

  hasLink: (html: string, hrefPattern: string | RegExp): boolean => {
    const regex = typeof hrefPattern === 'string' 
      ? new RegExp(`href=["']${hrefPattern}["']`, 'i')
      : hrefPattern;
    return regex.test(html);
  },

  hasText: (html: string, text: string | RegExp): boolean => {
    const regex = typeof text === 'string' 
      ? new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      : text;
    return regex.test(html);
  },

  getLinks: (html: string): Array<{ href: string; text: string }> => {
    const linkRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gi;
    const links: Array<{ href: string; text: string }> = [];
    let match;
    
    while ((match = linkRegex.exec(html)) !== null) {
      links.push({
        href: match[1],
        text: match[2].replace(/<[^>]*>/g, '').trim()
      });
    }
    
    return links;
  },

  hasRevealJs: (html: string): boolean => {
    return html.includes('reveal.js') || 
           html.includes('Reveal') || 
           html.includes('reveal.css') ||
           html.includes('reveal.min.css');
  },

  getComputedStyle: (html: string, property: string): string | null => {
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let match;
    
    while ((match = styleRegex.exec(html)) !== null) {
      const styleContent = match[1];
      const propRegex = new RegExp(`${property}\\s*:\\s*([^;]+)`, 'gi');
      const propMatch = propRegex.exec(styleContent);
      if (propMatch) {
        return propMatch[1].trim();
      }
    }
    
    return null;
  },
};

// Validation helpers for specs
export const specValidators = {
  // Validate snake_case naming
  isSnakeCase: (str: string): boolean => {
    const snakeCaseRegex = /^[a-z0-9]+(_[a-z0-9]+)*$/;
    return snakeCaseRegex.test(str);
  },

  // Validate file prefix
  hasPrefix: (filename: string, prefix: string): boolean => {
    return filename.startsWith(prefix);
  },

  // Validate HTML structure for slides
  validateSlideStructure: (html: string): Array<{ pass: boolean; message: string }> => {
    const results: Array<{ pass: boolean; message: string }> = [];
    
    // Check for reveal.js
    if (!htmlHelpers.hasRevealJs(html)) {
      results.push({ pass: false, message: 'Slide must use reveal.js' });
    } else {
      results.push({ pass: true, message: 'Uses reveal.js' });
    }
    
    // Check for navigation links
    if (!htmlHelpers.hasLink(html, /index\.html/)) {
      results.push({ pass: false, message: 'Missing link to index.html' });
    } else {
      results.push({ pass: true, message: 'Has link to index.html' });
    }
    
    if (!htmlHelpers.hasLink(html, /material/)) {
      results.push({ pass: false, message: 'Missing link to material' });
    } else {
      results.push({ pass: true, message: 'Has link to material' });
    }
    
    return results;
  },

  // Validate HTML structure for materials
  validateMaterialStructure: (html: string): Array<{ pass: boolean; message: string }> => {
    const results: Array<{ pass: boolean; message: string }> = [];
    
    // Check for navigation links
    if (!htmlHelpers.hasLink(html, /index\.html/)) {
      results.push({ pass: false, message: 'Missing link to index.html' });
    } else {
      results.push({ pass: true, message: 'Has link to index.html' });
    }
    
    if (!htmlHelpers.hasLink(html, /slide/)) {
      results.push({ pass: false, message: 'Missing link to slide' });
    } else {
      results.push({ pass: true, message: 'Has link to slide' });
    }
    
    // Check for exercises section
    if (!htmlHelpers.hasText(html, /Exercícios? de fixação/i)) {
      results.push({ pass: false, message: 'Missing "Exercícios de fixação" section' });
    } else {
      results.push({ pass: true, message: 'Has "Exercícios de fixação" section' });
    }
    
    return results;
  },

  // Validate design system colors
  validateColors: (html: string): Array<{ pass: boolean; message: string }> => {
    const results: Array<{ pass: boolean; message: string }> = [];
    
    // Check for white background
    const hasWhiteBg = html.includes('#FFFFFF') || 
                       html.includes('#fff') || 
                       html.includes('rgb(255, 255, 255)') ||
                       html.includes('background-color: white') ||
                       html.includes('background-color:#FFFFFF');
    
    if (!hasWhiteBg) {
      results.push({ pass: false, message: 'Missing white background (#FFFFFF)' });
    } else {
      results.push({ pass: true, message: 'Has white background' });
    }
    
    // Check for black/dark text
    const hasDarkText = html.includes('#000000') || 
                        html.includes('#000') || 
                        html.includes('rgb(0, 0, 0)') ||
                        html.includes('color: black') ||
                        html.includes('color:#000000');
    
    if (!hasDarkText) {
      results.push({ pass: false, message: 'Missing black text (#000000)' });
    } else {
      results.push({ pass: true, message: 'Has black text' });
    }
    
    return results;
  },
};
