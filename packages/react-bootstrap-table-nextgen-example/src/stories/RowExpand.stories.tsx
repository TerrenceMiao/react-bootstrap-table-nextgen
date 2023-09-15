import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// import bootstrap style by given version
import { columns, productsExpandRowsGenerator } from '../utils/common';
import BootstrapTable from './RowExpand';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Row Expand',
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
    sourceCode1: { control: 'text', description: 'source code of the table' },
    sourceCode2: { control: 'text', description: 'source code of the table' },
    expandRow: { control: 'array', description: 'row list' },
    expandRow1: { control: 'array', description: 'row list' },
    expandRow2: { control: 'array', description: 'row list' },
  },
  decorators: [
    (Story: any) => bootstrapStyle()(Story),
  ],
} satisfies Meta<typeof BootstrapTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasicRowExpand: Story = {
  name: "Basic row expand",
  args: {
    columns: columns,
    data: productsExpandRowsGenerator(),
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

    const expandRow = {
      renderer: row => (
        <div>
          <p>{ \`This Expand row is belong to rowKey $\{row.id}\` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      )
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      expandRow={ expandRow }
    />
    `,
    expandRow: {
      renderer: (row: any, rowIndex: number) => (
        <div>
          <p>{ `This Expand row is belong to rowKey ${row.id} and index: ${rowIndex}` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      )
    }
  }
};

export const ExpandManagement: Story = {
  name: "Expand management",
  args: {
    columns: columns,
    mode: "management",
    data: productsExpandRowsGenerator(),
  }
};

export const NoExpandableRows: Story = {
  name: "No expandable rows",
  args: {
    columns: columns,
    data: productsExpandRowsGenerator(),
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

    const expandRow = {
      renderer: row => (
        <div>
          <p>{ \`This Expand row is belong to rowKey $\{row.id}\` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      showExpandColumn: true,
      nonExpandable: [1, 3]
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      expandRow={ expandRow }
    />
    `,
    expandRow: {
      renderer: (row: any) => (
        <div>
          <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      showExpandColumn: true,
      nonExpandable: [1, 3]
    }
  }
};

export const ExpandIndicator: Story = {
  name: "Expand indicator",
  args: {
    columns: columns,
    data: productsExpandRowsGenerator(),
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

    const expandRow = {
      renderer: row => (
        <div>
          <p>{ \`This Expand row is belong to rowKey $\{row.id}\` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      showExpandColumn: true
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      expandRow={ expandRow }
    />
    `,
    expandRow: {
      renderer: (row: any) => (
        <div>
          <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      showExpandColumn: true
    }
  }
};

export const OnlyExpandByIndicator: Story = {
  name: "Only expand by indicator",
  args: {
    columns: columns,
    data: productsExpandRowsGenerator(),
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

    const expandRow = {
      renderer: row => (
        <div>
          <p>{ \`This Expand row is belong to rowKey $\{row.id}\` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      showExpandColumn: true,
      expandByColumnOnly: true
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      expandRow={ expandRow }
    />
    `,
    expandRow: {
      renderer: (row: any) => (
        <div>
          <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      showExpandColumn: true,
      expandByColumnOnly: true
    },
    header: <h3>Only able to expand row via clicking expand column (indicator)</h3>,
  }
};

export const ExpandOnlyOneRowAtTheSameTime: Story = {
  name: "Expand only one row at the same time",
  args: {
    columns: columns,
    data: productsExpandRowsGenerator(),
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

    const expandRow = {
      onlyOneExpanding: true,
      renderer: row => (
        <div>
          <p>{ \`This Expand row is belong to rowKey $\{row.id}\` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      )
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      expandRow={ expandRow }
    />
    `,
    expandRow: {
      onlyOneExpanding: true,
      renderer: row => (
        <div>
          <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      )
    },
  }
};

export const CustomExpandIndicator: Story = {
  name: "Custom expand indicator",
  args: {
    columns: columns,
    data: productsExpandRowsGenerator(),
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

    const expandRow = {
      renderer: row => (
        <div>
          <p>{ \`This Expand row is belong to rowKey $\{row.id}\` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      showExpandColumn: true,
      expandHeaderColumnRenderer: ({ isAnyExpands }) => {
        if (isAnyExpands) {
          return <b>-</b>;
        }
        return <b>+</b>;
      },
      expandColumnRenderer: ({ expanded }) => {
        if (expanded) {
          return (
            <b>-</b>
          );
        }
        return (
          <b>...</b>
        );
      }
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      expandRow={ expandRow }
    />
    `,
    expandRow: {
      renderer: (row: any) => (
        <div>
          <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      showExpandColumn: true,
      expandHeaderColumnRenderer: ({ isAnyExpands }) => {
        if (isAnyExpands) {
          return <b>-</b>;
        }
        return <b>+</b>;
      },
      expandColumnRenderer: ({ expanded, rowKey, expandable }) => {
        if (expanded) {
          return (
            <b>-</b>
          );
        }
        return (
          <b>...</b>
        );
      }
    },
  }
};

export const ExpandColumnPosition: Story = {
  name: "Expand column position",
  args: {
    columns: columns,
    data: productsExpandRowsGenerator(),
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

    const expandRow = {
      renderer: row => (
        <div>
          <p>{ \`This Expand row is belong to rowKey $\{row.id}\` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      showExpandColumn: true,
      expandColumnPosition: 'right'
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      expandRow={ expandRow }
    />
    `,
    expandRow: {
      renderer: (row: any) => (
        <div>
          <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      showExpandColumn: true,
      expandColumnPosition: 'right'
    },
  }
};

export const ExpandHooks: Story = {
  name: "Expand hooks",
  args: {
    columns: columns,
    data: productsExpandRowsGenerator(),
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

    const expandRow = {
      renderer: row => (
        <div>
          <p>{ \`This Expand row is belong to rowKey $\{row.id}\` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      showExpandColumn: true,
      onExpand: (row, isExpand, rowIndex, e) => {
        console.log(row.id);
        console.log(isExpand);
        console.log(rowIndex);
        console.log(e);
      },
      onExpandAll: (isExpandAll, rows, e) => {
        console.log(isExpandAll);
        console.log(rows);
        console.log(e);
      }
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      expandRow={ expandRow }
    />
    `,
    expandRow: {
      renderer: (row: any) => (
        <div>
          <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      ),
      showExpandColumn: true,
      onExpand: (row: any, isExpand: boolean, rowIndex: number, e: any) => {
        console.log(row.id);
        console.log(isExpand);
        console.log(rowIndex);
        console.log(e);
      },
      onExpandAll: (isExpandAll: boolean, rows: any, e: any) => {
        console.log(isExpandAll);
        console.log(rows);
        console.log(e);
      }
    },
  }
};

export const CustomParentRowClassname: Story = {
  name: "Custom parent row classname",
  args: {
    mode: "style",
    columns: columns,
    data: productsExpandRowsGenerator(),
    sourceCode1: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = // omit...

    const expandRow = {
      parentClassName: 'parent-expand-foo',
      renderer: row => (
        <div>.....</div>
      )
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      expandRow={ expandRow }
    />
    `,
    sourceCode2: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = // omit...

    const expandRow = {
      parentClassName: (isExpanded, row, rowIndex) => {
        if (rowIndex > 2) return 'parent-expand-foo';
        return 'parent-expand-bar';
      },
      renderer: row => (
        <div>...</div>
      )
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      expandRow={ expandRow }
    />
    `,
    expandRow1: {
      parentClassName: 'parent-expand-foo',
      renderer: (row: any) => (
        <div>
          <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      )
    },
    expandRow2: {
      parentClassName: (isExpanded: boolean, row: any, rowIndex: number) => {
        if (rowIndex > 2) return 'parent-expand-foo';
        return 'parent-expand-bar';
      },
      renderer: (row: any) => (
        <div>
          <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      )
    }
  }
};

export const CustomExpandingRowClassname: Story = {
  name: "Custom expanding row classname",
  args: {
    mode: "style",
    columns: columns,
    data: productsExpandRowsGenerator(),
    sourceCode1: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = // omit...

    const expandRow = {
      className: 'expanding-foo',
      renderer: row => (
        <div>.....</div>
      )
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      expandRow={ expandRow }
    />
    `,
    sourceCode2: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = // omit...

    const expandRow = {
      className: (isExpanded, row, rowIndex) => {
        if (rowIndex > 2) return 'expanding-foo';
        return 'expanding-bar';
      },
      renderer: row => (
        <div>...</div>
      )
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      expandRow={ expandRow }
    />
    `,
    expandRow1: {
      className: 'expanding-foo',
      renderer: (row: any) => (
        <div>
          <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      )
    },
    expandRow2: {
      className: (isExpanded: boolean, row: any, rowIndex: number) => {
        if (rowIndex > 2) return 'expanding-foo';
        return 'expanding-bar';
      },
      renderer: (row: any) => (
        <div>
          <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
          <p>You can render anything here, also you can add additional data on every row object</p>
          <p>expandRow.renderer callback will pass the origin row object to you</p>
        </div>
      )
    }
  }
};
