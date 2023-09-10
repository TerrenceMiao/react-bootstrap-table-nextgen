import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// import bootstrap style by given version
import { productsGenerator, withOnSale } from '../utils/common';
import BootstrapTable from './WorkOnColumns';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Work On Columns',
  component: BootstrapTable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    mode: { control: 'text', description: 'mode' },
    data: { control: 'object', description: 'table data' },
    columns: { control: 'object', description: 'table columns' },
    sourceCode: { control: 'text', description: 'source code of the table' },
    bordered: { control: 'boolean', description: 'to have or not to have table border' },
    header: { control: 'text', description: 'header of the table' },
  },
  decorators: [
    (Story: any) => bootstrapStyle()(Story),
  ],
} satisfies Meta<typeof BootstrapTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const DisplayNestedData: Story = {
  name: "Display nested data",
  args: {
    columns: [{
      dataField: 'id',
      text: 'User ID'
    }, {
      dataField: 'name',
      text: 'User Name'
    }, {
      dataField: 'phone',
      text: 'Phone'
    }, {
      dataField: 'address.city',
      text: 'City'
    }, {
      dataField: 'address.postCode',
      text: 'PostCode'
    }],
    data: productsGenerator(5, (value: any, index: number) => ({
      id: index,
      name: `User Name ${index}`,
      phone: 21009831 + index,
      address: {
        city: 'New York',
        postCode: '1111-4512'
      }
    })),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
      dataField: 'id',
      text: 'User ID'
    }, {
      dataField: 'name',
      text: 'User Name'
    }, {
      dataField: 'phone',
      text: 'Phone'
    }, {
      dataField: 'address.city',
      text: 'City'
    }, {
      dataField: 'address.postCode',
      text: 'PostCode'
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
  }
};

function priceFormatter(cell: number, row: any) {
  if (row.onSale) {
    return (
      <span><strong style={ { color: 'red' } }>$ { cell } NTD(Sales!!)</strong></span>
    );
  }

  return (
    <span>$ { cell } NTD</span>
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
      formatter: priceFormatter
    }],
    data: withOnSale(productsGenerator()),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    function priceFormatter(cell, row) {
      if (row.onSale) {
        return (
          <span>
            <strong style={ { color: 'red' } }>$ { cell } NTD(Sales!!)</strong>
          </span>
        );
      }

      return (
        <span>$ { cell } NTD</span>
      );
    }

    const columns = [
    // omit...
    {
      dataField: 'price',
      text: 'Product Price',
      formatter: priceFormatter
    }];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
    />
    `,
  }
};

function rankFormatter(cell: number, row: any, rowIndex: any, formatExtraData: any[]) {
  return (
    <i className={ formatExtraData[cell] } />
  );
}

export const ColumnFormatterWithCustomData: Story = {
  name: "Column formatter with custom data",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'rank',
      text: 'Rank',
      formatter: rankFormatter,
      formatExtraData: {
        up: 'glyphicon glyphicon-chevron-up',
        down: 'glyphicon glyphicon-chevron-down'
      }
    }],
    data: productsGenerator(5, (value: any, index: number) => ({
      id: index,
      name: `User Name ${index}`,
      rank: Math.random() < 0.5 ? 'down' : 'up'
    })),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    function rankFormatter(cell, row, rowIndex, formatExtraData) {
      return (
        <i className={ formatExtraData[cell] } />
      );
    }

    const columns = [
    // omit...
    {
      dataField: 'rank',
      text: 'Rank',
      formatter: rankFormatter,
      formatExtraData: {
        up: 'glyphicon glyphicon-chevron-up',
        down: 'glyphicon glyphicon-chevron-down'
    }];

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

export const ColumnAlign: Story = {
  name: "Column align",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      align: 'center'
    }, {
      dataField: 'name',
      text: 'Product Name',
      align: (cell: any, row: any, rowIndex: number, colIndex: any) => {
        if (rowIndex % 2 === 0) return 'right';
        return 'left';
      }
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
      align: 'center'
    }, {
      dataField: 'name',
      text: 'Product Name',
      align: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) return 'right';
        return 'left';
      }
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
      title: true
    }, {
      dataField: 'name',
      text: 'Product Name',
      title: (cell: number, row: any, rowIndex: any, colIndex: any) => `this is custom title for ${cell}`
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
      title: true
    }, {
      dataField: 'name',
      text: 'Product Name',
      title: (cell, row, rowIndex, colIndex) => \`this is custom title for \${cell}\`
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
    header: <h3>Try to hover on any Product Name cells</h3>,
  }
};

export const ColumnHidden: Story = {
  name: "Column hidden",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      hidden: true
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
      hidden: true
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

export const ColumnEvent: Story = {
  name: "Column event",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      events: {
        onClick: (e: any, column: any, columnIndex: number, row: any, rowIndex: number) => {
          console.log(e);
          console.log(column);
          console.log(columnIndex);
          console.log(row);
          console.log(rowIndex);
          alert('Click on Product ID field');
        },
        onMouseEnter: (e: any, column: any, columnIndex: number, row: any, rowIndex: number) => {
          console.log(e);
          console.log(column);
          console.log(columnIndex);
          console.log(row);
          console.log(rowIndex);
          console.log('onMouseEnter on Product ID field');
        }
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
      events: {
        onClick: (e, column, columnIndex, row, rowIndex) => {
          console.log(e);
          console.log(column);
          console.log(columnIndex);
          console.log(row);
          console.log(rowIndex);
          alert('Click on Product ID field');
        },
        onMouseEnter: (e, column, columnIndex, row, rowIndex) => {
          console.log(e);
          console.log(column);
          console.log(columnIndex);
          console.log(row);
          console.log(rowIndex);
          console.log('onMouseEnter on Product ID field');
        }
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
    header: <h3>Try to Click or Mouse over on Product ID columns</h3>,
  }
};

export const CustomizeColumnClass: Story = {
  name: "Customize column class",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      classes: 'demo-key-row'
    }, {
      dataField: 'name',
      text: 'Product Name',
      classes: (cell: any, row: any, rowIndex: number, colIndex: number) => {
        if (rowIndex % 2 === 0) return 'demo-row-even';
        return 'demo-row-odd';
      }
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
      classes: 'demo-key-row'
    }, {
      dataField: 'name',
      text: 'Product Name',
      classes: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) return 'demo-row-even';
        return 'demo-row-odd';
      }
    }, {
      dataField: 'price',
      text: 'Product Price'
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
      text: 'Product ID',
      style: {
        fontWeight: 'bold',
        fontSize: '18px'
      }
    }, {
      dataField: 'name',
      text: 'Product Name',
      style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: '#81c784'
          };
        }
        return {
          backgroundColor: '#c8e6c9'
        };
      }
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
      style: {
        fontWeight: 'bold',
        fontSize: '18px'
      }
    }, {
      dataField: 'name',
      text: 'Product Name',
      style: (cell, row, rowIndex, colIndex) => {
        if (rowIndex % 2 === 0) {
          return {
            backgroundColor: '#81c784'
          };
        }
        return {
          backgroundColor: '#c8e6c9'
        };
      }
    }, {
      dataField: 'price',
      text: 'Product Price'
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
      attrs: { title: 'id column' }
    }, {
      dataField: 'name',
      text: 'Product Name',
      attrs: (cell: any, row: any, rowIndex: number, colIndex: any) => ({ 'data-test': `customized data ${rowIndex}` })
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
      attrs: { title: 'id column' }
    }, {
      dataField: 'name',
      text: 'Product Name',
      attrs: (cell, row, rowIndex, colIndex) => ({ 'data-test': \`customized data \${rowIndex}\` })
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
    header: <h3>Try to hover on Product ID Cell</h3>,
  }
};

export const DummyColumn: Story = {
  name: "Dummy column",
  args: {
    mode: "dummy",
  }
};

export const RowExpandWithDummyColumn: Story = {
  name: "Row expand with dummy column formatter",
  args: {
    mode: "rowdummy",
  }
};
