# Blog Customization Design Specification
**개발하는 유에녹 (Enoch's Development Blog)**

## 1. Project Overview

### 1.1 Purpose
Transform the AstroWind template into a focused, readable Korean development blog that prioritizes content over features.

### 1.2 Core Philosophy
- **Reading-first design**: Optimize every element for content consumption
- **Minimalist approach**: Remove all non-essential features
- **Korean language support**: Native Korean content with proper typography
- **Category-driven organization**: Simple, clear content categorization

---

## 2. Site Identity

### 2.1 Branding
- **Blog Name**: `개발하는 유에녹` (Developing Enoch)
- **Author Name**: `유창연 (Enoch)`
- **Tagline**: `맨땅에 헤딩 전문가` (Expert at headbutting bare ground)
- **Description**: `기술과 개발에 대한 생각을 나누는 공간` (A space to share thoughts on technology and development)

### 2.2 Visual Identity
- Clean, minimal design focused on readability
- System font stack for optimal performance
- Generous whitespace around content
- High contrast for text readability

---

## 3. Information Architecture

### 3.1 Site Structure

```
개발하는 유에녹
├── 홈 (Home)
│   ├── 최근 게시글 목록
│   └── 프로필 섹션
├── 글 (Posts)
│   └── 전체 게시글 목록 (with pagination)
└── 카테고리 (Categories)
    └── 카테고리별 게시글 목록
```

### 3.2 Navigation Structure

**Header Navigation (Only 2 items):**
```
┌─────────────────────────────────────────┐
│  개발하는 유에녹    [글] [카테고리]     │
└─────────────────────────────────────────┘
```

- **글** → `/blog` (All blog posts)
- **카테고리** → `/category` (Category list page)

### 3.3 Pages to Keep
- `/` - Homepage (blog posts + profile)
- `/blog` - All posts list
- `/blog/[...page]` - Paginated posts
- `/category` - Categories overview
- `/category/[category]/[...page]` - Category-specific posts
- `/[slug]` - Individual post page

### 3.4 Pages to Remove
- ❌ `/homes/*` (SaaS, Startup, Mobile App, Personal)
- ❌ `/landing/*` (All landing page variants)
- ❌ `/services`
- ❌ `/pricing`
- ❌ `/about` (Profile integrated into homepage)
- ❌ `/contact` (Not needed for blog)
- ❌ `/terms`
- ❌ `/privacy`

---

## 4. Homepage Design

### 4.1 Layout Structure

```
┌───────────────────────────────────────────────┐
│  Header: 개발하는 유에녹  [글] [카테고리]    │
├───────────────────────────────────────────────┤
│                                               │
│  ┌─────────────────────────────────────────┐ │
│  │  프로필 섹션                            │ │
│  │  ┌───────┐                              │ │
│  │  │ 사진  │  유창연 (Enoch)              │ │
│  │  └───────┘  맨땅에 헤딩 전문가         │ │
│  │                                          │ │
│  │  간단한 자기소개 (2-3 문장)             │ │
│  └─────────────────────────────────────────┘ │
│                                               │
│  최근 게시글                                  │
│  ┌─────────────────────────────────────────┐ │
│  │  [카테고리] 게시글 제목                 │ │
│  │  발행일 · 읽는 시간                     │ │
│  │  게시글 요약...                          │ │
│  └─────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────┐ │
│  │  [카테고리] 게시글 제목                 │ │
│  │  발행일 · 읽는 시간                     │ │
│  │  게시글 요약...                          │ │
│  └─────────────────────────────────────────┘ │
│  ...                                          │
│                                               │
│  [더 많은 글 보기 →]                         │
│                                               │
├───────────────────────────────────────────────┤
│  Footer: Simple links                         │
└───────────────────────────────────────────────┘
```

### 4.2 Profile Section
- Compact, above-the-fold placement
- Profile image (if available)
- Name with English name in parentheses
- Tagline/bio
- Optional: Social links (GitHub, Email)

### 4.3 Blog Posts Section
- Show 6-10 most recent posts
- Each post card displays:
  - Category badge
  - Post title
  - Publication date
  - Reading time estimate
  - Excerpt (first 2-3 sentences)
- Clean card design with subtle borders
- "더 많은 글 보기" (See more posts) link to `/blog`

---

## 5. Blog Post Page Design

### 5.1 Post Layout

```
┌───────────────────────────────────────────────┐
│  Header                                       │
├───────────────────────────────────────────────┤
│                                               │
│  [카테고리]                                   │
│                                               │
│  # 게시글 제목                                │
│                                               │
│  발행일 · 읽는 시간 · 작성자                  │
│                                               │
│  ────────────────────────────────────────    │
│                                               │
│  게시글 본문 (최대 가독성 최적화)             │
│                                               │
│  - 70-80자 줄 길이                            │
│  - 1.6-1.8 줄 간격                            │
│  - 큰 폰트 (18-20px)                          │
│  - 코드 블록: Shiki 하이라이팅               │
│                                               │
│  ────────────────────────────────────────    │
│                                               │
│  관련 게시글 (같은 카테고리 4개)              │
│                                               │
├───────────────────────────────────────────────┤
│  Footer                                       │
└───────────────────────────────────────────────┘
```

### 5.2 Typography Standards
- **Title**: Large, bold (32-40px)
- **Body**: 18-20px, line-height 1.7-1.8
- **Code inline**: Monospace with subtle background
- **Code blocks**:
  - Shiki syntax highlighting
  - Line numbers optional
  - Copy button
  - Language indicator
- **Max width**: 70-80 characters (700-800px)

### 5.3 Reading Experience
- Centered content column
- Generous margins (16-20% on each side for desktop)
- Mobile: Full width with padding
- Smooth scrolling
- Subtle link styling (underline on hover)

---

## 6. Category System

### 6.1 Category Page (`/category`)
- Grid or list of all categories
- Each category shows:
  - Category name
  - Post count
  - Latest post date
- Click to view category posts

### 6.2 Category Posts Page (`/category/[category]`)
- Filtered list of posts in that category
- Same layout as main blog list
- Breadcrumb: 홈 > 카테고리 > [카테고리명]

### 6.3 Category Configuration
Categories will be defined in post frontmatter:
```yaml
---
title: "게시글 제목"
publishDate: 2025-01-15
category: "JavaScript"
tags: ["react", "hooks", "tutorial"]
excerpt: "간단한 요약..."
---
```

Common categories (examples):
- JavaScript
- React
- Backend
- DevOps
- Algorithm
- TIL (Today I Learned)

---

## 7. Configuration Changes

### 7.1 src/config.yaml

```yaml
site:
  name: "개발하는 유에녹"
  site: 'https://yoochangyeon.github.io'
  base: '/'
  trailingSlash: false

metadata:
  title:
    default: "개발하는 유에녹"
    template: "%s — 개발하는 유에녹"
  description: "기술과 개발에 대한 생각을 나누는 공간. 유창연(Enoch)의 개발 블로그입니다."
  robots:
    index: true
    follow: true
  openGraph:
    site_name: "개발하는 유에녹"
    type: website

i18n:
  language: ko
  textDirection: ltr

apps:
  blog:
    isEnabled: true
    postsPerPage: 10

    post:
      isEnabled: true
      permalink: '/%slug%'
      robots:
        index: true

    list:
      isEnabled: true
      pathname: 'blog'
      robots:
        index: true

    category:
      isEnabled: true
      pathname: 'category'
      robots:
        index: true

    tag:
      isEnabled: false  # Disable tags, use only categories

    isRelatedPostsEnabled: true
    relatedPostsCount: 4

ui:
  theme: 'system'
```

### 7.2 src/navigation.ts

```typescript
export const headerData = {
  links: [
    {
      text: '글',
      href: getBlogPermalink(),
    },
    {
      text: '카테고리',
      href: getPermalink('/category'),
    },
  ],
  actions: [], // Remove download button
};

export const footerData = {
  links: [
    {
      title: '블로그',
      links: [
        { text: '모든 글', href: getBlogPermalink() },
        { text: '카테고리', href: getPermalink('/category') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/yoochangyeon' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `© ${new Date().getFullYear()} 유창연 (Enoch). All rights reserved.`,
};
```

---

## 8. Author Profile Data

### 8.1 Author Information File

Create `src/data/author.json`:
```json
{
  "name": "유창연",
  "nameEn": "Enoch",
  "tagline": "맨땅에 헤딩 전문가",
  "bio": "백엔드 개발을 주로 하며, 새로운 기술을 배우는 것을 좋아합니다. 문제를 해결하는 과정에서 얻은 인사이트를 공유합니다.",
  "avatar": "~/assets/images/author.jpg",
  "social": {
    "github": "https://github.com/yoochangyeon",
    "email": "your-email@example.com"
  }
}
```

---

## 9. Implementation Phases

### Phase 1: Configuration & Structure ✅
1. Update `src/config.yaml` with new branding
2. Simplify `src/navigation.ts` to 2 menu items
3. Create author data file
4. Update i18n to Korean (`ko`)

### Phase 2: Page Cleanup 🔄
1. Delete unnecessary pages:
   - `/homes/*`
   - `/landing/*`
   - `/services.astro`
   - `/pricing.astro`
   - `/about.astro`
   - `/contact.astro`
   - `/terms.md`
   - `/privacy.md`
2. Keep only blog-related pages

### Phase 3: Homepage Redesign 📝
1. Replace `src/pages/index.astro` with blog-focused layout
2. Add profile section component
3. Display recent blog posts
4. Remove all marketing widgets (Hero, Features, CTA, etc.)

### Phase 4: Category System 📂
1. Create category overview page
2. Ensure category filtering works properly
3. Test category-based navigation

### Phase 5: Styling & Readability 🎨
1. Optimize typography for reading
2. Adjust code block styling
3. Ensure mobile responsiveness
4. Test dark/light mode

---

## 10. Technical Specifications

### 10.1 File Structure Changes

```
src/
├── config.yaml (✏️ Update)
├── navigation.ts (✏️ Update)
├── data/
│   └── author.json (➕ Create)
├── pages/
│   ├── index.astro (✏️ Complete redesign)
│   ├── [...blog]/ (✅ Keep)
│   ├── homes/ (❌ Delete)
│   ├── landing/ (❌ Delete)
│   ├── about.astro (❌ Delete)
│   ├── contact.astro (❌ Delete)
│   ├── services.astro (❌ Delete)
│   ├── pricing.astro (❌ Delete)
│   ├── terms.md (❌ Delete)
│   └── privacy.md (❌ Delete)
└── components/
    └── widgets/
        └── Profile.astro (➕ Create)
```

### 10.2 Component Requirements

**Profile.astro** - Author profile component
- Display author info
- Social links
- Reusable for homepage and sidebar

**BlogPostCard.astro** - Enhanced post card
- Category badge
- Reading time
- Clean, minimal design

---

## 11. Content Guidelines

### 11.1 Post Frontmatter Template
```yaml
---
publishDate: 2025-01-15T09:00:00Z
title: "게시글 제목"
excerpt: "게시글의 간단한 요약 (2-3 문장)"
category: "JavaScript"
tags: ["react", "hooks"]
draft: false
---
```

### 11.2 Writing Guidelines
- **Title**: Clear, descriptive Korean
- **Excerpt**: 2-3 sentences summarizing the post
- **Category**: Single primary category
- **Tags**: 2-5 related tags
- **Code blocks**: Always specify language
- **Images**: Use descriptive alt text

---

## 12. SEO & Performance

### 12.1 SEO Optimizations
- Korean meta descriptions
- Proper Open Graph tags
- Sitemap generation (enabled)
- RSS feed (enabled)
- Semantic HTML structure

### 12.2 Performance Targets
- Lighthouse score: 95+ for all metrics
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Optimized images (WebP)
- Minimal JavaScript

---

## 13. Success Criteria

### 13.1 Functionality
- ✅ Navigation shows only "글" and "카테고리"
- ✅ Homepage displays profile + recent posts
- ✅ Category system works correctly
- ✅ All blog posts render properly
- ✅ Code blocks have proper syntax highlighting
- ✅ Responsive on mobile and desktop

### 13.2 User Experience
- ✅ Reading is comfortable and pleasant
- ✅ Content is the primary focus
- ✅ Navigation is intuitive
- ✅ No distracting elements
- ✅ Fast page loads

### 13.3 Maintainability
- ✅ Easy to add new posts
- ✅ Simple category management
- ✅ Clear file structure
- ✅ Minimal configuration

---

## 14. Timeline

**Estimated Total**: 2-3 hours

- **Phase 1** (30 min): Configuration updates
- **Phase 2** (30 min): Page cleanup
- **Phase 3** (60 min): Homepage redesign
- **Phase 4** (30 min): Category system
- **Phase 5** (30 min): Final styling & testing

---

## 15. Notes & Considerations

### 15.1 Design Decisions
- **Why only 2 navigation items?**
  - Focus on content, reduce cognitive load
  - Blog is the primary purpose

- **Why remove About/Contact pages?**
  - Profile on homepage provides necessary info
  - Social links enable contact
  - Reduces maintenance burden

- **Why disable tags?**
  - Categories provide sufficient organization
  - Tags can create navigation complexity
  - Easier to maintain single taxonomy

### 15.2 Future Enhancements (Optional)
- Search functionality
- Dark mode toggle in header
- Newsletter subscription
- Comments system (e.g., Giscus)
- View count
- Table of contents for long posts

---

**Document Version**: 1.0
**Last Updated**: 2025-01-15
**Status**: Ready for Implementation
