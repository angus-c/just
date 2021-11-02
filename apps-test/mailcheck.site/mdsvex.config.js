import mdsvexUrlToImport from './mdsvex-url-to-import.js';
import remarkGithub from 'remark-github';
import remarkAbbr from 'remark-abbr';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const config = {
  layout: {
    _: './src/lib/MdLayouts/ArticleLayout.svelte',
    faq: './src/lib/MdLayouts/FaqLayout/FaqLayout.svelte'
  },
  extensions: ['.svelte.md', '.md', '.svx'],
  smartypants: {
    dashes: 'oldschool'
  },
  remarkPlugins: [
    [
      mdsvexUrlToImport,
      remarkGithub,
      {
        // Use your own repository
        repository: 'https://github.com/svelte-add/mdsvex.git'
      }
    ],
    remarkAbbr
  ],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypeAutolinkHeadings,
      {
        behavior: 'wrap'
      }
    ]
  ]
};

export default config;
