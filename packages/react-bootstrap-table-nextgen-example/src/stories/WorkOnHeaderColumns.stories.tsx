import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// import bootstrap style by given version
import filterFactory, { textFilter } from '../../../react-bootstrap-table-nextgen-filter';
import { productsGenerator } from '../utils/common';
import BootstrapTable from './WorkOnHeaderColumns';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Work On Header Columns',
  component: BootstrapTable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    data: { control: 'object', description: 'table data' },
    columns: { control: 'object', description: 'table columns' },
    sourceCode: { control: 'text', description: 'source code of the table' },
  },
  decorators: [
    (Story: any) => bootstrapStyle()(Story),
  ],
} satisfies Meta<typeof BootstrapTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
function priceFormatter(column: any, colIndex: number) {
  return (
    <h5><strong>$$ { column.text } $$</strong></h5>
  );
}

export const ColumnFormatter: Story = {
  name: "Column formatter",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      headerFormatter: priceFormatter
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    function priceFormatter(column, colIndex) {
      return (
        <h5><strong>$$ { column.text } $$</strong></h5>
      );
    }

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      headerFormatter: priceFormatter
    }];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
    />
    `,
  }
};

function priceFormatterWithFilterAndSort(column: any, colIndex: number, { sortElement, filterElement }) {
  return (
    <div style={ { display: 'flex', flexDirection: 'column' } }>
      { filterElement }
      { column.text }
      { sortElement }
    </div>
  );
}

export const ColumnFormatterWithFilterAndSort: Story = {
  name: "Column formatter with filter and sort",
  args: {
    columns: [{
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
      sort: true,
      filter: textFilter(),
      headerFormatter: priceFormatterWithFilterAndSort
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { textFilter } from 'react-bootstrap-table-nextgen-filter';
    // ...
    function priceFormatter(column, colIndex, { sortElement, filterElement }) {
      return (
        <div style={ { display: 'flex', flexDirection: 'column' } }>
          { filterElement }
          { column.text }
          { sortElement }
        </div>
      );
    }

    const columns = [
    // omit...
    {
      dataField: 'price',
      text: 'Product Price',
      sort: true,
      filter: textFilter(),
      headerFormatter: priceFormatter
    }];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      filter={ filterFactory() }
      defaultSorted={ defaultSorted }
    />
    `,
    filter: filterFactory(),
    defaultSorted: [{
      dataField: 'name',
      order: 'desc'
    }],
  }
};

export const ColumnAlign: Story = {
  name: "Column align",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      headerAlign: 'center'
    }, {
      dataField: 'name',
      text: 'Product Name',
      headerAlign: (column: any, colIndex: number) => 'right'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      headerAlign: 'center'
    }, {
      dataField: 'name',
      text: 'Product Name',
      headerAlign: (column, colIndex) => 'right'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
  }
};

export const ColumnTitle: Story = {
  name: "Column title",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      headerTitle: true
    }, {
      dataField: 'name',
      text: 'Product Name',
      headerTitle: (column: any, colIndex: number) => `this is custom title for ${column.text}`
    }, {
      dataField: 'price',
      text: 'Product Price'
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      headerTitle: true
    }, {
      dataField: 'name',
      text: 'Product Name',
      headerTitle: (column, colIndex) => \`this is custom title for \${column.text}\`
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
  }
};

export const ColumnEvent: Story = {
  name: "Column event",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      headerEvents: {
        onClick: (e: any, column: any, columnIndex: number) => alert(`Click on Product ID header column, columnIndex: ${columnIndex}`)
      }
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      headerEvents: {
        onClick: (e, column, columnIndex) => alert('Click on Product ID header column')
      }
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
    header: <h3>Try to Click on Product ID header column</h3>,
  }
};

export const CustomizeColumnClass: Story = {
  name: "Customize column class",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      headerClasses: 'demo-row-odd'
    }, {
      dataField: 'price',
      text: 'Product Price',
      headerClasses: (column: any, colIndex: number) => {
        if (colIndex % 2 === 0) return 'demo-row-even';
        return 'demo-row-odd';
      }
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      headerClasses: 'demo-row-odd'
    }, {
      dataField: 'price',
      text: 'Product Price',
      headerClasses: (column, colIndex) => {
        if (colIndex % 2 === 0) return 'demo-row-even';
        return 'demo-row-odd';
      }
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
  }
};

export const CustomizeColumnStyle: Story = {
  name: "Customize column style",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      headerStyle: {
        backgroundColor: '#c8e6c9'
      }
    }, {
      dataField: 'price',
      text: 'Product Price',
      headerStyle: (column: any, colIndex: number) => {
        if (colIndex % 2 === 0) {
          return {
            backgroundColor: '#81c784'
          };
        }
        return {
          backgroundColor: '#c8e6c9'
        };
      }
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      headerStyle: {
        backgroundColor: '#c8e6c9'
      }
    }, {
      dataField: 'price',
      text: 'Product Price',
      headerStyle: (column, colIndex) => {
        if (colIndex % 2 === 0) {
          return {
            backgroundColor: '#81c784'
          };
        }
        return {
          backgroundColor: '#c8e6c9'
        };
      }
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
  }
};

export const CustomizeColumnHTMLAttribute: Story = {
  name: "Customize column HTML attribute",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      headerAttrs: { title: 'ID header column' }
    }, {
      dataField: 'name',
      text: 'Product Name',
      headerAttrs: (column: any, colIndex: number) => ({ 'data-test': `customized data ${colIndex}` })
    }, {
      dataField: 'price',
      text: 'Product Price'
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      headerAttrs: { title: 'ID header column' }
    }, {
      dataField: 'name',
      text: 'Product Name',
      headerAttrs: (column, colIndex) => ({ 'data-test': \`customized data \${colIndex}\` })
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
  }
};

export const HeaderClass: Story = {
  name: "Header class",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price'
    }],
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

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      headerClasses="header-class"
    />
    `,
    headerClasses: "header-class",
  }
};
