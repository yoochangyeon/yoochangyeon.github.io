# 개발 블로그

Astro로 구축한 기술 블로그입니다.

## 특징

- **가독성 최적화**: 70자 너비의 최적화된 텍스트 레이아웃
- **반응형 디자인**: 모바일과 데스크탑 모두에서 완벽한 가독성
- **코드 하이라이팅**: Shiki를 활용한 아름다운 코드 블럭
- **빠른 로딩**: Astro의 정적 사이트 생성으로 초고속 페이지 로드

## 기술 스택

- [Astro](https://astro.build/) - 정적 사이트 생성기
- [Tailwind CSS](https://tailwindcss.com/) - 유틸리티 CSS 프레임워크
- [Shiki](https://shiki.matsu.io/) - 코드 하이라이팅

## 로컬 개발

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 게시글 작성

`src/content/posts/` 디렉토리에 마크다운 파일을 생성하세요.

```markdown
---
title: "게시글 제목"
description: "게시글 설명"
publishDate: 2025-10-10
tags: ["태그1", "태그2"]
---

게시글 내용...
```

## 배포

GitHub Actions를 통해 자동으로 GitHub Pages에 배포됩니다.

## 라이선스

MIT
