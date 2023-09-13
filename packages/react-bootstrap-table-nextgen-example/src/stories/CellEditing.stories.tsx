import React from 'react';
import PropTypes from 'prop-types';
import type { Meta, StoryObj } from '@storybook/react';

// import bootstrap style by given version
import cellEditFactory, { Type } from '../../../react-bootstrap-table-nextgen-editor';
import { columns, jobsGenerator, productsGenerator, productsQualityGenerator, stockGenerator, todosGenerator } from '../utils/common';
import BootstrapTable from './CellEditing';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Cell Editing',
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
    sort: { control: 'text', description: 'sort' },
    cellEdit: { control: 'object', description: 'cell edit object' },
    selectRow: { control: 'array', description: 'row list' },
  },
  decorators: [
    (Story: any) => bootstrapStyle()(Story),
  ],
} satisfies Meta<typeof BootstrapTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const ClickToEdit: Story = {
  name: "Click to edit",
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

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click' }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click' }),
  }
};

export const DoubleClickToEdit: Story = {
  name: "Double click to edit",
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

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'dbclick' }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'dbclick' }),
  }
};

export const BlurToSaveCell: Story = {
  name: "Blur to save cell",
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

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({
        mode: 'click',
        blurToSave: true
      }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click', blurToSave: true }),
  }
};

export const RowLevelEditable: Story = {
  name: "Row level editable",
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

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({
        mode: 'click',
        blurToSave: true,
        nonEditableRows: () => [0, 3]
      }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click', blurToSave: true, nonEditableRows: () => [0, 3] }),
  }
};

export const ColumnLevelEditable: Story = {
  name: "Column level editable",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      editable: false
    }, {
      dataField: 'price',
      text: 'Product Price'
    }],
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
      // Product Name column can't be edit anymore
      editable: false
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({
        mode: 'click',
        blurToSave: true
      }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click', blurToSave: true }),
  }
};

export const CellLevelEditable: Story = {
  name: "Cell level editable",
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
      editable: (content: any, row: any, rowIndex: number, columnIndex: number) => content > 2101
    }],
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
      text: 'Product Price',
      editable: (content, row, rowIndex, columnIndex) => content > 2101
    }];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click' }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click' }),
  }
};

export const RichHookFunctions: Story = {
  name: "Rich hook functions",
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

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({
        mode: 'click',
        onStartEdit: (row, column, rowIndex, columnIndex) => { console.log('start to edit!!!'); },
        beforeSaveCell: (oldValue, newValue, row, column) => { console.log('Before Saving Cell!!'); },
        afterSaveCell: (oldValue, newValue, row, column) => { console.log('After Saving Cell!!'); }
      }) }
    />
    `,
    cellEdit: cellEditFactory({
      mode: 'click',
      onStartEdit: (row: any, column: any, rowIndex: any, columnIndex: any) => { console.log('Start to edit!!!'); },
      beforeSaveCell: (oldValue: any, newValue: any, row: any, column: any) => { console.log('Before Saving Cell!!'); },
      afterSaveCell: (oldValue: any, newValue: any, row: any, column: any) => { console.log('After Saving Cell!!'); }
    }),
  }
};

function beforeSaveCell(oldValue: any, newValue: any, row: any, column: any, done: any) {
  setTimeout(() => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do you want to accep this change?')) {
      done(true);
    } else {
      done(false);
    }
  }, 0);
  return { async: true };
}

export const AsyncHookFunctions: Story = {
  name: "Async hook functions",
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

    function beforeSaveCell(oldValue, newValue, row, column, done) {
      setTimeout(() => {
        if (confirm('Do you want to accep this change?')) {
          done(true);
        } else {
          done(false);
        }
      }, 0);
      return { async: true };
    }

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({
        mode: 'click',
        beforeSaveCell
      }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click', beforeSaveCell }),
  }
};

export const Validation: Story = {
  name: "Validation ",
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
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: 'Price should be numeric'
          };
        }
        if (newValue < 2000) {
          return {
            valid: false,
            message: 'Price should bigger than 2000'
          };
        }
        return true;
      }
    }],
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
      text: 'Product Price',
      validator: (newValue, row, column) => {
        if (isNaN(newValue)) {
          return {
            valid: false,
            message: 'Price should be numeric'
          };
        }
        if (newValue < 2000) {
          return {
            valid: false,
            message: 'Price should bigger than 2000'
          };
        }
        return true;
      }
    }];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({
        mode: 'click',
        blurToSave: true
      }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click', blurToSave: true }),
    header: <h3>Product Price should bigger than $2000</h3>,
  }
};

export const AsyncValidation: Story = {
  name: "Async validation",
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
      validator: (newValue: any, row: any, column: any, done: any) => {
        setTimeout(() => {
          if (isNaN(newValue)) {
            return done({
              valid: false,
              message: 'Price should be numeric'
            });
          }
          if (newValue < 2000) {
            return done({
              valid: false,
              message: 'Price should bigger than 2000'
            });
          }
          return done();
        }, 2000);
        return {
          async: true
        };
      }
    }],
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
      text: 'Product Price',
      validator: (newValue, row, column, done) => {
        setTimeout(() => {
          if (isNaN(newValue)) {
            return done({
              valid: false,
              message: 'Price should be numeric'
            });
          }
          if (newValue < 2000) {
            return done({
              valid: false,
              message: 'Price should bigger than 2000'
            });
          }
          return done();
        }, 2000);
        return {
          async: true
        };
      }
    }];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({
        mode: 'click',
        blurToSave: true
      }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click', blurToSave: true }),
    header: <h3>Product Price should bigger than $2000</h3>,
  }
};

export const AutoSelectTextInput: Story = {
  name: "Auto select text input",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Job ID'
    }, {
      dataField: 'name',
      text: 'Job Name'
    }, {
      dataField: 'owner',
      text: 'Job Owner'
    }, {
      dataField: 'type',
      text: 'Job Type',
      editor: {
        type: Type.TEXTAREA
      }
    }],
    data: jobsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import cellEditFactory, { Type } from 'react-bootstrap-table-nextgen-editor';

    const columns = [{
      dataField: 'id',
      text: 'Job ID'
    }, {
      dataField: 'name',
      text: 'Job Name'
    }, {
      dataField: 'owner',
      text: 'Job Owner'
    }, {
      dataField: 'type',
      text: 'Job Type',
      editor: {
        type: Type.TEXTAREA
      }
    }];

    <BootstrapTable
      keyField="id"
      data={ jobs }
      columns={ columns }
      cellEdit={
        cellEditFactory({
          mode: 'click',
          autoSelectText: true
        })
      }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click', autoSelectText: true }),
    header: <h3>Auto Select Text Input Field When Editing</h3>,
  }
};

export const CustomCellStyle: Story = {
  name: "Custom cell style",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      editCellStyle: {
        backgroundColor: '#20B2AA'
      }
    }, {
      dataField: 'price',
      text: 'Product Price',
      editCellStyle: (cell: any, row: any, rowIndex: any, colIndex: any) => {
        const backgroundColor = cell > 2101 ? '#00BFFF' : '#00FFFF';
        return { backgroundColor };
      }
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import cellEditFactory from 'react-bootstrap-table-nextgen-editor';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      editCellStyle: {
        backgroundColor: '#20B2AA'
      }
    }, {
      dataField: 'price',
      text: 'Product Price',
      editCellStyle: (cell, row, rowIndex, colIndex) => {
        const backgroundColor = cell > 2101 ? '#00BFFF' : '#00FFFF';
        return { backgroundColor };
      }
    }];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click' }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click' }),
  }
};

export const CustomCellClasses: Story = {
  name: "Custom cell classes",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      editCellClasses: 'editing-name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      editCellClasses: (cell: any, row: any, rowIndex: any, colIndex: any) =>
        (cell > 2101 ? 'editing-price-bigger-than-2101' : 'editing-price-small-than-2101')
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import cellEditFactory from 'react-bootstrap-table-nextgen-editor';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      editCellClasses: 'editing-name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      editCellClasses: (cell, row, rowIndex, colIndex) =>
        (cell > 2101 ? 'editing-price-bigger-than-2101' : 'editing-price-small-than-2101')
    }];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click' }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click' }),
  }
};

export const CustomEditorClasses: Story = {
  name: "Custom editor classes",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      editorClasses: 'editing-name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      editorClasses: (cell: any, row: any, rowIndex: any, colIndex: any) =>
        (cell > 2101 ? 'editing-price-bigger-than-2101' : 'editing-price-small-than-2101')
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import cellEditFactory from 'react-bootstrap-table-nextgen-editor';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      editorClasses: 'editing-name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      editorClasses: (cell, row, rowIndex, colIndex) =>
        (cell > 2101 ? 'editing-price-bigger-than-2101' : 'editing-price-small-than-2101')
    }];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click' }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click' }),
  }
};

export const CustomEditorStyle: Story = {
  name: "Custom editor style",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      editorStyle: {
        backgroundColor: '#20B2AA'
      }
    }, {
      dataField: 'price',
      text: 'Product Price',
      editorStyle: (cell: any, row: any, rowIndex: any, colIndex: any) => {
        const backgroundColor = cell > 2101 ? '#00BFFF' : '#00FFFF';
        return { backgroundColor };
      }
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import cellEditFactory from 'react-bootstrap-table-nextgen-editor';

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      editorStyle: {
        backgroundColor: '#20B2AA'
      }
    }, {
      dataField: 'price',
      text: 'Product Price',
      editorStyle: (cell, row, rowIndex, colIndex) => {
        const backgroundColor = cell > 2101 ? '#00BFFF' : '#00FFFF';
        return { backgroundColor };
      }
    }];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click' }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click' }),
  }
};

export const DoubleClickToEditWithSelection: Story = {
  name: "Double click to edit with selection",
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
      clickToEdit: true
    };

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
      cellEdit={ cellEditFactory({ mode: 'dbclick' }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'dbclick' }),
    selectRow: {
      mode: 'checkbox',
      clickToSelect: true,
      clickToEdit: true
    },
    header: <h3>Double click to edit cell</h3>,
  }
};

export const DropdownEditor: Story = {
  name: "Dropdown editor",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Job ID'
    }, {
      dataField: 'name',
      text: 'Job Name'
    }, {
      dataField: 'owner',
      text: 'Job Owner'
    }, {
      dataField: 'type',
      text: 'Job Type',
      editor: {
        type: Type.SELECT,
        options: [{
          value: 'A',
          label: 'A'
        }, {
          value: 'B',
          label: 'B'
        }, {
          value: 'C',
          label: 'C'
        }, {
          value: 'D',
          label: 'D'
        }, {
          value: 'E',
          label: 'E'
        }]
      }
    }],
    data: jobsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import cellEditFactory, { Type } from 'react-bootstrap-table-nextgen-editor';

    const columns = [{
      dataField: 'id',
      text: 'Job ID'
    }, {
      dataField: 'name',
      text: 'Job Name'
    }, {
      dataField: 'owner',
      text: 'Job Owner'
    }, {
      dataField: 'type',
      text: 'Job Type',
      editor: {
        type: Type.SELECT,
        options: [{
          value: 'A',
          label: 'A'
        }, {
          value: 'B',
          label: 'B'
        }, {
          value: 'C',
          label: 'C'
        }, {
          value: 'D',
          label: 'D'
        }, {
          value: 'E',
          label: 'E'
        }]
      }
    }];

    <BootstrapTable
      keyField="id"
      data={ jobs }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click', blurToSave: true }),
    header: <h3>Dropdown Editor</h3>,
  }
};

export const DropdownEditorWithDynamicOptions: Story = {
  name: "Dropdown editor with dynamic options",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Job ID'
    }, {
      dataField: 'name',
      text: 'Job Name'
    }, {
      dataField: 'owner',
      text: 'Job Owner'
    }, {
      dataField: 'type',
      text: 'Job Type1',
      editor: {
        type: Type.SELECT,
        getOptions: (setOptions: any, { row, column }) => {
          console.log(`current editing row id: ${row.id}`);
          console.log(`current editing column: ${column.dataField}`);
          return [{
            value: 'A',
            label: 'A'
          }, {
            value: 'B',
            label: 'B'
          }, {
            value: 'C',
            label: 'C'
          }, {
            value: 'D',
            label: 'D'
          }, {
            value: 'E',
            label: 'E'
          }];
        }
      }
    }, {
      dataField: 'type2',
      text: 'Job Type2',
      editor: {
        type: Type.SELECT,
        getOptions: (setOptions: any) => {
          setTimeout(() => {
            setOptions([{
              value: 'A',
              label: 'A'
            }, {
              value: 'B',
              label: 'B'
            }, {
              value: 'C',
              label: 'C'
            }, {
              value: 'D',
              label: 'D'
            }, {
              value: 'E',
              label: 'E'
            }]);
          }, 2000);
        }
      }
    }],
    data: jobsGenerator().map(j => ({ ...j, type2: j.type })),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import cellEditFactory, { Type } from 'react-bootstrap-table-nextgen-editor';

    const columns = [{
      dataField: 'id',
      text: 'Job ID'
    }, {
      dataField: 'name',
      text: 'Job Name'
    }, {
      dataField: 'owner',
      text: 'Job Owner'
    }, {
      dataField: 'type',
      text: 'Job Type1',
      editor: {
        type: Type.SELECT,
        getOptions: (setOptions, { row, column }) => {
          console.log(\`current editing row id: $\{row.id}\`);
          console.log(\`current editing column: $\{column.dataField}\`);
          return [{
            value: 'A',
            label: 'A'
          }, {
            value: 'B',
            label: 'B'
          }, {
            value: 'C',
            label: 'C'
          }, {
            value: 'D',
            label: 'D'
          }, {
            value: 'E',
            label: 'E'
          }];
        }
      }
    }, {
      dataField: 'type2',
      text: 'Job Type2',
      editor: {
        type: Type.SELECT,
        getOptions: (setOptions) => {
          setTimeout(() => {
            setOptions([{
              value: 'A',
              label: 'A'
            }, {
              value: 'B',
              label: 'B'
            }, {
              value: 'C',
              label: 'C'
            }, {
              value: 'D',
              label: 'D'
            }, {
              value: 'E',
              label: 'E'
            }]);
          }, 2000);
        }
      }
    }];

    <BootstrapTable
      keyField="id"
      data={ jobs }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click', blurToSave: true }),
    header: <h3>Dropdown Editor with Dynamic Options</h3>,
  }
};

export const TextareaEditor: Story = {
  name: "Textarea editor",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Job ID'
    }, {
      dataField: 'name',
      text: 'Job Name'
    }, {
      dataField: 'owner',
      text: 'Job Owner'
    }, {
      dataField: 'type',
      text: 'Job Type',
      editor: {
        type: Type.TEXTAREA
      }
    }],
    data: jobsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import cellEditFactory, { Type } from 'react-bootstrap-table-nextgen-editor';

    const columns = [{
      dataField: 'id',
      text: 'Job ID'
    }, {
      dataField: 'name',
      text: 'Job Name'
    }, {
      dataField: 'owner',
      text: 'Job Owner'
    }, {
      dataField: 'type',
      text: 'Job Type',
      editor: {
        type: Type.TEXTAREA
      }
    }];

    <BootstrapTable
      keyField="id"
      data={ jobs }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click', blurToSave: true }),
  }
};

export const CheckboxEditor: Story = {
  name: "Textarea editor",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Todo ID'
    }, {
      dataField: 'todo',
      text: 'Todo Name'
    }, {
      dataField: 'done',
      text: 'Done',
      editor: {
        type: Type.CHECKBOX,
        value: 'Y:N'
      }
    }],
    data: todosGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import cellEditFactory, { Type } from 'react-bootstrap-table-nextgen-editor';

    const columns = [{
      dataField: 'id',
      text: 'Todo ID'
    }, {
      dataField: 'todo',
      text: 'Todo Name'
    }, {
      dataField: 'done',
      text: 'Done',
      editor: {
        type: Type.CHECKBOX,
        value: 'Y:N'
      }
    }];

    <BootstrapTable
      keyField="id"
      data={ todos }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click', blurToSave: true }),
    header: <h3>Checkbox Editor</h3>,
  }
};

export const DateEditor: Story = {
  name: "Date editor",
  args: {
    columns: [{
      dataField: 'id',
      text: 'ID'
    }, {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'inStockDate',
      text: 'Stock Date',
      formatter: (cell) => {
        let dateObj = cell;
        if (typeof cell !== 'object') {
          dateObj = new Date(cell);
        }
        return `${('0' + dateObj.getUTCDate()).slice(-2)}/${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${dateObj.getUTCFullYear()}`;
      },
      editor: {
        type: Type.DATE
      }
    }],
    data: stockGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import cellEditFactory, { Type } from 'react-bootstrap-table-nextgen-editor';

    const columns = [{
      dataField: 'id',
      text: 'ID'
    }, {
      dataField: 'name',
      text: 'Name'
    }, {
      dataField: 'inStockDate',
      text: 'Stock Date',
      formatter: (cell) => {
        let dateObj = cell;
        if (typeof cell !== 'object') {
          dateObj = new Date(cell);
        }
        return \`$\{('0' + dateObj.getUTCDate()).slice(-2)}/$\{('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/$\{dateObj.getUTCFullYear()}\`;
      },
      editor: {
        type: Type.DATE
      }
    }];

    <BootstrapTable
      keyField="id"
      data={ stocks }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click', blurToSave: true }),
    header: <h3>Date Editor</h3>,
  }
};

interface QualityRangerProps {
  value?: number;
  onUpdate: (value: number) => void;
}

interface QualityRangerState {}

class QualityRanger extends React.Component<QualityRangerProps, QualityRangerState> {
  range: HTMLInputElement | null = null;

  static propTypes = {
    value: PropTypes.number,
    onUpdate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: 0,
  };

  componentDidMount() {
    if (this.range) {
      this.range.focus();
    }
  }

  getValue() {
    return parseInt(this.range?.value || '0', 10);
  }

  render() {
    const { value, onUpdate, ...rest } = this.props;

    return (
      <>
        <input
          {...rest}
          key="range"
          ref={(node) => (this.range = node)}
          type="range"
          min="0"
          max="100"
        />
        <button
          key="submit"
          className="btn btn-default"
          onClick={() => onUpdate(this.getValue())}
        >
          done
        </button>
      </>
    );
  }
}

export const CustomEditor: Story = {
  name: "Custom editor",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quality',
      editorRenderer: (editorProps: any, value: any, row: any, column: any, rowIndex: any, columnIndex: any) => (
        <QualityRanger { ...editorProps } value={ value } />
      )
    }],
    data: productsQualityGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import cellEditFactory from 'react-bootstrap-table-nextgen-editor';

    class QualityRanger extends React.Component {
      static propTypes = {
        value: PropTypes.number,
        onUpdate: PropTypes.func.isRequired
      }
      static defaultProps = {
        value: 0
      }
      getValue() {
        return parseInt(this.range.value, 10);
      }
      render() {
        const { value, onUpdate, ...rest } = this.props;
        return [
          <input
            { ...rest }
            key="range"
            ref={ node => this.range = node }
            type="range"
            min="0"
            max="100"
          />,
          <button
            key="submit"
            className="btn btn-default"
            onClick={ () => onUpdate(this.getValue()) }
          >
            done
          </button>
        ];
      }
    }

    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'quality',
      text: 'Product Quality',
      editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        <QualityRanger { ...editorProps } value={ value } />
      )
    }];

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({ mode: 'click', blurToSave: true }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click', blurToSave: true }),
  }
};

function afterSaveCell(oldValue: any, newValue: any) {
  console.log('--after save cell--');
  console.log('New Value was apply as');
  console.log(newValue);
  console.log(`and the type is ${typeof newValue}`);
}

export const CellEditorWithDataType: Story = {
  name: "Cell editor with data type",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Stock ID'
    }, {
      dataField: 'name',
      text: 'Stock Name'
    }, {
      dataField: 'price',
      text: 'Price',
      type: 'number'
    }, {
      dataField: 'visible',
      text: 'Visible?',
      type: 'bool',
      editor: {
        type: Type.CHECKBOX,
        value: 'true:false'
      }
    }, {
      dataField: 'inStockDate',
      text: 'Stock Date',
      type: 'date',
      formatter: (cell: any) => {
        let dateObj = cell;
        if (typeof cell !== 'object') {
          dateObj = new Date(cell);
        }
        return `${('0' + dateObj.getUTCDate()).slice(-2)}/${('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/${dateObj.getUTCFullYear()}`;
      },
      editor: {
        type: Type.DATE
      }
    }],
    data: stockGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import cellEditFactory from 'react-bootstrap-table-nextgen-editor';

    const columns = [{
      dataField: 'id',
      text: 'Stock ID'
    }, {
      dataField: 'name',
      text: 'Stock Name'
    }, {
      dataField: 'price',
      text: 'Price',
      type: 'number'
    }, {
      dataField: 'visible',
      text: 'Visible?',
      type: 'bool',
      editor: {
        type: Type.CHECKBOX,
        value: 'true:false'
      }
    }, {
      dataField: 'inStockDate',
      text: 'Stock Date',
      type: 'date',
      formatter: (cell) => {
        let dateObj = cell;
        if (typeof cell !== 'object') {
          dateObj = new Date(cell);
        }
        return \`$\{('0' + dateObj.getUTCDate()).slice(-2)}/$\{('0' + (dateObj.getUTCMonth() + 1)).slice(-2)}/$\{dateObj.getUTCFullYear()}\`;
      },
      editor: {
        type: Type.DATE
      }
    }];

    function afterSaveCell(oldValue, newValue) {
      console.log('--after save cell--');
      console.log('New Value was apply as');
      console.log(newValue);
      console.log(\`and the type is $\{typeof newValue}\`);
    }

    <BootstrapTable
      keyField="id"
      data={ products }
      columns={ columns }
      cellEdit={ cellEditFactory({
        mode: 'click',
        blurToSave: true,
        afterSaveCell
      }) }
    />
    `,
    cellEdit: cellEditFactory({ mode: 'click', blurToSave: true, afterSaveCell }),
  }
};
