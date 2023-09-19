import type { Meta, StoryObj } from '@storybook/react';

// import bootstrap style by given version
import { textFilter } from '../../../react-bootstrap-table-nextgen-filter';
import { columns, productsGenerator } from '../utils/common';
import BootstrapTable from './ColumnToggle';
import bootstrapStyle from './bootstrap-style';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Column Toggle',
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
export const BasicColumnToggle: Story = {
  name: "Basic column toggle",
  args: {
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

export const DefaultVisibility: Story = {
  name: "Default visibility",
  args: {
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      hidden: true
    }, {
      dataField: 'price',
      text: 'Product Price',
      hidden: true
    }],
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
      text: 'Product Name',
      hidden: true
    }, {
      dataField: 'price',
      text: 'Product Price',
      hidden: true
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
            <BootstrapTable { ...props.baseProps } />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};

export const StylingColumnToggle: Story = {
  name: "Styling column toggle",
  args: {
    mode: "styling",
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
            <ToggleList
              contextual="success"
              className="list-custom-class"
              btnClassName="list-btn-custom-class"
              { ...props.columnToggleProps }
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
  }
};

export const CustomColumnToggle: Story = {
  name: "Custom column toggle",
  args: {
    mode: "custom",
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

    const CustomToggleList = ({
      columns,
      onColumnToggle,
      toggles
    }) => (
      <div className="btn-group btn-group-toggle btn-group-vertical" data-toggle="buttons">
        {
          columns
            .map(column => ({
              ...column,
              toggle: toggles[column.dataField]
            }))
            .map(column => (
              <button
                type="button"
                key={ column.dataField }
                className={ \`btn btn-warning \${column.toggle ? 'active' : ''}\` }
                data-toggle="button"
                aria-pressed={ column.toggle ? 'true' : 'false' }
                onClick={ () => onColumnToggle(column.dataField) }
              >
                { column.text }
              </button>
            ))
        }
      </div>
    );

    <ToolkitProvider
      keyField="id"
      data={ products }
      columns={ columnsdt }
      columnToggle
    >
      {
        props => (
          <div>
            <CustomToggleList { ...props.columnToggleProps } />
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

export const ColumnToggleWithFilter: Story = {
  name: "Column toggle with filter",
  args: {
    mode: "filter",
    columns: [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      sort: true,
      filter: textFilter()
    }],
    data: productsGenerator(),
    sourceCode: `\
    import BootstrapTable from 'react-bootstrap-table-nextgen';
    import filterFactory, { textFilter } from 'react-bootstrap-table-nextgen-filter';
    import ToolkitProvider, { ColumnToggle } from 'react-bootstrap-table-nextgen-toolkit';

    const { ToggleList } = ColumnToggle;
    const columns = [{
      dataField: 'id',
      text: 'Product ID'
    }, {
      dataField: 'name',
      text: 'Product Name',
      sort: true,
      filter: textFilter()
    }, {
      dataField: 'price',
      text: 'Product Price',
      sort: true,
      filter: textFilter()
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
              filter={ filterFactory() }
            />
          </div>
        )
      }
    </ToolkitProvider>
    `,
  }
};
