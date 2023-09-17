import type { Meta, StoryObj } from '@storybook/react';

// import bootstrap style by given version
import paginationFactory from "../../../react-bootstrap-table-nextgen-paginator";
import { columns, productsGenerator, sortColumns } from '../utils/common';
import BootstrapTable from './Bootstrap4';
import bootstrapStyle, { BOOTSTRAP_VERSION } from './bootstrap-style';

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
    data: { control: 'object', description: 'table data' },
    columns: { control: 'object', description: 'table columns' },
    sourceCode: { control: 'text', description: 'source code of the table' },
    defaultSorted: { control: 'object', description: 'default sorted data field' },
    selectRow: { control: 'object', description: 'table select row' },
    pagination: { control: 'object', description: 'table pagination' },
  },
  decorators: [
    (Story: any) => bootstrapStyle(BOOTSTRAP_VERSION.FOUR)(Story),
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
    columns: sortColumns,
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

export const TableCaptionBootstrap4: Story = {
  name: "Table caption Bootstrap 4",
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

    <BootstrapTable bootstrap4 keyField="id" data={ products } caption="Plain text header" columns={ columns } />

    <BootstrapTable bootstrap4 keyField="id" data={ products } caption={<CaptionElement />} columns={ columns } />
    `,
  }
};

const selectRow = {
  mode: 'radio',
  clickToSelect: true
};

export const RowSelectionTableWithBootstrap4: Story = {
  name: "Row selection table with Bootstrap 4",
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
      mode: 'radio',
      clickToSelect: true
    };

    <BootstrapTable
      bootstrap4
      keyField='id'
      data={ products }
      columns={ columns }
      selectRow={ selectRow }
    />
    `,
    selectRow: selectRow,
  }
};

export const PaginationTableWithBootstrap4: Story = {
  name: "Pagination table with Bootstrap 4",
  args: {
    columns: columns,
    data: productsGenerator(87),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import paginationFactory from 'react-bootstrap-table-nextgen-paginator';

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

    <BootstrapTable bootstrap4 keyField='id' data={ products } columns={ columns } pagination={ paginationFactory() } />
    `,
    pagination: paginationFactory(),
  }
};

export const ColumnToggleWithBootstrap4: Story = {
  name: "Columns toggle with Bootstrap 4",
  args: {
    mode: "toggle",
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table-nextgen-toolkit';

    const { ToggleList } = ColumnToggle;
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

    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      columnToggle
    >
      {
        props => (
          <div>
            <ToggleList { ...props.columnToggleProps } />
            <hr />
            <BootstrapTable
              { ...props.baseProps }
            />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};

export const ToolkitsTableBootstrap4: Story = {
  name: "Toolkits table Bootstrap 4",
  args: {
    mode: "toolkits",
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table-nextgen-toolkit';

    const { SearchBar, ClearSearchButton } = Search;
    const { ExportCSVButton } = CSVExport;

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

    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      search
    >
      {
        props => (
          <div>
            <h3>Input something at below input field:</h3>
            <SearchBar { ...props.searchProps } />
            <ClearSearchButton { ...props.searchProps } />
            <hr />
            <BootstrapTable
              { ...props.baseProps }
            />
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};
