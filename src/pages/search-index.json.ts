import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { cleanSlug, POST_PERMALINK_PATTERN, BLOG_BASE } from '~/utils/permalinks';

export const GET: APIRoute = async () => {
  const posts = await getCollection('post');

  const searchIndex = posts
    .filter((post) => !post.data.draft)
    .map((post) => {
      const slug = cleanSlug(post.slug);
      const url = POST_PERMALINK_PATTERN.replace('%slug%', slug).replace('%category%', post.data.category?.toLowerCase() || 'uncategorized');

      return {
        title: post.data.title,
        excerpt: post.data.excerpt || '',
        category: post.data.category || 'Uncategorized',
        tags: post.data.tags || [],
        publishDate: post.data.publishDate?.toISOString() || new Date().toISOString(),
        url: `${BLOG_BASE}${url}`,
      };
    })
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  return new Response(JSON.stringify(searchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
