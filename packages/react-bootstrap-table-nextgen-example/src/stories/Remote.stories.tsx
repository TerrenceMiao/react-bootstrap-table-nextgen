import type { Meta, StoryObj } from '@storybook/react';

// import bootstrap style by given version
import BootstrapTable from './Remote';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Remote',
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
export const RemoteSort: Story = {
  name: "Remote sort",
  args: {
    mode: "sort",
  }
};

export const RemoteFilter: Story = {
  name: "Remote filter",
  args: {
    mode: "filter",
  }
};

export const RemotePagination: Story = {
  name: "Remote pagination",
  args: {
    mode: "pagination",
  }
};

export const RemoteSearch: Story = {
  name: "Remote search",
  args: {
    mode: "search",
  }
};

export const RemoteCellEditing: Story = {
  name: "Remote cell editing",
  args: {
    mode: "edit",
  }
};

export const RemoteAll: Story = {
  name: "Remote all",
  args: {
    mode: "all",
  }
};
