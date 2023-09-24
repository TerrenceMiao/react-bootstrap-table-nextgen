import type { Meta, StoryObj } from '@storybook/react';

// import bootstrap style by given version
import BootstrapTable from './Data';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Data',
  component: BootstrapTable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'text', description: 'mode' },
  },
  decorators: [
    (Story: any) => bootstrapStyle()(Story),
  ],
} satisfies Meta<typeof BootstrapTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DataChangeListener: Story = {
  name: "Data change listener",
  args: {
    mode: "data",
  }
};

export const LodadDataWithFilter: Story = {
  name: "Load data with filter",
  args: {
    mode: "filter",
  }
};

export const LodadDataWithDefaultFilter: Story = {
  name: "Load data with default filter",
  args: {
    mode: "default-filter",
  }
};

export const LodadDataWithSearch: Story = {
  name: "Load data with search",
  args: {
    mode: "search",
  }
};

export const LodadDataWithDefaultSearch: Story = {
  name: "Load data with default search",
  args: {
    mode: "default-search",
  }
};

export const LodadDataWithFilterAndPagination: Story = {
  name: "Load data with filter and pagination",
  args: {
    mode: "pagination",
  }
};
