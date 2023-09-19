/* eslint-disable jsx-a11y/anchor-is-valid */
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// import bootstrap style by given version
import { columns, jobsGenerator1, productsGenerator } from '../utils/common';
import BootstrapTable from './TableSearch';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Table Search',
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
    header: { control: 'text', description: 'header of table' },
  },
  decorators: [
    (Story: any) => bootstrapStyle()(Story),
  ],
} satisfies Meta<typeof BootstrapTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const BasicSearchTable: Story = {
  name: "Basic search table",
  args: {
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { Search } from 'react-bootstrap-table-nextgen-toolkit';

    const { SearchBar } = Search;
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
            <hr />
            <BootstrapTable
              { ...props.baseProps }
            />
          </div>
        )
      }
    </ToolkitProvider>
    `,
    header: <h3>Input something at below input field:</h3>,
  }
};

export const ClearSearchButton: Story = {
  name: "Clear search button",
  args: {
    mode: "clear",
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { Search } from 'react-bootstrap-table-nextgen-toolkit';

    const { SearchBar, ClearSearchButton } = Search;

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
          </div>
        )
      }
    </ToolkitProvider>
    `,
    header: <h3>Input something at below input field:</h3>,
  }
};

export const DefaultSearchButton: Story = {
  name: "Default search table",
  args: {
    mode: "default",
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { Search } from 'react-bootstrap-table-nextgen-toolkit';

    const { SearchBar } = Search;
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
      search={ { defaultSearch: '2101' } }
    >
      {
        props => (
          <div>
            <h3>Input something at below input field:</h3>
            <SearchBar { ...props.searchProps } />
            <hr />
            <BootstrapTable
              { ...props.baseProps }
            />
          </div>
        )
      }
    </ToolkitProvider>
    `,
    header: <h3>Input something at below input field:</h3>,
  }
};

export const DefaultCustomSearch: Story = {
  name: "Default custom search",
  args: {
    mode: "custom",
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { Search } from 'react-bootstrap-table-nextgen-toolkit';

    const { SearchBar } = Search;
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
            <SearchBar
              { ...props.searchProps }
              className="custome-search-field"
              style={ { color: 'white' } }
              delay={ 1000 }
              placeholder="Search Something!!!"
            />
            <hr />
            <BootstrapTable
              { ...props.baseProps }
            />
          </div>
        )
      }
    </ToolkitProvider>
    `,
    header: <h3>Input something at below input field:</h3>,
  }
};

export const SearchHooks: Story = {
  name: "Search hooks",
  args: {
    mode: "hooks",
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { Search } from 'react-bootstrap-table-nextgen-toolkit';

    const { SearchBar } = Search;
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

    const afterSearch = (newResult) => {
      console.log(newResult);
    };

    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      search={ { afterSearch } }
    >
      {
        props => (
          <div>
            <h3>Input something at below input field:</h3>
            <SearchBar { ...props.searchProps } />
            <hr />
            <BootstrapTable
              { ...props.baseProps }
            />
          </div>
        )
      }
    </ToolkitProvider>
    `,
    header: <h3>Input something at below input field:</h3>,
  }
};

export const SearchableColumn: Story = {
  name: "Searchable column",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      searchable: false
    }, {
      dataField: 'price',
      text: 'Product Price',
      searchable: false
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { Search } from 'react-bootstrap-table-nextgen-toolkit';

    const { SearchBar } = Search;
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      searchable: false
    }, {
      dataField: 'price',
      text: 'Product Price',
      searchable: false
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
            <hr />
            <BootstrapTable
              { ...props.baseProps }
            />
          </div>
        )
      }
    </ToolkitProvider>
    `,
    header: <h3>Column name and price is unsearchable</h3>,
  }
};

export const FullyCustomSearch: Story = {
  name: "Fully custom search",
  args: {
    mode: "fully",
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

    const MySearch = (props) => {
      let input;
      const handleClick = () => {
        props.onSearch(input.value);
      };
      return (
        <div>
          <input
            className="form-control"
            style={ { backgroundColor: 'pink' } }
            ref={ n => input = n }
            type="text"
          />
          <button className="btn btn-warning" onClick={ handleClick }>Click to Search!!</button>
        </div>
      );
    };

    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      search
    >
      {
        props => (
          <div>
            <BootstrapTable
              { ...props.baseProps }
            />
            <MySearch { ...props.searchProps } />
            <br />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};

export const SearchFormattedValue: Story = {
  name: "Search formatted value",
  args: {
    mode: "formatted",
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      formatter: (cell: any) => `USD ${cell}`
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { Search } from 'react-bootstrap-table-nextgen-toolkit';

    const { SearchBar } = Search;
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name'
    }, {
      dataField: 'price',
      text: 'Product Price',
      formatter: cell => \`USD \${cell}\`  // we will search the data after formatted
    }];

    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columns }
      search={ { searchFormatted: true } }
    >
      {
        props => (
          <div>
            <h3>Try to Search USD at below input field:</h3>
            <SearchBar { ...props.searchProps } />
            <hr />
            <BootstrapTable
              { ...props.baseProps }
            />
          </div>
        )
      }
    </ToolkitProvider>
    `,
    header: <h3>Try to Search USD at below input field:</h3>,
  }
};

const owners = ['Allen', 'Bob', 'Cat'];
const types = ['Cloud Service', 'Message Service', 'Add Service', 'Edit Service', 'Money'];

export const CustomSearchValue: Story = {
  name: "Custom search value",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Job ID',
      searchable: false,
      hidden: true
    }, {
      dataField: 'owner',
      text: 'Job Owner',
      formatter: (cell: any, row: any) => owners[cell],
      filterValue: (cell: any, row: any) => owners[cell] // we will search the value after filterValue called
    }, {
      dataField: 'type',
      text: 'Job Type',
      formatter: (cell: any, row: any) => types[cell],
      filterValue: (cell: any, row: any) => types[cell] // we will search the value after filterValue called
    }],
    data: jobsGenerator1(5),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { Search } from 'react-bootstrap-table-nextgen-toolkit';

    const { SearchBar } = Search;
    const owners = ['Allen', 'Bob', 'Cat'];
    const types = ['Cloud Service', 'Message Service', 'Add Service', 'Edit Service', 'Money'];

    const columns = [{
      dataField: 'id',
      text: 'Job ID',
      searchable: false,
      hidden: true
    }, {
      dataField: 'owner',
      text: 'Job Owner',
      formatter: (cell, row) => owners[cell],
      filterValue: (cell, row) => owners[cell] // we will search the value after filterValue called
    }, {
      dataField: 'type',
      text: 'Job Type',
      formatter: (cell, row) => types[cell],
      filterValue: (cell, row) => types[cell] // we will search the value after filterValue called
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
            <h3>Try to Search Bob, Cat or Allen instead of 0, 1 or 2</h3>
            <SearchBar { ...props.searchProps } />
            <hr />
            <BootstrapTable
              { ...props.baseProps }
            />
          </div>
        )
      }
    </ToolkitProvider>
    `,
    header: <h3>Try to Search Bob, Cat or Allen instead of 0, 1 or 2</h3>,
  }
};

export const CustomMatchFunction: Story = {
  name: "Custom match function",
  args: {
    mode: "function",
    columns: columns,
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import ToolkitProvider, { Search } from 'react-bootstrap-table-nextgen-toolkit';

    const { SearchBar } = Search;
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

    // Implement startWith instead of contain
    function customMatchFunc({
      searchText,
      value,
      column,
      row
    }) {
      if (typeof value !== 'undefined') {
        return value.startsWith(searchText);
      }
      return false;
    }

    export default () => (
      <div>
        <ToolkitProvider
          keyField="id"
          data={ products }
          columns={ columns }
          search={ { customMatchFunc } }
        >
          {
            props => (
              <div>
                <h3>Input something at below input field:</h3>
                <SearchBar { ...props.searchProps } />
                <hr />
                <BootstrapTable
                  { ...props.baseProps }
                />
              </div>
            )
          }
        </ToolkitProvider>
        <Code>{ sourceCode }</Code>
      </div>
    );
    `,
    header: <h3>Input something at below input field:</h3>,
  }
};
