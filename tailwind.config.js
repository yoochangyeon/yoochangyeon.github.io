import defaultTheme from 'tailwindcss/defaultTheme';
import plugin from 'tailwindcss/plugin';
import typographyPlugin from '@tailwindcss/typography';

export default {
  content: ['./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--aw-color-primary)',
        secondary: 'var(--aw-color-secondary)',
        accent: 'var(--aw-color-accent)',
        default: 'var(--aw-color-text-default)',
        muted: 'var(--aw-color-text-muted)',
      },
      fontFamily: {
        sans: ['var(--aw-font-sans, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
        serif: ['var(--aw-font-serif, ui-serif)', ...defaultTheme.fontFamily.serif],
        heading: ['var(--aw-font-heading, ui-sans-serif)', ...defaultTheme.fontFamily.sans],
      },

      animation: {
        fade: 'fadeInUp 1s both',
      },

      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(2rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: theme('colors.default'),
            lineHeight: '1.6',
            h1: {
              fontSize: '2em',
              lineHeight: '1.2',
              marginTop: '1.5em',
              marginBottom: '0.75em',
              fontWeight: '700',
            },
            h2: {
              fontSize: '1.5em',
              lineHeight: '1.3',
              marginTop: '1.5em',
              marginBottom: '0.65em',
              fontWeight: '700',
            },
            h3: {
              fontSize: '1.25em',
              lineHeight: '1.4',
              marginTop: '1.25em',
              marginBottom: '0.5em',
              fontWeight: '700',
            },
            h4: {
              fontSize: '1.125em',
              lineHeight: '1.4',
              marginTop: '1.25em',
              marginBottom: '0.5em',
              fontWeight: '600',
            },
            p: {
              marginTop: '1em',
              marginBottom: '1em',
            },
            'ul, ol': {
              marginTop: '1em',
              marginBottom: '1em',
            },
            li: {
              marginTop: '0.35em',
              marginBottom: '0.35em',
            },
            'ul > li, ol > li': {
              paddingLeft: '0.25em',
            },
            code: {
              fontSize: '0.9em',
            },
            pre: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
            blockquote: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
            },
          },
        },
        lg: {
          css: {
            lineHeight: '1.6',
            h1: {
              fontSize: '2.25em',
              lineHeight: '1.2',
              marginTop: '1.5em',
              marginBottom: '0.75em',
            },
            h2: {
              fontSize: '1.75em',
              lineHeight: '1.3',
              marginTop: '1.5em',
              marginBottom: '0.65em',
            },
            h3: {
              fontSize: '1.375em',
              lineHeight: '1.4',
              marginTop: '1.25em',
              marginBottom: '0.5em',
            },
            h4: {
              fontSize: '1.25em',
              lineHeight: '1.4',
              marginTop: '1.25em',
              marginBottom: '0.5em',
            },
            p: {
              marginTop: '1em',
              marginBottom: '1em',
            },
            'ul, ol': {
              marginTop: '1em',
              marginBottom: '1em',
            },
            li: {
              marginTop: '0.35em',
              marginBottom: '0.35em',
            },
          },
        },
      }),
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addVariant }) => {
      addVariant('intersect', '&:not([no-intersect])');
    }),
  ],
  darkMode: 'class',
};
