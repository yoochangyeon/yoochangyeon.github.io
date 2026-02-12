import { getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [],
  actions: [],
};

export const footerData = {
  links: [
    {
      title: '블로그',
      links: [{ text: '모든 글', href: getBlogPermalink() }],
    },
  ],
  secondaryLinks: [],
  socialLinks: [
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/yoochangyeon' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `© ${new Date().getFullYear()} 유창연 (Enoch). All rights reserved.`,
};
