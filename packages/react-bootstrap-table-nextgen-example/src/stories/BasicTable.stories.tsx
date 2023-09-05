import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

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

export const CustomizedIdAndClassTable: Story = {
  name: "Customized id and class table",
  args: {
    mode: "idAndClass",
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

    <BootstrapTable id="bar" keyField='id' data={ products } columns={ columns } />
    <BootstrapTable classes="foo" keyField="id" data={ products } columns={ columns } />
    <BootstrapTable headerWrapperClasses="foo" keyField="id" data={ products } columns={ columns } />
    <BootstrapTable bodyClasses="foo" keyField="id" data={ products } columns={ columns } />
    <BootstrapTable wrapperClasses="boo" keyField="id" data={ products } columns={ columns } />
    `,
    id: "bar",
    classes: "foo",
    headerWrapperClasses: "foo",
    bodyClasses: "foo",
    wrapperClasses: "boo",
  }
};

export const TableWithCaption: Story = {
  name: "Table with caption",
  args: {
    mode: "caption",
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

    const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em' }}>Component as Header</h3>;

    <BootstrapTable keyField="id" data={ products } caption="Plain text header" columns={ columns } />
    <BootstrapTable keyField="id" data={ products } caption={<CaptionElement />} columns={ columns } />
    `,
  }
};

const expandRow = {
  showExpandColumn: true,
  renderer: (row: any) => (
    <div>
      <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
      <p>You can render anything here, also you can add additional data on every row object</p>
      <p>expandRow.renderer callback will pass the origin row object to you</p>
    </div>
  )
};

export const LargeTable: Story = {
  name: "Large table",
  args: {
    columns: columns,
    data: productsGenerator(20),
    selectRow: { mode: 'checkbox', clickToSelect: true },
    expandRow: expandRow,
  }
};

export const ExposedAPITable: Story = {
  name: "Exposed API",
  args: {
    mode: "exposedAPI",
    columns: columns,
    data: productsGenerator(63),
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

    class ExposedFunctionTable extends React.Component {
      handleGetCurrentData = () => {
        console.log(this.node.table.props.data);
      }

      handleGetCurrentData = () => {
        console.log(this.node.table.props.data);
      }

      handleGetSelectedData = () => {
        console.log(this.node.selectionContext.selected);
      }

      handleGetExpandedData = () => {
        console.log(this.node.rowExpandContext.state.expanded);
      }

      handleGetCurrentPage = () => {
        console.log(this.node.paginationContext.currPage);
      }

      handleGetCurrentSizePerPage = () => {
        console.log(this.node.paginationContext.currSizePerPage);
      }

      handleGetCurrentSortColumn = () => {
        console.log(this.node.sortContext.state.sortColumn);
      }

      handleGetCurrentSortOrder = () => {
        console.log(this.node.sortContext.state.sortOrder);
      }

      handleGetCurrentFilter = () => {
        console.log(this.node.filterContext.currFilters);
      }

      render() {
        const expandRow = {
          renderer: row => (
            <div>
              <p>.....</p>
              <p>You can render anything here, also you can add additional data on every row object</p>
              <p>expandRow.renderer callback will pass the origin row object to you</p>
            </div>
          ),
          showExpandColumn: true
        };
        return (
          <div>
            <button className="btn btn-default" onClick={ this.handleGetCurrentData }>Get Current Display Rows</button>
            <button className="btn btn-default" onClick={ this.handleGetSelectedData }>Get Current Selected Rows</button>
            <button className="btn btn-default" onClick={ this.handleGetExpandedData }>Get Current Expanded Rows</button>
            <button className="btn btn-default" onClick={ this.handleGetCurrentPage }>Get Current Page</button>
            <button className="btn btn-default" onClick={ this.handleGetCurrentSizePerPage }>Get Current Size Per Page</button>
            <button className="btn btn-default" onClick={ this.handleGetCurrentSortColumn }>Get Current Sort Column</button>
            <button className="btn btn-default" onClick={ this.handleGetCurrentSortOrder }>Get Current Sort Order</button>
            <button className="btn btn-default" onClick={ this.handleGetCurrentFilter }>Get Current Filter Information</button>
            <BootstrapTable
              ref={ n => this.node = n }
              keyField="id"
              data={ products }
              columns={ columns }
              filter={ filterFactory() }
              pagination={ paginationFactory() }
              selectRow={ { mode: 'checkbox', clickToSelect: true } }
              expandRow={ expandRow }
            />
            <Code>{ sourceCode }</Code>
          </div>
        );
      }
    }
    `,
    selectRow: { mode: 'checkbox', clickToSelect: true },
    expandRow: expandRow,
  }
};

export const EnableTabIndexOnCell: Story = {
  name: "Enable tabIndex on cell",
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

    <BootstrapTable
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ { mode: 'checkbox' } }
      tabIndexCell
    />
    `,
    selectRow: { mode: 'checkbox' },
    tabIndexCell: true,
  }
};
