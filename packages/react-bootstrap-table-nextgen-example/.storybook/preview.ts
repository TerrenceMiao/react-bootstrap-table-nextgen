import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          "Configure your project",
          "Welcome",
          "Basic Table",
          "Bootstrap 4",
          "Work On Columns",
          "Work On Header Columns",
          "Column Filter",
        ],
      },
    },
  },
};

export default preview;
