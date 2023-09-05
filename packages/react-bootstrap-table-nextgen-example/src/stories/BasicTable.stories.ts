import type { Meta, StoryObj } from '@storybook/react';

// import bootstrap style by given version
import { columns, productsGenerator } from '../utils/common';
import BootstrapTable from './BasicTable';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Basic Table',
  component: BootstrapTable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    columns: { control: 'object', description: 'table columns' },
    data: { control: 'object', description: 'table data' },
    sourceCode: { control: 'text', description: 'source code of the table' },
    striped: { control: 'boolean', default: true, description: 'striped flag', table: { defaultValue: { summary: 'false' } } },
    hover: { control: 'boolean', description: 'hover flag', table: { defaultValue: { summary: 'false' } } },
    condensed: { control: 'boolean', description: 'condensed flag', table: { defaultValue: { summary: 'false' } } },
    bordered: { control: 'boolean', description: 'bordered flag', table: { defaultValue: { summary: 'true' } } },
    noDataIndication: { control: 'text', description: 'No data in the table indication' },
  },
  decorators: [
    (Story: any) => bootstrapStyle()(Story),
  ],
} satisfies Meta<typeof BootstrapTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasicTable: Story = {
  name: "Basic table",
  args: {
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
  }
};

export const StripedHoverCondensedTable: Story = {
  name: "Striped, hover, condensed table",
  args: {
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    // omit...

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      striped
      hover
      condensed
    />
    `,
    striped: true,
    hover: true,
    condensed: true,
  }
};

export const BorderlessTable: Story = {
  name: "Borderless table",
  args: {
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    // omit...

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      bordered={ false }
    />
    `,
    bordered: false,
  }
};

export const EmptyTable: Story = {
  name: "Indication for empty table",
  args: {
    columns: columns,
    data: [],
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    // omit...

    <BootstrapTable keyField='id' data={ [] } columns={ columns } noDataIndication="Table is Empty" />

    // Following is a more flexible example

    function indication() {
      // return something here
    }

    <BootstrapTable keyField='id' data={ [] } columns={ columns } noDataIndication={ indication } />
    `,
    noDataIndication: "Table is Empty",
  }
};
