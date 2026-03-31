import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Sonity',
  tagline: 'Your #1 LinkedIn automation tool',
  favicon: 'images/sonity.png',

  // Set the production url of your site here
  url: 'https://docs.sonity.net',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/user-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'sonity-ops', // Usually your GitHub org/user name.
  projectName: 'user-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
 plugins: [require.resolve('docusaurus-lunr-search')],
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: '',
      logo: {
        alt: 'My Site Logo',
        src: 'img/Sonity Logo-03.svg',
        style: {
          // width: '100px',
          height: '230%',
          position: "relative",
          bottom: "70%",
          left: "",
        }
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Support',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        // {
        //   href: 'https://github.com/facebook/docusaurus',
        //   label: 'GitHub',
        //   position: 'right',
        // },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Campaigns',
              to: '/docs/category/campaigns',
            },
            {
              label: 'Integration',
              to: '/docs/category/integration',
            },
            {
              label: 'Account Management',
              to: '/docs/category/managing-your-account',
            },
            {
              label: 'Using Sonity',
              to: '/docs/category/using-sonity',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Linked In',
              href: 'https://www.linkedin.com/company/sonity-ltd',
            }
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Website',
              href: 'https://sonity.info',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Sonity, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
