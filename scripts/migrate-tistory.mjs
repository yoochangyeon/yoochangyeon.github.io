#!/usr/bin/env node
/**
 * Tistory to Astro Blog Migration Script
 *
 * Reads extracted JSON files from /tmp/tistory-extract/
 * Downloads images locally and creates .mdx files
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const EXTRACT_DIR = '/tmp/tistory-extract';
const PROJECT_ROOT = '/Users/chang-yeon/Repository/yoochangyeon.github.io';
const POST_DIR = path.join(PROJECT_ROOT, 'src/data/post');
const IMAGE_BASE_DIR = path.join(PROJECT_ROOT, 'src/assets/images/posts');

// Category mapping from Tistory to Astro blog categories
const CATEGORY_MAP = {
  'Nestjs': 'Backend',
  'NestJS': 'Backend',
  'nestjs': 'Backend',
  'Spring': 'Backend',
  'spring': 'Backend',
  'AWS': 'DevOps',
  'aws': 'DevOps',
  'JPA': 'Backend',
  'jpa': 'Backend',
  '': 'Backend', // default
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s가-힣-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

function generateSlug(title, postId) {
  // Create meaningful English slugs based on content
  const slugMap = {
    3: 'xss-lucy-xss-filter',
    4: 'mobaxterm-aws-ec2-connection',
    5: 'aws-ec2-server-setup',
    6: 'swagger-annotations-guide',
    7: 'intellij-spring-mvc-setup',
    8: 'oop-concepts-and-usage',
    9: 'mysql-crud-operations',
    10: 'maven-introduction',
    15: 'mybatis-introduction',
    17: 'controller-vs-restcontroller',
    18: 'response-entity-guide',
    19: 'http-introduction',
    22: 'database-index-types',
    23: 'aws-s3-cloudfront-signed-url',
    24: 'ubuntu-jenkins-setup',
    25: 'jenkins-tomcat-integration',
    26: 'aws-ssl-certificate',
    27: 'aws-ssl-elb-integration',
    29: 'spring-boot-jpa-getting-started',
    30: 'jpa-entity-manager-persistence',
    32: 'jpa-primary-key-mapping',
    33: 'container-vs-server-virtualization',
    34: 'aws-mediaconvert-hls-lambda',
    35: 'spring-transaction-rollback-part1',
    36: 'spring-transaction-rollback-part2',
    37: 'reflection-why-it-exists',
    38: 'nestjs-request-lifecycle',
    39: 'datadog-prisma-opentelemetry-pr',
  };
  return slugMap[postId] || slugify(title);
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    const request = protocol.get(url, { timeout: 30000 }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        // Follow redirect
        downloadImage(response.headers.location, destPath).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode} for ${url}`));
        return;
      }

      const dir = path.dirname(destPath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

      const fileStream = fs.createWriteStream(destPath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(destPath);
      });
      fileStream.on('error', reject);
    });

    request.on('error', reject);
    request.on('timeout', () => {
      request.destroy();
      reject(new Error(`Timeout downloading ${url}`));
    });
  });
}

function getImageExtension(url) {
  const match = url.match(/\/(img)\.(png|jpg|jpeg|gif|webp|svg)/i);
  if (match) return `.${match[2]}`;
  if (url.includes('.png')) return '.png';
  if (url.includes('.jpg') || url.includes('.jpeg')) return '.jpg';
  if (url.includes('.gif')) return '.gif';
  if (url.includes('.webp')) return '.webp';
  return '.png'; // default for Tistory
}

async function processPost(jsonFile) {
  const data = JSON.parse(fs.readFileSync(path.join(EXTRACT_DIR, jsonFile), 'utf8'));
  const postId = parseInt(jsonFile.replace('post-', '').replace('.json', ''));
  const slug = generateSlug(data.title, postId);

  console.log(`\nProcessing post ${postId}: ${data.title}`);
  console.log(`  Slug: ${slug}`);

  // Skip posts with broken/incomplete content
  if (data.markdown.length < MIN_MARKDOWN_LENGTH) {
    console.log(`  ⚠ Skipping - markdown too short (${data.markdown.length} chars), likely broken extraction`);
    return null;
  }

  const category = POST_CATEGORY_MAP[postId] || CATEGORY_MAP[data.category] || 'Backend';

  // Parse date
  let publishDate = data.date;
  if (publishDate && publishDate.includes('T')) {
    publishDate = publishDate.split('T')[0] + 'T00:00:00Z';
  } else if (publishDate) {
    publishDate = publishDate + 'T00:00:00Z';
  } else {
    publishDate = '2021-04-09T00:00:00Z'; // fallback
  }

  // Download images
  let markdown = data.markdown;
  const imageDir = path.join(IMAGE_BASE_DIR, slug);

  if (data.images && data.images.length > 0) {
    console.log(`  Downloading ${data.images.length} images...`);

    for (const img of data.images) {
      const ext = getImageExtension(img.src);
      const imageName = `image-${img.index}${ext}`;
      const localPath = path.join(imageDir, imageName);
      const relativePath = `~/assets/images/posts/${slug}/${imageName}`;

      try {
        await downloadImage(img.src, localPath);
        // Replace image URL in markdown
        markdown = markdown.replace(img.src, relativePath);
        console.log(`    ✓ Downloaded image-${img.index}${ext}`);
      } catch (err) {
        console.log(`    ✗ Failed to download image-${img.index}: ${err.message}`);
      }
    }
  }

  // Generate frontmatter
  const frontmatter = [
    '---',
    `publishDate: ${publishDate}`,
    `author: "유창연"`,
    `title: "${data.title.replace(/"/g, '\\"')}"`,
    `excerpt: "${(data.markdown.substring(0, 150).replace(/\n/g, ' ').replace(/"/g, '\\"').replace(/#/g, '').trim())}..."`,
    `category: "${category}"`,
    `tags: ${JSON.stringify(data.tags && data.tags.length > 0 ? data.tags : (TAG_MAP[postId] || ['development']))}`,
    `draft: false`,
    '---',
  ].join('\n');

  const mdxContent = `${frontmatter}\n\n${markdown}\n`;

  const outputPath = path.join(POST_DIR, `${slug}.mdx`);
  fs.writeFileSync(outputPath, mdxContent, 'utf8');
  console.log(`  ✓ Created ${slug}.mdx`);

  return { postId, slug, title: data.title, imagesCount: data.images?.length || 0 };
}

// Post ID -> tags mapping
const TAG_MAP = {
  3: ['xss', 'security', 'spring', 'lucy-xss-filter'],
  4: ['aws', 'ec2', 'mobaxterm', 'ssh'],
  5: ['aws', 'ec2', 'infrastructure'],
  6: ['swagger', 'api-docs', 'spring'],
  7: ['intellij', 'spring-mvc', 'setup'],
  8: ['oop', 'java', 'programming-concepts'],
  9: ['mysql', 'crud', 'database'],
  10: ['maven', 'java', 'build-tool'],
  15: ['mybatis', 'java', 'orm'],
  17: ['spring', 'controller', 'restcontroller'],
  18: ['spring', 'responseentity', 'rest-api'],
  19: ['http', 'web', 'protocol'],
  22: ['database', 'index', 'performance'],
  23: ['aws', 's3', 'cloudfront', 'signed-url'],
  24: ['ubuntu', 'jenkins', 'ci-cd'],
  25: ['jenkins', 'tomcat', 'deployment'],
  26: ['aws', 'ssl', 'certificate'],
  27: ['aws', 'ssl', 'elb', 'load-balancer'],
  29: ['spring-boot', 'jpa', 'getting-started'],
  30: ['jpa', 'entity-manager', 'persistence'],
  32: ['jpa', 'primary-key', 'id-mapping'],
  33: ['container', 'docker', 'virtualization'],
  34: ['aws', 'mediaconvert', 'lambda', 'hls', 'cloudfront'],
  35: ['spring', 'transaction', 'rollback'],
  36: ['spring', 'transaction', 'rollback', 'propagation'],
  37: ['reflection', 'java', 'programming-concepts'],
  38: ['nestjs', 'request-lifecycle', 'middleware', 'body-parser'],
  39: ['datadog', 'prisma', 'opentelemetry', 'open-source'],
};

// Post ID -> category mapping
const POST_CATEGORY_MAP = {
  3: 'Backend', 4: 'DevOps', 5: 'DevOps', 6: 'Backend', 7: 'Backend',
  8: 'Backend', 9: 'Backend', 10: 'Backend', 15: 'Backend', 17: 'Backend',
  18: 'Backend', 19: 'Backend', 22: 'Backend', 23: 'DevOps', 24: 'DevOps',
  25: 'DevOps', 26: 'DevOps', 27: 'DevOps', 29: 'Backend', 30: 'Backend',
  32: 'Backend', 33: 'DevOps', 34: 'DevOps', 35: 'Backend', 36: 'Backend',
  37: 'Backend', 38: 'Backend', 39: 'Backend',
};

// Minimum markdown length to consider a post valid
const MIN_MARKDOWN_LENGTH = 50;

async function main() {
  console.log('=== Tistory to Astro Blog Migration ===\n');

  // Read all JSON files
  const files = fs.readdirSync(EXTRACT_DIR)
    .filter(f => f.startsWith('post-') && f.endsWith('.json'))
    .sort((a, b) => {
      const idA = parseInt(a.replace('post-', '').replace('.json', ''));
      const idB = parseInt(b.replace('post-', '').replace('.json', ''));
      return idA - idB;
    });

  console.log(`Found ${files.length} extracted posts\n`);

  // Ensure directories exist
  if (!fs.existsSync(POST_DIR)) fs.mkdirSync(POST_DIR, { recursive: true });
  if (!fs.existsSync(IMAGE_BASE_DIR)) fs.mkdirSync(IMAGE_BASE_DIR, { recursive: true });

  const results = [];
  const skipped = [];
  for (const file of files) {
    try {
      const result = await processPost(file);
      if (result) {
        results.push(result);
      } else {
        skipped.push(file);
      }
    } catch (err) {
      console.error(`  ✗ Error processing ${file}: ${err.message}`);
    }
  }

  console.log('\n=== Migration Summary ===');
  console.log(`Successfully migrated: ${results.length}/${files.length} posts`);
  if (skipped.length > 0) {
    console.log(`Skipped (broken): ${skipped.length} posts - ${skipped.join(', ')}`);
  }
  console.log(`Total images downloaded: ${results.reduce((sum, r) => sum + r.imagesCount, 0)}`);
  results.forEach(r => {
    console.log(`  ${r.postId}: ${r.slug} (${r.imagesCount} images)`);
  });
}

main().catch(console.error);
