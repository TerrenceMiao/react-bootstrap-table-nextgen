import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// import bootstrap style by given version
import cellEditFactory from '../../../react-bootstrap-table-nextgen-editor';
import { columns, productsGenerator } from '../utils/common';
import BootstrapTable from './RowSelection';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Row Selection',
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
    selectRow: { control: 'array', description: 'row list' },
    selectRow1: { control: 'array', description: 'row list' },
    selectRow2: { control: 'array', description: 'row list' },
    cellEdit: { control: 'object', description: 'cell edit object' },
    noDataIndication: { control: 'text', description: 'no data indication' },
  },
  decorators: [
    (Story: any) => bootstrapStyle()(Story),
  ],
} satisfies Meta<typeof BootstrapTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SingleSelection: Story = {
  name: "Single selection",
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

    const selectRow = {
      mode: 'radio',
      clickToSelect: true
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow: {
      mode: 'radio',
      clickToSelect: true
    }
  }
};

export const MultipleSelection: Story = {
  name: "Multiple selection",
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true
    }
  }
};

export const ClickToSelect: Story = {
  name: "Click to select",
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true
    }
  }
};

export const DefaultSelect: Story = {
  name: "Default select",
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      selected: [1, 3]
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true,
      selected: [1, 3]
    }
  }
};

export const SelectManagement: Story = {
  name: "Select management",
  args: {
    mode: "management",
  }
};

const handleOnSelect = (row: any, isSelect: any) => {
  if (isSelect && row.id < 3) {
    alert('Oops, You can not select Product ID which less than 3');
    return false; // return false to deny current select action
  }
  return true; // return true or dont return to approve current select action
}

const handleOnSelectAll = (isSelect: any, rows: any) => {
  if (isSelect) {
    return rows.filter((r: any) => r.id >= 3).map((r: any) => r.id);
  }
}

export const AdvanceSelectionManagement: Story = {
  name: "Advance selection management",
  args: {
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    class AdvSelectionManagment extends React.Component {
      handleOnSelect = (row, isSelect) => {
        if (isSelect && row.id < 3) {
          alert('Oops, You can not select Product ID which less than 3');
          return false; // return false to deny current select action
        }
        return true; // return true or dont return to approve current select action
      }

      handleOnSelectAll = (isSelect, rows) => {
        if (isSelect) {
          return rows.filter(r => r.id >= 3).map(r => r.id);
        }
      }

      render() {
        const selectRow = {
          mode: 'checkbox',
          clickToSelect: true,
          onSelect: this.handleOnSelect,
          onSelectAll: this.handleOnSelectAll
        };
        return (
          <div>
            <h3>You can not select Product ID less than 3</h3>
            <BootstrapTable keyField="id" data={ products } columns={ columns } selectRow={ selectRow } />
            <Code>{ sourceCode }</Code>
          </div>
        );
      }
    }
    `,
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true,
      onSelect: handleOnSelect,
      onSelectAll: handleOnSelectAll
    }
  }
};

export const ClickToSelectAndEditCell: Story = {
  name: "Click to select and edit cell",
  args: {
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import cellEditFactory from 'react-bootstrap-table-nextgen-editor';

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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      clickToEdit: true  // Click to edit cell also
    };

    const cellEdit = {
      mode: 'click'
    };

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
      cellEdit={ cellEditFactory({ mode: 'click' }) }
    />
    `,
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true,
      clickToEdit: true
    },
    cellEdit: cellEditFactory({ mode: 'click' }),
  }
};

export const RowSelectAndExpand: Story = {
  name: "Row select and expand",
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      clickToExpand: true
    };

    const expandRow = {
      showExpandColumn: true,
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
      selectRow={ selectRow }
      expandRow={ expandRow }
    />
    `,
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true,
      clickToExpand: true
    },
    expandRow: {
      showExpandColumn: true,
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

export const SelectWithoutData: Story = {
  name: "Select without data",
  args: {
    columns: columns,
    data: [],
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true
    };

    <BootstrapTable
      keyField='id'
      data={ [] }
      columns={ columns }
      selectRow={ selectRow }
      noDataIndication={ 'no results found' }
    />
    `,
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true
    },
    noDataIndication: "no results found",
  }
};

export const SelectionStyle: Story = {
  name: "Selection style",
  args: {
    mode: "style",
    columns: columns,
    data: productsGenerator(),
    sourceCode1: `\
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      style: { backgroundColor: '#c8e6c9' }
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    sourceCode2: `\
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      style: (row, rowIndex) => {
        const backgroundColor = rowIndex > 1 ? '#00BFFF' : '#00FFFF';
        return { backgroundColor };
      }
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow1: {
      mode: 'checkbox',
      clickToSelect: true,
      style: { backgroundColor: '#c8e6c9' }
    },
    selectRow2: {
      mode: 'checkbox',
      clickToSelect: true,
      style: (row: any, rowIndex: number) => {
        const backgroundColor = rowIndex > 1 ? '#00BFFF' : '#00FFFF';
        return { backgroundColor };
      }
    }
  }
};

export const SelectionClass: Story = {
  name: "Selection class",
  args: {
    mode: "style",
    columns: columns,
    data: productsGenerator(),
    sourceCode1: `\
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      classes: 'selection-row'
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    sourceCode2: `\
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      classes: (row, rowIndex) =>
        (rowIndex > 1 ? 'row-index-bigger-than-2101' : 'row-index-small-than-2101')
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow1: {
      mode: 'checkbox',
      clickToSelect: true,
      classes: 'selection-row'
    },
    selectRow2: {
      mode: 'checkbox',
      clickToSelect: true,
      classes: (row: any, rowIndex: number) => (rowIndex > 1 ? 'row-index-bigger-than-2101' : 'row-index-small-than-2101')
    }
  }
};

export const CustomSelectionColumnHeaderStyle: Story = {
  name: "Custom selection column header style",
  args: {
    mode: "style",
    columns: columns,
    data: productsGenerator(2),
    sourceCode1: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = ...

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      headerColumnStyle: {
        backgroundColor: 'blue'
      }
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    sourceCode2: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = ...

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      headerColumnStyle: (status) => {
        if (status === 'checked') {
          return {
            backgroundColor: 'yellow'
          };
        } else if (status === 'indeterminate') {
          return {
            backgroundColor: 'pink'
          };
        } else if (status === 'unchecked') {
          return {
            backgroundColor: 'grey'
          };
        }
        return {};
      }
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow1: {
      mode: 'checkbox',
      clickToSelect: true,
      headerColumnStyle: {
        backgroundColor: 'blue'
      }
    },
    selectRow2: {
      mode: 'checkbox',
      clickToSelect: true,
      headerColumnStyle: (status: string) => {
        if (status === 'checked') {
          return {
            backgroundColor: 'yellow'
          };
        } else if (status === 'indeterminate') {
          return {
            backgroundColor: 'pink'
          };
        } else if (status === 'unchecked') {
          return {
            backgroundColor: 'grey'
          };
        }
        return {};
      }
    }
  }
};

export const HideSelectAll: Story = {
  name: "Hide select all",
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      hideSelectAll: true
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true,
      hideSelectAll: true
    },
  }
};

export const CustomSelection: Story = {
  name: "Custom selection",
  args: {
    mode: "style",
    columns: columns,
    data: productsGenerator(),
    sourceCode1: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = ....;

    const selectRow = {
      mode: 'radio',
      clickToSelect: true,
      selectionHeaderRenderer: () => 'X',
      selectionRenderer: ({ mode, ...rest }) => (
        <input type={ mode } { ...rest } />
      )
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    sourceCode2: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const columns = ....;

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      selectionHeaderRenderer: ({ indeterminate, ...rest }) => (
        <input
          type="checkbox"
          ref={ (input) => {
            if (input) input.indeterminate = indeterminate;
          } }
          { ...rest }
        />
      ),
      selectionRenderer: ({ mode, ...rest }) => (
        <input type={ mode } { ...rest } />
      )
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow1: {
      mode: 'radio',
      clickToSelect: true,
      selectionHeaderRenderer: () => 'X',
      selectionRenderer: ({ mode, ...rest }) => (
        <input type={ mode } onChange={() => {}} { ...rest } />
      )
    },
    selectRow2: {
      mode: 'checkbox',
      clickToSelect: true,
      selectionHeaderRenderer: ({ indeterminate, ...rest }) => (
        <input
          type="checkbox"
          ref={ (input) => {
            if (input) input.indeterminate = indeterminate;
          } }
          onChange={() => {}}
          { ...rest }
        />
      ),
      selectionRenderer: ({ mode, ...rest }) => (
        <input type={ mode } onChange={() => {}} { ...rest } />
      )
    }
  }
};

export const SelectionBackgroundColor: Story = {
  name: "Selection background color",
  args: {
    mode: "style",
    columns: columns,
    data: productsGenerator(),
    sourceCode1: `\
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: '#00BFFF'
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    sourceCode2: `\
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: (row, rowIndex) => (rowIndex > 1 ? '#00BFFF' : '#00FFFF')
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow1: {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: '#00BFFF'
    },
    selectRow2: {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: (row: any, rowIndex: number) => (rowIndex > 1 ? '#00BFFF' : '#00FFFF')
    }
  }
};

export const NotSelectabledRows: Story = {
  name: "Not selectabled rows",
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      nonSelectable: [0, 2, 4]
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true,
      nonSelectable: [0, 2, 4]
    },
  }
};

export const NotSelectabledRowsStyle: Story = {
  name: "Not selectabled rows style",
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      nonSelectable: [0, 2, 4],
      nonSelectableStyle: { backgroundColor: 'gray' }
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true,
      nonSelectable: [0, 2, 4],
      nonSelectableStyle: { backgroundColor: 'gray' }
    },
  }
};

export const NotSelectabledRowsClass: Story = {
  name: "Not selectabled rows class",
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      nonSelectable: [0, 2, 4],
      nonSelectableClasses: 'row-index-bigger-than-2101'
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true,
      nonSelectable: [0, 2, 4],
      nonSelectableClasses: 'row-index-bigger-than-2101'
    },
  }
};

export const SelectionHooks: Story = {
  name: "Selection hooks",
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      onSelect: (row, isSelect, rowIndex, e) => {
        console.log(row.id);
        console.log(isSelect);
        console.log(rowIndex);
        console.log(e);
      },
      onSelectAll: (isSelect, rows, e) => {
        console.log(isSelect);
        console.log(rows);
        console.log(e);
      }
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true,
      onSelect: (row: any, isSelect: any, rowIndex: number, e: any) => {
        console.log(row.id);
        console.log(isSelect);
        console.log(rowIndex);
        console.log(e);
      },
      onSelectAll: (isSelect: any, rows: any, e: any) => {
        console.log(isSelect);
        console.log(rows);
        console.log(e);
      }
    },
  }
};

export const HideSelectionColumn: Story = {
  name: "Hide selection column",
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      hideSelectColumn: true,
      bgColor: '#00BFFF'
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true,
      hideSelectColumn: true,
      bgColor: '#00BFFF'
    },
  }
};

export const CustomSelectionColumnStyle: Story = {
  name: "Custom selection column style",
  args: {
    mode: "style",
    columns: columns,
    data: productsGenerator(2),
    sourceCode1: `\
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: '#00BFFF'
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    sourceCode2: `\
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      bgColor: (row, rowIndex) => (rowIndex > 1 ? '#00BFFF' : '#00FFFF')
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow1: {
      mode: 'checkbox',
      clickToSelect: true,
      selectColumnStyle: {
        backgroundColor: 'grey'
      }
    },
    selectRow2: {
      mode: 'checkbox',
      clickToSelect: true,
      selectColumnStyle: ({
        checked,
        disabled,
        rowIndex,
        rowKey
      }) => {
        if (checked) {
          return {
            backgroundColor: 'yellow'
          };
        }
        return {
          backgroundColor: 'pink'
        };
      }
    }
  }
};

export const SelectionColumnPosition: Story = {
  name: "Selection column position",
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      selectColumnPosition: 'right'
    };

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true,
      selectColumnPosition: 'right'
    },
  }
};
