import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// import bootstrap style by given version
import { productsGenerator } from '../utils/common';
import BootstrapTable from './SortTable';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Sort Table',
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
  },
  decorators: [
    (Story: any) => bootstrapStyle()(Story),
  ],
} satisfies Meta<typeof BootstrapTable>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EnableSort: Story = {
  name: "Enable sort",
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
      text: 'Product Price'
    }],
    data: productsGenerator(21),
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
      text: 'Product Price'
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
  }
};

export const DefaultSortTable: Story = {
  name: "Default sort table",
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
      sort: true
    }],
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
      keyField="id"
      data={ products }
      columns={ columns }
      defaultSorted={ defaultSorted }
    />
    `,
    defaultSorted: [{
      dataField: 'name',
      order: 'desc'
    }],
  }
};

export const DefaultSortDirectionTable: Story = {
  name: "Default sort table",
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
      sort: true
    }],
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
      keyField="id"
      data={ products }
      columns={ columns }
      defaultSortDirection="asc"
    />
    `,
    defaultSortDirection: "asc",
  }
};

export const SortEvents: Story = {
  name: "Sort events",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      sort: true
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true,
      onSort: (field: any, order: any) => {
        console.log(`Sort Field: ${field}, Sort Order: ${order}`);
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
      sort: true
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true,
      onSort: (field, order) => {
        console.log(....);
      }
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
    defaultSorted: [{
      dataField: 'name',
      order: 'desc'
    }],
  }
};

export const SortManagement: Story = {
  name: "Sort management",
  args: {
    mode: "management",
  }
};

const sortFunc = (a: any, b: any, order: string, dataField: any) => {
  if (order === 'desc') {
    if (typeof b === 'string' && typeof a === 'string') {
      return b.localeCompare(a);
    } else {
      return b - a;
    }
  } else {
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    } else {
      return a - b;
    }
  }
}

export const OnetimeSortConfiguration: Story = {
  name: "One-time sort configuration",
  args: {
    mode: "configuration",
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      sort: true,
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true,
    }, {
      dataField: 'price',
      text: 'Product Price',
    }],
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
      text: 'Product Price'
    }];

    class OnetimeSortConfiguration extends React.Component {
      sortFunc = (a: any, b: any, order: string, dataField: any) => {
        if (order === 'desc') {
          if (typeof b === 'string' && typeof a === 'string') {
            return b.localeCompare(a);
          } else {
            return b - a;
          }
        } else {
          if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b);
          } else {
            return a - b;
          }
        }
      }

      render() {
        const sortOption = {
          // No need to configure sortFunc per column
          sortFunc: this.sortFunc,
          // No need to configure sortCaret per column
          sortCaret: (order, column) => {
            if (!order) return (<span>&nbsp;&nbsp;Desc/Asc</span>);
            else if (order === 'asc') return (<span>&nbsp;&nbsp;Desc/<p style={{color: "red"}}>Asc</p></span>);
            else if (order === 'desc') return (<span>&nbsp;&nbsp;<p style={{color: "red"}}>Desc</p>/Asc</span>);
            return null;
          }
        };

        return (
          <div>
            <button className="btn btn-default" onClick={ this.handleClick }>Change Data</button>
            <BootstrapTable keyField="id" data={ products } columns={ columns } sort={ sortOption } />
            <Code>{ sourceCode }</Code>
          </div>
        );
      }
    }
    `,
    sort: {
      sortFunc: sortFunc,
      sortCaret: (order: string, column: any) => {
        if (!order) return (<span>&nbsp;&nbsp;Desc/Asc</span>);
        else if (order === 'asc') return (<span>&nbsp;&nbsp;Desc/<span style={{color: "red"}}>Asc</span></span>);
        else if (order === 'desc') return (<span>&nbsp;&nbsp;<span style={{color: "red"}}>Desc</span>/Asc</span>);
        return null;
      }
    },
  }
};

export const CustomSortValue: Story = {
  name: "Custom sort value",
  args: {
    mode: "custom",
  }
};

export const CustomSortFunction: Story = {
  name: "Custom sort function",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      sort: true,
      // here, we implement a custom sort which perform a reverse sorting
      sortFunc: (a: any, b: any, order: string, dataField: any) => {
        if (order === 'desc') {
          if (typeof b === 'string' && typeof a === 'string') {
            return b.localeCompare(a);
          } else {
            return b - a;
          }
        } else {
          if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b);
          } else {
            return a - b;
          }
        }
      }
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true
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
      sort: true,
      // here, we implement a custom sort which perform a reverse sorting
      sortFunc: (a: any, b: any, order: string, dataField: any) => {
        if (order === 'desc') {
          if (typeof b === 'string' && typeof a === 'string') {
            return b.localeCompare(a);
          } else {
            return b - a;
          }
        } else {
          if (typeof a === 'string' && typeof b === 'string') {
            return a.localeCompare(b);
          } else {
            return a - b;
          }
        }
      }
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
    header: <h3>Product ID sorting is reverted</h3>,
  }
};

export const CustomSortCaret: Story = {
  name: "Custom sort caret",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      sort: true
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true,
      sortCaret: (order: string, column: any) => {
        if (!order) return (<span>&nbsp;&nbsp;Desc/Asc</span>);
        else if (order === 'asc') return (<span>&nbsp;&nbsp;Desc/<span style={{color: "red"}}>Asc</span></span>);
        else if (order === 'desc') return (<span>&nbsp;&nbsp;<span style={{color: "red"}}>Desc</span>/Asc</span>);
        return null;
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
      sort: true
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true,
      sortCaret: (order: string, column: any) => {
        if (!order) return (<span>&nbsp;&nbsp;Desc/Asc</span>);
        else if (order === 'asc') return (<span>&nbsp;&nbsp;Desc/<span style={{color: "red"}}>Asc</span></span>);
        else if (order === 'desc') return (<span>&nbsp;&nbsp;<span style={{color: "red"}}>Desc</span>/Asc</span>);
        return null;
      }
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <BootstrapTable keyField='id' data={ products } columns={ columns } />
    `,
  }
};

const headerSortingClasses = (column: any, sortOrder: any, isLastSorting: any, colIndex: any) => (
  sortOrder === 'asc' ? 'demo-sorting-asc' : 'demo-sorting-desc'
);

export const CustomClassesOnSortingHeaderColumn: Story = {
  name: "Custom classes on sorting header column",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      sort: true,
      headerSortingClasses
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true,
      headerSortingClasses
    }, {
      dataField: 'price',
      text: 'Product Price'
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const headerSortingClasses = (column, sortOrder, isLastSorting, colIndex) => (
      sortOrder === 'asc' ? 'demo-sorting-asc' : 'demo-sorting-desc'
    );

    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      sort: true,
      headerSortingClasses
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true,
      headerSortingClasses
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    `,
  }
};

const headerSortingStyle = { backgroundColor: '#c8e6c9' };

export const CustomStyleOnSortingHeaderColumn: Story = {
  name: "Custom style on sorting header column",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID',
      sort: true,
      headerSortingStyle
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true,
      headerSortingStyle
    }, {
      dataField: 'price',
      text: 'Product Price'
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';

    const headerSortingStyle = { backgroundColor: '#c8e6c9' };

    const columns = [{
      dataField: 'id',
      text: 'Product ID',
      sort: true,
      headerSortingStyle
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true,
      headerSortingStyle
    }, {
      dataField: 'price',
      text: 'Product Price'
    }];

    <BootstrapTable keyField="id" data={ products } columns={ columns } />
    `,
  }
};
