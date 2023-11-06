import path from 'path';

const config = {
  stories: ['../src/app/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-links', {
    name: path.dirname(require.resolve('@storybook/addon-docs/package.json')),
    options: { transcludeMarkdown: true },
  }, {
    name: '@storybook/addon-essentials',
    options: { docs: false },
  }, '@storybook/addon-interactions', '@storybook/addon-docs', {
    name: '@storybook/addon-styling',
    options: {
      // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
      // For more details on this addon's options.
      postCss: {
        implementation: require.resolve('postcss'),
      },
    },
  }, {
    name: '@storybook/addon-styling',
    options: {},
  }, '@storybook/addon-styling-webpack'],
  framework: {
    name: '@storybook/angular',
    options: {},
  },
  staticDirs: [{ from: './../src/assets', to: '/assets' }],
  docs: {
    autodocs: 'tag',
    defaultName: "DOCS"
  },
};

export default config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/recipes/storybook/custom-builder-configs
