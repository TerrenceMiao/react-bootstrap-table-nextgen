import type { Meta, StoryObj } from '@storybook/react';

// import bootstrap style by given version
import { columns, productsGenerator } from '../utils/common';
import BootstrapTable from './Bootstrap4';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Bootstrap 4',
  component: BootstrapTable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'text', description: 'mode' },
    id: { control: 'text', description: 'id' },
    classes: { control: 'text', description: 'classes' },
    headerWrapperClasses: { control: 'text', description: 'headerWrapperClasses' },
    bodyClasses: { control: 'text', description: 'bodyClasses' },
    wrapperClasses: { control: 'text', description: 'wrapperClasses' },
    data: { control: 'object', description: 'table data' },
    caption: { control: 'object', description: 'table caption' },
    columns: { control: 'object', description: 'table columns' },
    selectRow: { control: 'object', description: 'table select row' },
    expandRow: { control: 'object', description: 'table expand row' },
    sourceCode: { control: 'text', description: 'source code of the table' },
    striped: { control: 'boolean', description: 'striped flag', table: { defaultValue: { summary: 'false' } } },
    hover: { control: 'boolean', description: 'hover flag', table: { defaultValue: { summary: 'false' } } },
    condensed: { control: 'boolean', description: 'condensed flag', table: { defaultValue: { summary: 'false' } } },
    bordered: { control: 'boolean', description: 'bordered flag', table: { defaultValue: { summary: 'true' } } },
    noDataIndication: { control: 'text', description: 'no data in the table indication' },
    tabIndexCell: { control: 'boolean', description: 'tab index cell', table: { defaultValue: { summary: 'false' } } },
    defaultSorted: { control: 'object', description: 'default sorted data field' },

  },
  decorators: [
    (Story: any) => bootstrapStyle()(Story),
  ],
} satisfies Meta<typeof BootstrapTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const defaultSorted = [{
  dataField: 'name',
  order: 'desc'
}];

export const SortTableWithBootstrap4: Story = {
  name: "Sort table with Bootstrap 4",
  args: {
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      sort: true
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true
    }, {
      dataField: 'price',
      text: 'Product Price',
      sort: true
    }];

    const defaultSorted = [{
      dataField: 'name',
      order: 'desc'
    }];

    <BootstrapTable
      bootstrap4
      keyField="id"
      data={ products }
      columns={ columns }
      defaultSorted={ defaultSorted }
    />
    `,
    defaultSorted: defaultSorted,
  }
};
