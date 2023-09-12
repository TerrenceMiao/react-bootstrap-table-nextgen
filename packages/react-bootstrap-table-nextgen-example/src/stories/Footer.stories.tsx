import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// import bootstrap style by given version
import { productsGenerator } from '../utils/common';
import BootstrapTable from './Footer';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Footer',
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
export const SimpleFooter: Story = {
  name: "Simple footer",
  args: {
    columns:[
      {
        dataField: 'id',
        text: 'Product ID',
        footer: 'Footer 1'
      },
      {
        dataField: 'name',
        text: 'Product Name',
        footer: 'Footer 2'
      },
      {
        dataField: 'price',
        text: 'Product Price',
        footer: 'Footer 3'
      }
    ],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [
      {
        dataField: 'id',
        text: 'Product ID',
        footer: 'Footer 1'
      },
      {
        dataField: 'name',
        text: 'Product Name',
        footer: 'Footer 2'
      },
      {
        dataField: 'price',
        text: 'Product Price',
        footer: 'Footer 3'
      }
    ];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
    />
    `,
  }
};

export const FunctionFooter: Story = {
  name: "Function footer",
  args: {
    columns:[
      {
        dataField: 'id',
        text: 'Product ID',
        footer: 'Footer 1'
      },
      {
        dataField: 'name',
        text: 'Product Name',
        footer: 'Footer 2'
      },
      {
        dataField: 'price',
        text: 'Product Price',
        footer: (columnData: any) => columnData.reduce((acc: any, item: any) => acc + item, 0)
      }
    ],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [
      {
        dataField: 'id',
        text: 'Product ID',
        footer: 'Footer 1'
      },
      {
        dataField: 'name',
        text: 'Product Name',
        footer: 'Footer 2'
      },
      {
        dataField: 'price',
        text: 'Product Price',
        footer: (columnData: any) => columnData.reduce((acc: any, item: any) => acc + item, 0)
      }
    ];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
    />
    `,
  }
};

function priceFormatter(column: any, colIndex: number, { text }) {
  return (
    <h5>
      <strong>$$ {column.text} $$</strong>
    </h5>
  );
}

export const ColumnFormatter: Story = {
  name: "Column formatter",
  args: {
    columns:[
      {
        dataField: 'id',
        text: 'Product ID',
        footer: 'Footer 1'
      },
      {
        dataField: 'name',
        text: 'Product Name',
        footer: 'Footer 2'
      },
      {
        dataField: 'price',
        text: 'Product Price',
        footer: 'Footer 3',
        footerFormatter: priceFormatter
      }
    ],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    function priceFormatter(column, colIndex, { text }) {
      return (
        <h5><strong>$$ { column.text } $$</strong></h5>
      );
    }

    const columns = [
      {
        dataField: 'id',
        text: 'Product ID',
        footer: 'Footer 1'
      },
      {
        dataField: 'name',
        text: 'Product Name',
        footer: 'Footer 2'
      },
      {
        dataField: 'price',
        text: 'Product Price',
        footer: 'Footer 3',
        footerFormatter: priceFormatter
      }
    ];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
    />
    `,
  }
};

export const ColumnAlign: Story = {
  name: "Column align",
  args: {
    columns:[{
      dataField: 'id',
      text: 'Product ID',
      footerAlign: 'center',
      footer: 'Footer 1'
    }, {
      dataField: 'name',
      text: 'Product Name',
      footerAlign: (column: any, colIndex: number) => 'right',
      footer: 'Footer 2'
    }, {
      dataField: 'price',
      text: 'Product Price',
      footer: 'Footer 3'
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      footerAlign: 'center',
      footer: 'Footer 1'
    }, {
      dataField: 'name',
      text: 'Product Name',
      footerAlign: (column, colIndex) => 'right',
      footer: 'Footer 2'
    }, {
      dataField: 'price',
      text: 'Product Price',
      footer: 'Footer 3'
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
      footerTitle: true,
      footer: 'Footer 1'
    }, {
      dataField: 'name',
      text: 'Product Name',
      footerTitle: (column: any, colIndex: number) => `this is custom title for ${column.text}`,
      footer: 'Footer 2'
    }, {
      dataField: 'price',
      text: 'Product Price',
      footer: 'Footer 3'
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      footerTitle: true,
      footer: 'Footer 1'
    }, {
      dataField: 'name',
      text: 'Product Name',
      footerTitle: (column, colIndex) => \`this is custom title for \${column.text}\`,
      footer: 'Footer 2'
    }, {
      dataField: 'price',
      text: 'Product Price',
      footer: 'Footer 3'
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
      footerEvents: {
        onClick: (e: any, column: any, columnIndex: number) => alert(`Click on Product ID header column, columnIndex: ${columnIndex}`)
      },
      footer: 'Footer 1'
    }, {
      dataField: 'name',
      text: 'Product Name',
      footer: 'Footer 2'
    }, {
      dataField: 'price',
      text: 'Product Price',
      footer: 'Footer 3'
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
        dataField: 'id',
        text: 'Product ID',
        footerEvents: {
          onClick: (e, column, columnIndex) => alert('Click on Product ID footer column')
        },
        footer: 'Footer 1'
      }, {
        dataField: 'name',
        text: 'Product Name',
        footer: 'Footer 2'
      }, {
        dataField: 'price',
        text: 'Product Price',
        footer: 'Footer 3'
      }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
  }
};

export const CustomizeColumnClass: Story = {
  name: "Customize column class",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      footer: 'Footer 1'
    }, {
      dataField: 'name',
      text: 'Product Name',
      footer: 'Footer 2',
      footerClasses: 'demo-row-odd'
    }, {
      dataField: 'price',
      text: 'Product Price',
      footer: 'Footer 3',
      footerClasses: (column: any, colIndex: number) => {
        if (colIndex % 2 === 0) return 'demo-row-even';
        return 'demo-row-odd';
      }
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
        dataField: 'id',
        text: 'Product ID',
        footer: 'Footer 1'
      }, {
        dataField: 'name',
        text: 'Product Name',
        footer: 'Footer 2',
        footerClasses: 'demo-row-odd'
      }, {
        dataField: 'price',
        text: 'Product Price',
        footer: 'Footer 3',
        footerClasses: (column, colIndex) => {
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
      text: 'Product ID',
      footer: 'Footer 1'
    }, {
      dataField: 'name',
      text: 'Product Name',
      footer: 'Footer 2',
      footerStyle: {
        backgroundColor: '#c8e6c9'
      }
    }, {
      dataField: 'price',
      text: 'Product Price',
      footer: 'Footer 3',
      footerStyle: (column: any, colIndex: number) => {
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
        text: 'Product ID',
        footer: 'Footer 1'
      }, {
        dataField: 'name',
        text: 'Product Name',
        footer: 'Footer 2',
        footerStyle: {
          backgroundColor: '#c8e6c9'
        }
      }, {
        dataField: 'price',
        text: 'Product Price',
        footer: 'Footer 3',
        footerStyle: (column, colIndex) => {
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
      footer: 'Footer 1',
      footerAttrs: { title: 'ID footer column' }
    }, {
      dataField: 'name',
      text: 'Product Name',
      footer: 'Footer 2',
      footerAttrs: (column: any, colIndex: number) => ({ 'data-test': `customized data ${colIndex}` })
    }, {
      dataField: 'price',
      text: 'Product Price',
      footer: 'Footer 3'
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [{
        dataField: 'id',
        text: 'Product ID',
        footer: 'Footer 1',
        footerAttrs: { title: 'ID footer column' }
      }, {
        dataField: 'name',
        text: 'Product Name',
        footer: 'Footer 2',
        footerAttrs: (column, colIndex) => ({ 'data-test': \`customized data \${colIndex}\` })
      }, {
        dataField: 'price',
        text: 'Product Price',
        footer: 'Footer 3'
      }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
  }
};

export const FooterClass: Story = {
  name: "Footer class",
  args: {
    columns: [
      {
        dataField: 'id',
        text: 'Product ID',
        footer: 'Footer 1'
      },
      {
        dataField: 'name',
        text: 'Product Name',
        footer: 'Footer 2'
      },
      {
        dataField: 'price',
        text: 'Product Price',
        footer: 'Footer 3'
      }
    ],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = [
        {
          dataField: 'id',
          text: 'Product ID',
          footer: 'Footer 1'
        },
        {
          dataField: 'name',
          text: 'Product Name',
          footer: 'Footer 2'
        },
        {
          dataField: 'price',
          text: 'Product Price',
          footer: 'Footer 3'
        }
      ];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      footerClasses="footer-class"
    />
    `,
    footerClasses: "footer-class",
  }
};
