#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const dir = '/Users/chang-yeon/Repository/yoochangyeon.github.io/src/data/post';

const existingFiles = new Set([
  'http-caching-headers-complete-guide.mdx',
  'lambda-edge-image-resizing.mdx',
  'mysql-fulltext-index-implementation.mdx',
  'nestjs-configmodule-how-it-works.mdx',
  'nestjs-custom-caching-decorator.mdx',
  'vpc-peering-troubleshooting-guide.mdx',
]);

const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx') && !existingFiles.has(f));
let fixed = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) { console.log('SKIP (no frontmatter):', file); continue; }

  const frontmatter = match[1];
  const body = match[2];

  // Extract text from body, skipping images, headings, blockquotes, code blocks
  const textLines = body.split('\n')
    .filter(line => {
      const trimmed = line.trim();
      return trimmed.length > 0
        && !trimmed.startsWith('![')
        && !trimmed.startsWith('#')
        && !trimmed.startsWith('>')
        && !trimmed.startsWith('```')
        && !trimmed.startsWith('---')
        && !trimmed.startsWith('|');
    });

  const excerptText = textLines.slice(0, 5).join(' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/`/g, '')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 200);

  const newExcerpt = excerptText ? excerptText + '...' : '';

  const newFrontmatter = frontmatter.replace(
    /excerpt: ".*?"/s,
    'excerpt: "' + newExcerpt.replace(/"/g, '\\"') + '"'
  );

  if (newFrontmatter !== frontmatter) {
    const newContent = '---\n' + newFrontmatter + '\n---\n' + body;
    fs.writeFileSync(filePath, newContent, 'utf8');
    fixed++;
    console.log('Fixed:', file);
    console.log('  Excerpt:', newExcerpt.substring(0, 80) + '...');
  } else {
    console.log('OK:', file);
  }
}
console.log('\nFixed', fixed, 'files');
