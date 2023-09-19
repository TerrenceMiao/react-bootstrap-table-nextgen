import type { Meta, StoryObj } from '@storybook/react';

// import bootstrap style by given version
import { textFilter } from '../../../react-bootstrap-table-nextgen-filter';
import { columns, productsGenerator } from '../utils/common';
import BootstrapTable from './ExportCSV';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Export CSV',
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
    data1: { control: 'object', description: 'table data' },
    data2: { control: 'object', description: 'table data' },
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
export const BasicExportCSV: Story = {
  name: "Basic export CSV",
  args: {
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { CSVExport } from 'react-bootstrap-table-nextgen-toolkit';

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
      exportCSV
    >
      {
        props => (
          <div>
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
            <hr />
            <BootstrapTable { ...props.baseProps } />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};

export const FormatCSVColumn: Story = {
  name: "Format CSV columns",
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
      csvFormatter: (cell: any, row: any, rowIndex: number) => `$ ${cell}NTD`
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { CSVExport } from 'react-bootstrap-table-nextgen-toolkit';

    const { ExportCSVButton } = CSVExport;
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      csvFormatter: (cell, row, rowIndex) => \`$ \${cell}NTD\`
    }];

    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      exportCSV
    >
      {
        props => (
          <div>
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
            <hr />
            <BootstrapTable { ...props.baseProps } />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};

export const CustomCSVHeader: Story = {
  name: "Custom CSV header",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      csvText: 'CSV Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      csvText: 'CSV Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      csvText: 'CSV Product price'
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { CSVExport } from 'react-bootstrap-table-nextgen-toolkit';

    const { ExportCSVButton } = CSVExport;
    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      csvText: 'CSV Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      csvText: 'CSV Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      csvText: 'CSV Product price'
    }];

    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      exportCSV
    >
      {
        props => (
          <div>
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
            <hr />
            <BootstrapTable { ...props.baseProps } />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};

export const HideSVColumn: Story = {
  name: "Hide CSV column",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      csvExport: false
    }, {
      dataField: 'price',
      text: 'Product Price'
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { CSVExport } from 'react-bootstrap-table-nextgen-toolkit';

    const { ExportCSVButton } = CSVExport;
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      csvExport: false
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      exportCSV
    >
      {
        props => (
          <div>
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
            <hr />
            <BootstrapTable { ...props.baseProps } />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};

export const OnlyExportSelectedRows: Story = {
  name: "Only export selected rows",
  args: {
    mode: "selected",
    columns: columns,
    data1: productsGenerator(15),
    data2: productsGenerator(15),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { CSVExport } from 'react-bootstrap-table-nextgen-toolkit';

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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true
    };

    <ToolkitProvider
      keyField="id"
      data={ products1 }
      columns={ columns }
      exportCSV={ { onlyExportSelection: true, exportAll: true } }
    >
      {
        props => (
          <div>
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
            <hr />
            <BootstrapTable
              { ...props.baseProps }
              selectRow={ selectRow }
              pagination={ paginationFactory() }
            />
          </div>
        )
      }
    </ToolkitProvider>

    <ToolkitProvider
      keyField="id"
      data={ products2 }
      columns={ columns }
      exportCSV={ { onlyExportSelection: true, exportAll: false } }
    >
      {
        props => (
          <div>
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
            <hr />
            <BootstrapTable
              { ...props.baseProps }
              selectRow={ selectRow }
              pagination={ paginationFactory() }
            />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};

export const OnlyExportFilteredSearchedRows: Story = {
  name: "Only export filtered/searched rows",
  args: {
    mode: "filtered",
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price'
    }],
    data: productsGenerator(150),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { CSVExport, Search } from 'react-bootstrap-table-nextgen-toolkit';
    import filterFactory, { textFilter } from 'react-bootstrap-table-nextgen-filter';

    const { SearchBar } = Search;
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

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true
    };

    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      exportCSV={ { onlyExportFiltered: true, exportAll: false } }
      search
    >
      {
        props => (
          <div>
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
            <hr />
            <SearchBar { ...props.searchProps } />
            <BootstrapTable
              { ...props.baseProps }
              pagination={ paginationFactory() }
              filter={ filterFactory() }
            />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};

export const CSVColumnType: Story = {
  name: "CSV column type",
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
      csvType: Number
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { CSVExport } from 'react-bootstrap-table-nextgen-toolkit';

    const { ExportCSVButton } = CSVExport;
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      csvType: Number
    }];

    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      exportCSV
    >
      {
        props => (
          <div>
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
            <hr />
            <BootstrapTable { ...props.baseProps } />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};

export const CustomCSVButton: Story = {
  name: "Custom CSV button",
  args: {
    mode: "button",
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider from 'react-bootstrap-table-nextgen-toolkit';

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

    const MyExportCSV = (props) => {
      const handleClick = () => {
        props.onExport();
      };
      return (
        <div>
          <button className="btn btn-success" onClick={ handleClick }>Export to CSV</button>
        </div>
      );
    };

    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      exportCSV
    >
      {
        props => (
          <div>
            <BootstrapTable { ...props.baseProps } />
            <hr />
            <MyExportCSV { ...props.csvProps } />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};

export const ExportCustomData: Story = {
  name: "Export custom data",
  args: {
    mode: "custom",
    columns: columns,
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider from 'react-bootstrap-table-nextgen-toolkit';

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

    const MyExportCSV = (props) => {
      const handleClick = () => {
        // passing my custom data
        props.onExport(products.filter(r => r.id > 2));
      };
      return (
        <div>
          <button className="btn btn-success" onClick={ handleClick }>Only export Product ID bigger than 2</button>
        </div>
      );
    };

    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      exportCSV
    >
      {
        props => (
          <div>
            <BootstrapTable { ...props.baseProps } />
            <hr />
            <MyExportCSV { ...props.csvProps } />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};

export const CustomCSV: Story = {
  name: "Custom CSV attributes",
  args: {
    mode: "csv",
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { CSVExport } from 'react-bootstrap-table-nextgen-toolkit';

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
      exportCSV={ {
        fileName: 'custom.csv',
        separator: '|',
        ignoreHeader: true,
        noAutoBOM: false,
        blobType: 'text/csv;charset=ansi'
      } }
    >
      {
        props => (
          <div>
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
            <hr />
            <BootstrapTable { ...props.baseProps } />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};

export const ExportTableFooter: Story = {
  name: "Export table footer",
  args: {
    mode: "footer",
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      footer: 'Footer 1'
    }, {
      dataField: 'name',
      text: 'Product Name',
      footer: '',
      footerFormatter: (column: any) => column.text
    }, {
      dataField: 'price',
      text: 'Product Price',
      footer: (columnData: any) => columnData.reduce((acc: any, item: any) => acc + item, 0)
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { CSVExport } from 'react-bootstrap-table-nextgen-toolkit';

    const { ExportCSVButton } = CSVExport;
    const columns = [{
      dataField: 'id',
      text: 'Product ID',
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

    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      exportCSV={ {
        ignoreFooter: false
      } }
    >
      {
        props => (
          <div>
            <ExportCSVButton { ...props.csvProps }>Export CSV!!</ExportCSVButton>
            <hr />
            <BootstrapTable { ...props.baseProps } />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};

